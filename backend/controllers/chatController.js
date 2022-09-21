const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// create new conversation
const addNewConversation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { senderId, receiverId, createAt } = req.body;

  const conversation = {
    _id: uuidv4(),
    members: [senderId, receiverId],
    createAt: createAt,
  };

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    if (senderId === receiverId) {
      return res.status(401).json({
        status: 401,
        message: "we coudn't add this conversation to the database",
      });
    } else {
      // we check if the conversation already exist
      const findConversations = await db
        .collection("conversations")
        .find({
          $expr: {
            $setIsSubset: ["$members", [receiverId, senderId]],
          },
        })
        .toArray();

      // if the conversation doesn't exit we add one
      if (findConversations.length === 0) {
        const result = await db
          .collection("conversations")
          .insertOne(conversation);

        if (result) {
          res.status(201).json({
            status: 201,
            data: conversation,
            message: "Conversation added to database",
          });
        } else {
          res.status(401).json({
            status: 401,
            message: "we coudn't add this conversation to the database",
          });
        }
      }
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// get all conversation for specific user
const getConversationByUserId = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { userId } = req.params;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    const findConversations = await db
      .collection("conversations")
      .find({ members: { $in: [userId] } })
      .toArray();

    if (findConversations) {
      res.status(200).json({
        status: 200,
        data: findConversations,
        message: "Conversations found",
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "we couldn't find any conversation",
      });
    }
  } catch (error) {
    console.log(error.message);
  }

  client.close();
};

// create messages for conversation
const createMessages = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const message = {
    _id: uuidv4(),
    conversationId: req.body.conversationId,
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
    text: req.body.text,
    createAt: req.body.createAt,
  };

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    const result = await db.collection("messages").insertOne(message);

    if (result) {
      res.status(201).json({
        status: 201,
        message: "Message added to database",
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "we coudn't add this message to the database",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// get all messages for specific conversation
const getAllMessagesByConversationId = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { conversationId } = req.params;

  try {
    await client.connect();

    const db = await client.db("laghata-db");
    console.log("connected!");

    const findMessages = await db
      .collection("messages")
      .find({ conversationId: conversationId })
      .toArray();

    if (findMessages) {
      res.status(200).json({
        status: 200,
        data: findMessages,
        message: "Messages found",
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "we couldn't find any message",
      });
    }
  } catch (error) {
    console.log(error.message);
  }

  client.close();
};

module.exports = {
  addNewConversation,
  getConversationByUserId,
  createMessages,
  getAllMessagesByConversationId,
};
