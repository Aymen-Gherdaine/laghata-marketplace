"use strict";
// import the needed node_modules.
require("dotenv").config();
const { PORT, FRONTEND_URL } = process.env;
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const server = http.createServer(app);

// import all function from user controller
const {
  registerUser,
  addUserEmail,
  loginUser,
  getUserInfoById,
  updateUserInfo,
  getAllUsers,
  verifyUserEmail,
  forgotPasswordHandler,
  resetPasswordHandler,
} = require("./controllers/userController");

// import all function from chat controller
const {
  addNewConversation,
  getConversationByUserId,
  createMessages,
  getAllMessagesByConversationId,
} = require("./controllers/chatController");

// import all function from reviews controller
const {
  addReview,
  getAllReviewsByLisitngId,
} = require("./controllers/reviewsController");

// import all function from listing controller
const {
  addListing,
  getAllListings,
  getListingById,
  getAllListingsForOneRenter,
  getAllListingsByCategory,
  getAllListingsBySubCategory,
  getListingsByLocation,
  deleteListingById,
  updateListing,
} = require("./controllers/listingController");

// import all function from reservation controller
const {
  addReservation,
  getAllReservationForListing,
} = require("./controllers/reservationController");

// Any requests for static files will go into the public folder
app.use(express.static("public"));

// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
app.use(morgan("tiny"));

app.use(express.json());

// using cors as middleware to prevent cors problem
app.use(cors());

// telling cors to permit us to communicate with this address
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
  },
});

/**********  CHAT CONNECTION *******************/
//****************************************************************************************/
// create an array that hold users
const users = [];

// Establish a connection between server and client
io.on("connection", (socket) => {
  // send a welcome msg when the user open the chat
  socket.on("welcome-message", ({ currentUserName, renterUsername }) => {
    socket.emit("welcome-response", {
      user: renterUsername,
      text: `Welcome ${currentUserName}, My name is ${renterUsername}, I will be  happy to help you! if you have any question! `,
    });
  });

  // initialisation and adding users to our users array
  socket.on("initialisation-add-user", (userId) => {
    // check if user exist in our users array
    const checkIfUserExist = users.find((user) => user.userId === userId);

    // if user doesn't exist we push it into the users array else we update his socket id because it change on every connection
    if (!checkIfUserExist) {
      users.push({ userId: userId, socketId: socket.id });
    } else {
      checkIfUserExist.socketId = socket.id;
    }

    // sending all users to the frontend
    io.emit("getUsers", users);
  });

  // sending messages
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    // find the users that we want to send messages to in our users list
    const userToSendTo = users.find((user) => user.userId === receiverId);

    if (userToSendTo) {
      io.to(userToSendTo?.socketId).emit("getMessage", {
        senderId: senderId,
        sendToId: receiverId,
        text: text,
      });
    }
  });

  // when user disconnect
  socket.on("disconnect", () => {
    // delete user from users array each time he deconnect
    users.filter((user) => user.socketId !== socket.id);

    io.emit("getUsers", users);
  });
});

/*******************************************************************/

// ROUTES

// Auth routes
app.post("/api/signup", registerUser);
app.post("/api/login", loginUser);

/************** USER CRUD *****************/
// Get all users
app.get("/api/users", getAllUsers);

// User email Subscription
app.post("/api/email-subscription", addUserEmail);

// User email verification
app.put("/api/verify-email", verifyUserEmail);

// User Forgot password
app.put("/api/forgot-password/:email", forgotPasswordHandler);

// User Reset password
app.put("/api/users/:passwordResetCode/reset-password", resetPasswordHandler);

// Get user info by id
app.get("/api/user/:id", getUserInfoById);

// Update user info
app.patch("/api/user/:id", updateUserInfo);
/*****************************************/

/********** LISTING CRUD **********/
// Create Listing
app.post("/api/add-listing", addListing);

// Get all listing
app.get("/api/get-all-listings", getAllListings);

// Get listing by id
app.get("/api/listings/listing/:id", getListingById);

// Get all listings for specific renter
app.get("/api/renter-listing/:renterId", getAllListingsForOneRenter);

// Get listings by category
app.get("/api/listings/:category", getAllListingsByCategory);

// Get listings by subcategory
app.get("/api/listings/category/:subcategory", getAllListingsBySubCategory);

// Get listings by location
app.get("/api/listings/location/:location", getListingsByLocation);

// Delete a listing by id
app.delete("/api/listing/:id", deleteListingById);

// Update listing
app.patch("/api/listing/:id", updateListing);

/************************************************************/

/********** RESERVATION CRUD **********/
// Add reservation
app.post("/api/listing/reservation", addReservation);

// Get reservation By id
app.get("/api/reservations/listing/:id", getAllReservationForListing);

/************************************************************/

/**************** REVIEWS CRUD *******************************/

// create new review
app.post("/api/add-review", addReview);

// get all reviews for specific listing
app.get("/api/reviews/listing/:id", getAllReviewsByLisitngId);

/*************************************************************/

/************** CHAT CRUD ************************************/

// create new conversation
app.post("/api/conversation", addNewConversation);

// get conversation of a specific user
app.get("/api/conversation/:userId", getConversationByUserId);

// create new messages
app.post("/api/message", createMessages);

// get all messages for specific conversation
app.get("/api/messages/:conversationId", getAllMessagesByConversationId);

/*************************************************************/
// this is our catch all endpoint.
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

// Node spins up our server and sets it to listen on port 8000.
server.listen(PORT || 9000, () => console.log(`Listening on port ${PORT}`));
