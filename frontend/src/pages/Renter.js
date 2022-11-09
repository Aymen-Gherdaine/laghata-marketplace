import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import profilepage from "../assets/profilepage.jpg";
import Item from "../components/Item";
import Chat from "../components/chatSystem/Chat";
import LoadingSpinner from "../components/styleComponents/LoadingSpinner";
import { ChatContext } from "../components/context/ChatContext";
import { useUser } from "../components/hooks/useUser";

const Renter = () => {
  const { openChat, setOpenChat } = useContext(ChatContext);

  // get user information from useUser hook
  const user = useUser();

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState();
  const [renter, setRenter] = useState([]);
  const { id } = useParams();

  // fetching data by renterId
  useEffect(() => {
    try {
      setLoading(true);

      // fetch all renter listing
      const fechingRenterLisitngHandler = async () => {
        // fetch all renter listing by render id
        const fetchAllRenterListing = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/renter-listing/${id}`
        );

        // parse the response
        const responseJson = await fetchAllRenterListing.json();

        // fetch renter informations by renter id
        const fetchRenterInfo = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${id}`
        );

        // parse the response
        const responseJsonRenter = await fetchRenterInfo.json();

        if (responseJson.data && responseJsonRenter.data) {
          setListings(responseJson.data);

          const renterArr = [responseJsonRenter.data];

          setRenter(renterArr);

          setLoading(false);
        } else {
          setLoading(false);
        }
      };

      fechingRenterLisitngHandler();
    } catch (error) {
      console.log(error.stack);
      setLoading(false);
    }
  }, [id]);

  return (
    <ListingContainer>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {listings && renter && !loading && (
            <ListingWrapper>
              <Banner>
                <BannerImg src={profilepage} alt="banner" />
                <h2>{renter[0].username}</h2>
              </Banner>
              <Main>
                <LeftSide>
                  <ListingNumber>{listings.length} open listing</ListingNumber>
                  <ListingItem>
                    {listings.map((listing) => {
                      return (
                        <Item
                          listing={listing}
                          renters={renter}
                          key={listing._id}
                        />
                      );
                    })}
                  </ListingItem>
                </LeftSide>
                <RightSide>
                  <ProfileImg src={renter[0].picture} />
                  <Button
                    onClick={() => {
                      if (user) {
                        setOpenChat(true);
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    Contact {renter[0].username}
                  </Button>
                </RightSide>
              </Main>
              {user && user?._id !== renter[0]._id && (
                <ChatWrapper>
                  <Chat
                    picture={renter[0].picture}
                    renterUsername={renter[0].username}
                    renterId={renter[0]._id}
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
  );
};

// renter style
const ListingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 220px;

  .spinner {
    height: 80vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ListingWrapper = styled.div``;

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
  opacity: 0.3;
`;

const Main = styled.div`
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  align-items: flex-start;

  @media screen and (max-width: 700px) {
    flex-direction: column-reverse;
  }

  @media screen and (max-width: 1300px) {
    gap: 100px;
  }
`;

const ChatWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
`;

const RightSide = styled.div`
  flex: 0.3;
  margin: 50px auto;
  width: 80%;

  @media screen and (max-width: 700px) {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media screen and (min-width: 1300px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const LeftSide = styled.div`
  flex: 0.7;
`;

const ListingItem = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const ListingNumber = styled.h2`
  padding: 19px 41px;

  @media screen and (max-width: 700px) {
    margin-bottom: 15px;
  }
`;

const ProfileImg = styled.img`
  width: 70%;
  height: 240px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 25px;
  width: 70%;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  border-radius: 5px;
  border: 1px solid;
  transition: background 0.5s ease-in-out;

  :hover {
    background-color: #dadce1;
  }
`;
export default Renter;
