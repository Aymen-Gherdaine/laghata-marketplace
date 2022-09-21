import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import surf1 from "../../assets/surf1.jpg";
import styled from "styled-components";
import LoadingSpinner from "../styleComponents/LoadingSpinner";
import { BookingContext } from "../context/BookingContext";
import { useContext } from "react";
import format from "date-fns/format";
import { Circles } from "react-loader-spinner";
import { addDays } from "date-fns";

const BookingPage = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState();
  const [renter, setRenter] = useState();
  const { id } = useParams();

  // getting information from booking context
  const { dateRange, setDateRange, bookingLoading, setBookingLoading } =
    useContext(BookingContext);

  let navigate = useNavigate();

  // fetching data by listing id
  useEffect(() => {
    try {
      setLoading(true);

      const fechingLisitngDataHandler = async () => {
        // fetching listing information by lisitng id
        const fetchListingById = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/listings/listing/${id}`
        );

        // parse the data received
        const responseJson = await fetchListingById.json();

        // fetch renter information by renterId
        const fetchRenter = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${responseJson.data.renterId}`
        );

        // parse the data
        const responseJsonRenter = await fetchRenter.json();

        if (responseJson.data && responseJsonRenter.data) {
          setListing(responseJson.data);

          setRenter(responseJsonRenter.data);

          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      fechingLisitngDataHandler();
    } catch (error) {
      console.log(error.stack);
      setLoading(false);
    }
  }, [id]);

  // function to calculate the number of reservation days
  const numOfReservationDay =
    (dateRange[0].endDate - dateRange[0].startDate) / (1000 * 3600 * 24);

  // adding reservation to db
  const reservationHandler = async () => {
    setBookingLoading(true);

    try {
      // reservation info
      const reservation = {
        listingId: listing._id,
        renterId: listing.renterId,
        clientId: JSON.parse(localStorage.getItem("id")),
        bookingDate: [
          {
            startDate: dateRange[0].startDate,
            endDate: dateRange[0].endDate,
          },
        ],
        location: listing.location,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      };

      // post the new booking to our db
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/listing/reservation`,
        requestOptions
      );

      if (response.ok) {
        setBookingLoading(false);
        setDateRange([
          {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
          },
        ]);
        navigate(`/listing/${id}`);
      }
    } catch (error) {
      console.log(error.stack);
      setBookingLoading(false);
    }
    setBookingLoading(false);
  };

  return (
    <BookingContainer>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {listing && renter && !loading && (
            <BookingWrapper>
              <Banner>
                <BannerImg src={surf1} alt="banner" />
                <h2>
                  Book {listing.name} From {renter.username}
                </h2>
              </Banner>
              <Main>
                <BookingInfo>
                  <h3>Booking Details</h3>
                  <InfoContainer>
                    <p>
                      <span>Price Per Day: </span>${listing.price}
                    </p>
                    <p>
                      <span>Booking Date: </span>
                      {`${format(
                        dateRange[0].startDate,
                        "MM/dd/yyyy"
                      )} to ${format(dateRange[0].endDate, "MM/dd/yyyy")}`}{" "}
                      {numOfReservationDay === 1 ? (
                        <span>({numOfReservationDay}/Day)</span>
                      ) : (
                        <span>({numOfReservationDay}/Days)</span>
                      )}
                    </p>
                    <p>
                      <span>
                        Total Price: $
                        {Number(listing.price) * numOfReservationDay}
                      </span>
                    </p>
                    <ButtonWrapper>
                      <Button onClick={reservationHandler}>
                        {bookingLoading ? (
                          <Circles
                            height="20"
                            width="20"
                            color="#54cbe3"
                            ariaLabel="circles-loading"
                            wrapperClass="spinner"
                            visible={true}
                          />
                        ) : (
                          "Confirm Booking"
                        )}
                      </Button>
                    </ButtonWrapper>
                  </InfoContainer>
                </BookingInfo>
              </Main>
            </BookingWrapper>
          )}
        </>
      )}
    </BookingContainer>
  );
};

// Booking style
const BookingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 220px;
`;

const BookingWrapper = styled.div``;

const Main = styled.div`
  display: flex;
  max-width: 600px;
  margin: 20px auto;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Banner = styled.div`
  height: 160px;
  position: relative;

  h2 {
    position: absolute;
    top: 50px;
    left: 20px;
    font-size: 35px;
    font-weight: 900;
    text-transform: capitalize;
    color: #242526;
  }
`;

const BannerImg = styled.img`
  height: 160px;
  width: 100%;
  object-fit: cover;
  opacity: 0.7;
`;

const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const InfoContainer = styled.div`
  border: 1px solid;

  background-color: #f5f0ed;
  padding: 20px;
  display: flex;
  flex-direction: column;

  gap: 20px;

  span {
    font-weight: 500;
    padding-right: 5px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 25px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  width: 60%;

  background: transparent;
  border: 1px solid;
  transition: background 0.5s ease-in-out;

  :hover {
    background-color: #dadce1;
  }

  @media screen and (max-width: 700px) {
    padding: 10px 35px;
  }

  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default BookingPage;
