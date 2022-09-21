const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// add reservation for listing
const addReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const reservation = {
    _id: uuidv4(),
    listingId: req.body.listingId,
    renterId: req.body.renterId,
    clientId: req.body.clientId,
    bookingDate: req.body.bookingDate,
    location: req.body.location,
  };

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // create new reservation in our reservations collection
    const newReservation = await db
      .collection("reservations")
      .insertOne(reservation);

    if (newReservation) {
      // update reservationIds array in listing collection (each listing has an array of all reservations for that listing)
      await db
        .collection("listing")
        .updateOne(
          { _id: reservation.listingId },
          { $addToSet: { reservationsIds: reservation._id } }
        );

      // update the isBooked property in the listing when ever there is a new reservation
      await db
        .collection("listing")
        .updateOne(
          { _id: reservation.listingId },
          { $set: { isBooked: true } }
        );

      res.status(201).json({
        status: 204,
        message: "Reservation created",
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "we coudn't create a new reservation",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

// get all reservation for specific listing
const getAllReservationForListing = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { id } = req.params;

  try {
    await client.connect();

    const db = await client.db("laghata-db");

    // find all reservation for spesific listing
    const findReservations = await db
      .collection("reservations")
      .find({ listingId: id })
      .toArray();

    if (findReservations) {
      res.status(200).json({
        status: 200,
        message: "all reservaton found",
        data: findReservations,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "we couldn't found any reservation",
      });
    }
  } catch (error) {
    console.log(error.stack);
  }

  client.close();
};

module.exports = {
  addReservation,
  getAllReservationForListing,
};
