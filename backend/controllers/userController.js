const { MongoClient } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MONGO_URI, JWT_SECRET, FRONTEND_URL } = process.env;
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../auth/generateToken");
const { sendEmail } = require("../util/sendEmail");
const {
  hashPassword,
  comparePassword,
} = require("../auth/hashPasswordFunctions");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// register user to db
const registerUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { username, email, password, picture } = req.body;

  // checking if there are missing fields
  if (!username || !email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please enter all fields",
    });
  }

  // user info received from the frontend
  const user = {
    _id: uuidv4(),
    username: username,
    email: email,
    password: await hashPassword(password),
    picture: picture,
    isVerified: false,
    verificationString: uuidv4(),
  };

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // cheking if user already exist in our db
    const checkIfUserExist = await db
      .collection("users")
      .findOne({ email: email });

    // if user exit we send error message
    if (checkIfUserExist) {
      res.status(400).json({
        status: 400,
        message: "User is already in our db",
      });
    } else {
      // insert new user in our db
      const result = await db.collection("users").insertOne(user);

      // sending a email verification link to user email
      await sendEmail({
        to: email,
        from: "wahraniservice@gmail.com",
        subject: "Please verify your email",
        text: `Thanks for signing up! To verify your email, click this link: 
          ${FRONTEND_URL}/verify-email/${user.verificationString}
          `,
      });

      if (result) {
        res.status(201).json({
          status: 201,
          data: {
            token: generateToken({
              _id: user._id,
              picture: user.picture,
              username: user.username,
              isVerified: false,
            }),
          },
          message: "User added to database",
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "we coudn't add this user to the database",
        });
      }
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// Login user if they ixist in db
const loginUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { email, password } = req.body;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // find user in our db by cheking if there is an email match (email is unique)
    const findUser = await db.collection("users").findOne({ email: email });

    // compare the password that the user enter with the password that we have in our db
    const comparePasswords = await comparePassword(password, findUser.password);

    if (findUser && comparePasswords) {
      res.status(200).json({
        status: 200,
        data: {
          token: generateToken({
            _id: findUser._id,
            username: findUser.username,
            picture: findUser.picture,
            isVerified: findUser.isVerified,
          }),
        },
        message: "User Logged in",
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "your email or password are inccorect",
      });
    }
  } catch (error) {
    console.log(error.message);
  }

  client.close();
};

// add user email and/or phone number to db
const addUserEmail = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // checking if user is already subscribed
    const findIfUserIsSubscribed = await db
      .collection("user-subscription")
      .findOne({ email: req.body.email, phoneNumber: req.body.phoneNumber });

    // if we find one we throw an error else we create a new subscription
    if (findIfUserIsSubscribed) {
      return res.status(401).json({
        status: 401,
        message: "User already subscribed",
      });
    } else {
      // create new subscription in the user-subscription collection
      const addUserSuscription = await db
        .collection("user-subscription")
        .insertOne({
          _id: uuidv4(),
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
        });

      if (addUserSuscription) {
        return res.status(201).json({
          status: 201,
          message: "user addded to the email list",
        });
      } else {
        return res.status(401).json({
          status: 401,
          message: "we coudn't add this user to the email list",
        });
      }
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// modify password if user forgot his password
const forgotPasswordHandler = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // take email from req params
  const { email } = req.params;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // generate a random password reset
    const passwordResetCode = uuidv4();

    // find user in our db by cheking if there is an email match (email is unique)
    const findUser = await db.collection("users").findOne({ email: email });

    if (findUser) {
      // insert passwordResetCode into the user info in our db
      const updateUserInfo = await db
        .collection("users")
        .updateOne({ email }, { $set: { passwordResetCode } });

      if (updateUserInfo) {
        try {
          // sending a rest link to user email
          await sendEmail({
            to: email,
            from: "wahraniservice@gmail.com",
            subject: "Password Reset",
            text: `To reset your password, click this link: 
            ${FRONTEND_URL}/reset-password/${passwordResetCode}
              `,
          });
        } catch (error) {
          console.log(error.stack);
          return res.sendStatus(500);
        }
        return res.sendStatus(200);
      }
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// reset password
const resetPasswordHandler = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // getting the passwordResetCode from the req params
  const { passwordResetCode } = req.params;

  // getting the new password from the req body
  const { newPassword } = req.body;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // hashing the password using bcrypt
    const newPasswordHash = await hashPassword(newPassword);

    // find user in our db by cheking if there is a passwordResetCode match
    const findUser = await db
      .collection("users")
      .findOne({ passwordResetCode });

    if (findUser) {
      // update user password
      const updateUserPassword = await db.collection("users").updateOne(
        { passwordResetCode },
        {
          $set: { password: newPasswordHash },
          $unset: { passwordResetCode: "" },
        }
      );

      if (updateUserPassword) {
        res.status(200).json({
          status: 200,
          message: "password has been successfully updated",
        });
      }
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// verify user email
const verifyUserEmail = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { verificationString } = req.body;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // checking if verificationString exist
    if (!verificationString)
      return res
        .status(401)
        .json({ message: "The verification code not found" });

    // checking if user is already subscribed
    const findIfUserIsVerified = await db
      .collection("users")
      .findOne({ verificationString: verificationString });

    if (!findIfUserIsVerified)
      return res
        .status(401)
        .json({ message: "The email verification code is incorect" });

    const { _id: id, username, picture } = findIfUserIsVerified;

    const updateUserInfo = await db
      .collection("users")
      .updateOne({ _id: id }, { $set: { isVerified: true } });

    if (updateUserInfo) {
      res.status(200).json({
        status: 200,
        data: {
          token: generateToken({
            _id: id,
            username: username,
            picture: picture,
            isVerified: true,
          }),
        },
        message: "User is verified",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// get all users
const getAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // find all users in the users collection
    const allUsers = await db.collection("users").find().toArray();

    // filter the result and return just none sensitive data (email & password)
    const filterAllUserArray = await allUsers.map((user) => {
      const userObj = {
        _id: user._id,
        username: user.username,
        picture: user.picture,
      };
      return userObj;
    });

    if (filterAllUserArray.length > 0) {
      res.status(200).json({
        status: 200,
        message: "We successfully get all users in database",
        data: filterAllUserArray,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "We couldn't find any user",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// get user info by id
const getUserInfoById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { id } = req.params;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // find user by user id
    const findUser = await db.collection("users").findOne({ _id: id });

    if (findUser) {
      res.status(200).json({
        status: 200,
        data: findUser,

        message: "User found",
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "we couldn't find any user",
      });
    }
  } catch (error) {
    console.log(error.message);
  }

  client.close();
};

// update user info
const updateUserInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { username, email, password, picture } = req.body;
  const { id } = req.params;
  const { authorization } = req.headers;

  // cheking if user enter all fields information
  if (!username || !email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please enter all fields",
    });
  }

  // cheking if there was an authorization header sent
  if (!authorization) {
    return res.status(401).json({
      status: 401,
      message: "No authorization",
    });
  }

  // get the token from the authorization header
  const token = authorization.split(" ")[1];

  // data we want to update
  const updateUserData = {
    $set: {
      _id: id,
      username: username,
      password: await hashPassword(password),
      email: email,
      picture: picture,
    },
  };

  try {
    // verify if user id match the id we get from jwt token
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "Unable to verify the token" });

      const { _id, isVerified } = decoded.data;

      // check if the user is the same user in our db
      if (_id !== id)
        return res
          .status(403)
          .json({ message: "Not allowed to update this user data" });

      // check if user is verified to be able to make changes
      if (!isVerified)
        return res
          .status(403)
          .json({ message: "You need to verify you can update your data" });

      await client.connect();

      const db = await client.db("laghata-db");

      // find user we want to update by user id in our users collection
      const updatedUser = await db
        .collection("users")
        .findOneAndUpdate({ _id: id }, updateUserData);

      if (updatedUser) {
        const userUpdatedInfo = await db
          .collection("users")
          .findOne({ _id: id });

        userUpdatedInfo &&
          res.status(200).json({
            status: 200,
            data: {
              token: generateToken({
                _id: userUpdatedInfo._id,
                username: userUpdatedInfo.username,
                picture: userUpdatedInfo.picture,
                isVerified: userUpdatedInfo.isVerified,
              }),
            },
            message: "User update his info",
          });
      }
    });
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
  console.log("Disconnect!");
};

module.exports = {
  registerUser,
  addUserEmail,
  loginUser,
  getUserInfoById,
  updateUserInfo,
  getAllUsers,
  verifyUserEmail,
  forgotPasswordHandler,
  resetPasswordHandler,
};
