import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ImageSlider from "../styleComponents/ImageSlider";
import beachsurf from "../../assets/beachsurf.jpg";
import cyclists from "../../assets/cyclists.jpg";
import snow1 from "../../assets/snow1.jpg";
import surf1 from "../../assets/surf1.jpg";
import { NavLink } from "react-router-dom";
import Calendar from "../styleComponents/Calendar";
import LoadingSpinner from "../styleComponents/LoadingSpinner";
import { scrollToTop } from "../utils";
import Chat from "../chatSystem/Chat";
import Reviews from "../Reviews/Reviews";
import { ChatContext } from "../context/ChatContext";
import { useUser } from "../hooks/useUser";

const Listing = () => {
  // getting information from our chat context
  const { openChat, setOpenChat } = useContext(ChatContext);

  // get user information from useUser hook
  const user = useUser();

  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState();
  const [renter, setRenter] = useState();
  const [reservations, setReservations] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  // fetching data by listing id
  useEffect(() => {
    try {
      setLoading(true);

      // function that handle the fetch from our database
      const fechingLisitngDataHandler = async () => {
        // fetching listing data by listing id
        const fetchListingById = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/listings/listing/${id}`
        );

        // parse the response
        const responseJson = await fetchListingById.json();

        // fetch renter information by renter id
        const fetchRenter = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${responseJson?.data?.renterId}`
        );

        // parse the response
        const responseJsonRenter = await fetchRenter.json();

        // fetch all reservation for this specific listing
        const fetchReservations = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/reservations/listing/${id}`
        );

        // parse the respone
        const responseJsonReservation = await fetchReservations.json();

        if (responseJson.data && responseJsonRenter.data) {
          // update our states with the data received from the database
          setListing(responseJson.data);

          setRenter(responseJsonRenter.data);

          setReservations(responseJsonReservation.data);

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

  return (
    <ListingPage>
      <ListingContainer>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {listing && renter && !loading && (
              <ListingWrapper>
                <Banner>
                  <BannerImg
                    src={
                      listing.category === "surf"
                        ? beachsurf
                        : listing.category === "bike"
                        ? cyclists
                        : listing.category === "Snow"
                        ? snow1
                        : surf1
                    }
                    alt="banner"
                  />
                  <h2>{listing.name}</h2>
                </Banner>
                <Main>
                  <LeftSide>
                    <SliderContainer>
                      <ImageSlider slides={listing.imageSrc} />
                    </SliderContainer>
                    <ListingDetails>
                      <Description>
                        <span>Description: </span>
                        <p>{listing.description}</p>
                      </Description>
                      <Model>
                        <span>Model: </span>
                        {listing.model}
                      </Model>
                      <Size>
                        <span>Size: </span>
                        {listing.size}
                      </Size>
                      <Reviews
                        currentUserId={user?._id}
                        listingId={id}
                        reviewsIds={listing.reviewsIds}
                      />
                    </ListingDetails>
                  </LeftSide>
                  <RightSide>
                    <Price>
                      <p>${listing.price}</p>
                      <span>/Day</span>
                    </Price>
                    <BookingWrapper>
                      <Calendar reservations={reservations} />
                      <NavLink
                        to={`/listing/${listing._id}/booking`}
                        onClick={scrollToTop}
                      >
                        <BookingBtn>Book</BookingBtn>
                      </NavLink>
                    </BookingWrapper>
                    <RenterContact>
                      <NavLink to={`/renter/${renter._id}`} className="navlink">
                        <ProfileImg src={renter.picture} alt="renter picture" />
                      </NavLink>
                      <ProfileContact>
                        <NavLink
                          to={`/renter/${renter._id}`}
                          className="navlink"
                        >
                          <Username>{renter.username}</Username>
                        </NavLink>
                        <Button
                          onClick={() => {
                            if (user) {
                              setOpenChat(true);
                            } else {
                              navigate("/login");
                            }
                          }}
                        >
                          Contact
                        </Button>
                      </ProfileContact>
                    </RenterContact>
                  </RightSide>
                </Main>
                {user && (
                  <ChatWrapper>
                    <Chat
                      picture={renter.picture}
                      renterUsername={renter.username}
                      renterId={renter._id}
                      openChat={openChat}
                      setOpenChat={setOpenChat}
                      currentUserName={user?.username}
                      currentUserPicture={user?.picture}
                      currentUserId={user?._id}
                    />
                  </ChatWrapper>
                )}
              </ListingWrapper>
            )}
          </>
        )}
      </ListingContainer>
    </ListingPage>
  );
};

// listing style
const ListingPage = styled.div`
  min-height: 100vh;

  position: relative;
`;

const ListingContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ListingWrapper = styled.div`
  padding-bottom: 100px;
`;

const ChatWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
`;

const Main = styled.div`
  display: flex;
  max-width: 1300px;
  margin: 0 auto;

  @media screen and (max-width: 700px) {
    flex-direction: column-reverse;
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

const SliderContainer = styled.div`
  margin-top: 30px;
  width: 85%;
  height: 450px;
  margin: 0 auto;

  @media screen and (max-width: 700px) {
    height: 250px;
  }
`;

const LeftSide = styled.div`
  flex: 0.7;
  width: 80%;
  margin: 30px auto 0 auto;

  @media screen and (max-width: 700px) {
    margin: 30px auto 10px auto;
  }
`;

const RightSide = styled.div`
  flex: 0.3;
  margin: 30px auto 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media screen and (max-width: 700px) {
    width: 80%;
  }
`;

const ListingDetails = styled.div`
  margin: 30px auto;
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  span {
    font-weight: 600;
  }
`;

const Description = styled.div`
  p {
    white-space: wrap;
    overflow: hidden;
  }
`;

const Model = styled.div``;
const Size = styled.div``;

const Price = styled.div`
  display: flex;
  gap: 7px;

  p {
    font-size: 35px;
    font-weight: 500;
    color: #242526;
  }

  span {
    padding-top: 3px;
  }
`;

const RenterContact = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-top: 1px solid;
  width: 96%;
  padding-top: 15px;
  padding-left: 5px;

  @media screen and (max-width: 700px) {
    gap: 40px;
  }
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;

  @media screen and (max-width: 1000px) {
    width: 130px;
    height: 130px;
  }
`;

const ProfileContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  gap: 25px;

  .navlink {
    text-decoration: none;
  }
`;

const Username = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: #242526;
  text-transform: capitalize;
`;

const Button = styled.button`
  padding: 10px 25px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  border: 1px solid;
  transition: background 0.5s ease-in-out;

  :hover {
    background-color: #dadce1;
  }

  @media screen and (max-width: 700px) {
    padding: 10px 35px;
  }
`;

const BookingWrapper = styled.div``;

const BookingBtn = styled.button`
  width: 90%;
  padding: 10px 20px;
  font-size: 17px;
  background: #000;
  color: #f5f0ed;
  border-radius: 5px;
  transition: background 0.4s ease-in-out;
  margin-top: 15px;
  cursor: pointer;

  :hover {
    background: #f5f0ed;
    color: #000;
  }
`;

export default Listing;
