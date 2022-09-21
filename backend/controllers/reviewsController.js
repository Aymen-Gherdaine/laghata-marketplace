const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// create review
const addReview = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // listing schema
  const review = {
    _id: uuidv4(),
    review: req.body.review,
    clientUsername: req.body.clientUsername,
    clientId: req.body.clientId,
    clientPicture: req.body.clientPicture,
    listingId: req.body.listingId,
    rating: req.body.rating,
    createdAt: req.body.createdAt,
  };

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // create new review in our reviews collection
    const result = await db.collection("reviews").insertOne(review);

    if (result) {
      await db
        .collection("listing")
        .updateOne(
          { _id: review.listingId },
          { $addToSet: { reviewsIds: review._id } }
        );

      res.status(201).json({
        status: 201,
        message: "Review added to the database",
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "we coudn't add this review to the database",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// get all reviews for specific listing
const getAllReviewsByLisitngId = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { id } = req.params;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // find all reviews for specific listing by listing id
    const AllReviewsForThisListing = await db
      .collection("reviews")
      .find({ listingId: id })
      .toArray();

    if (AllReviewsForThisListing.length > 0) {
      res.status(200).json({
        status: 200,
        message: "We successfully get all reviews form database",
        data: AllReviewsForThisListing,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "We couldn't find any review",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

module.exports = { addReview, getAllReviewsByLisitngId };
