const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// create listing
const addListing = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // listing schema
  const listing = {
    _id: uuidv4(),
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    subcategory: req.body.subcategory,
    description: req.body.description,
    model: req.body.model,
    size: req.body.size,
    location: req.body.location,
    imageSrc: req.body.imageSrc,
    isBooked: req.body.isBooked,
    renterId: req.body.renterId,
    reservationsIds: req.body.reservationsIds,
    reviewsIds: req.body.reviewsIds,
  };

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // create new listing in our listing collection
    const result = await db.collection("listing").insertOne(listing);

    if (result) {
      res.status(201).json({
        status: 201,
        message: "Listing added to the database",
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "we coudn't add this listing to the database",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// get all listing
const getAllListings = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // find all listing in listing collection
    const allListing = await db.collection("listing").find().toArray();

    if (allListing.length > 0) {
      res.status(200).json({
        status: 200,
        message: "We successfully get all listing in database",
        data: allListing,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "We couldn't find any listing",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// get listing by id
const getListingById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { id } = req.params;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // find listing by id
    const findListing = await db.collection("listing").findOne({ _id: id });

    if (findListing) {
      res.status(200).json({
        status: 200,
        message: "listing found",
        data: findListing,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "listing not found",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// get all listings for specific renter
const getAllListingsForOneRenter = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { renterId } = req.params;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // find listing by renterId
    const findAllListingsForThisRenter = await db
      .collection("listing")
      .find({ renterId: renterId })
      .toArray();

    if (findAllListingsForThisRenter.length > 0) {
      res.status(200).json({
        status: 200,
        message: "listings found for this renter",
        data: findAllListingsForThisRenter,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "we couldn't found any listings",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// get all listings by category
const getAllListingsByCategory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { category } = req.params;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // find all listings by category
    const findAllListingsByCategory = await db
      .collection("listing")
      .find({ category: category.toLowerCase() })
      .toArray();

    if (findAllListingsByCategory.length > 0) {
      res.status(200).json({
        status: 200,
        message: "listings found for this category",
        data: findAllListingsByCategory,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "we couldn't found any listings",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// get all listings by subcategory
const getAllListingsBySubCategory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { subcategory } = req.params;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // find all listing by subcategory that we receive as params
    const findAllListingsBySubCategory = await db
      .collection("listing")
      .find({ subcategory: { $regex: subcategory } })
      .toArray();

    if (findAllListingsBySubCategory.length > 0) {
      res.status(200).json({
        status: 200,
        message: "listings found for this category",
        data: findAllListingsBySubCategory,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "we couldn't found any listings",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// get listings by location
const getListingsByLocation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { location } = req.params;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // find all lisitng by location
    const findAllListingsByLocation = await db
      .collection("listing")
      .find({ location: location.toLowerCase() })
      .toArray();

    if (findAllListingsByLocation.length > 0) {
      res.status(200).json({
        status: 200,
        message: "listings found for this location",
        data: findAllListingsByLocation,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "we couldn't found any listings",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// delete a listing by id
const deleteListingById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { id } = req.params;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // find listing by id
    const findListingsById = await db
      .collection("listing")
      .findOne({ _id: id });

    if (findListingsById) {
      // delete lisitng by id
      await db.collection("listing").deleteOne({ _id: id });

      res.status(204).json({
        status: 204,
        message: "resource deleted successfully",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "We couldn't find any listing with this id",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// update listing
const updateListing = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { id } = req.params;

  const updateListingData = {
    $set: {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      subcategory: req.body.subcategory,
      description: req.body.description,
      model: req.body.model,
      size: req.body.size,
      location: req.body.location,
      imageSrc: req.body.imageSrc,
      isBooked: req.body.isBooked,
      reservationsIds: req.body.reservationsIds,
      reviewsIds: req.body.reviewsIds,
    },
  };

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // find lisitng by id
    const findListingToUpdate = await db
      .collection("listing")
      .findOne({ _id: id });

    // if lisitng existe we update that one
    if (findListingToUpdate) {
      await db.collection("listing").updateOne({ _id: id }, updateListingData);

      res.status(204).json({
        status: 204,
        message: "resource updated successfully",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "We couldn't find any listing with this id",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

module.exports = {
  addListing,
  getAllListings,
  getListingById,
  getAllListingsForOneRenter,
  getAllListingsByCategory,
  getAllListingsBySubCategory,
  getListingsByLocation,
  deleteListingById,
  updateListing,
};
