import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import ImageSlider from "../../styleComponents/ImageSlider";
import { scrollToTop } from "../../../utils/utils";

const CardEnd = ({ listingData, handleReturn }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const UploadListingToDataBase = async () => {
    // POST info to server
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: listingData.name,
        price: listingData.price,
        category: listingData.category,
        subcategory: listingData.subcategory,
        description: listingData.description,
        model: listingData.model,
        size: listingData.size,
        location: listingData.location,
        imageSrc: listingData.imageSrc,
        isBooked: listingData.isBooked,
        renterId: listingData.renterId,
        reservationsIds: listingData.reservationsIds,
        reviewsIds: listingData.reviewsIds,
      }),
    };

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/listing/${id}`,
        requestOptions
      );

      if (response.status === 204) {
        console.log(response);
        setLoading(false);
        navigate("/userlisting");
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Listing key={listingData.name}>
        <LeftSide>
          <Title>{listingData.name}</Title>
          <ImgContainer>
            {listingData.imageSrc.length > 0 && (
              <ImgContainer>
                <ImageSlider slides={listingData.imageSrc} />
              </ImgContainer>
            )}
          </ImgContainer>
        </LeftSide>
        <RightSide>
          <Location>{listingData.location}</Location>
          <Price>Price: ${listingData.price} /day</Price>
          <Description>
            <Span>Description: </Span>
            <p>{listingData.description}</p>
          </Description>
          <Modal>
            <Span>Model: </Span>
            <p>{listingData.model}</p>
          </Modal>
          <Size>
            <Span>Size: </Span>
            <p>{listingData.size}</p>
          </Size>
        </RightSide>
      </Listing>

      <BtnContainer>
        <BackButton
          type="button"
          onClick={() => {
            handleReturn(4, listingData, 70), scrollToTop();
          }}
        >
          Back
        </BackButton>

        <Button
          onClick={() => {
            UploadListingToDataBase(), scrollToTop();
          }}
        >
          {loading ? (
            <Circles
              height="30"
              width="30"
              color="#54cbe3"
              ariaLabel="circles-loading"
              wrapperClass="spinner"
              visible={true}
            />
          ) : (
            "Update"
          )}
        </Button>
      </BtnContainer>
    </>
  );
};

// style
const Listing = styled.div`
  display: flex;
  position: relative;
`;

const LeftSide = styled.div`
  flex: 0.6;
  margin-bottom: 10px;
`;

const RightSide = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
  padding: 20px;
  margin-bottom: 10px;
  max-width: fit-content;
  position: sticky;

  span {
    font-weight: 500;
  }

  p {
    font-weight: 400;
  }
`;

const Span = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

const Location = styled.h3`
  font-size: 19px;
  font-weight: 500;
  text-transform: capitalize;
`;
const Price = styled.h4`
  font-size: 19px;
  font-weight: 500;
`;
const Description = styled.h4`
  max-width: 270px;
`;
const Modal = styled.h4``;
const Size = styled.h4``;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 500;
  padding-left: 15px;
  margin-bottom: 20px;
`;

const ImgContainer = styled.div`
  width: 85%;
  height: 300px;
  margin: 0 auto;
`;

const Button = styled.button`
  padding: 10px 17px;
  background: black;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BackButton = styled.button`
  padding: 10px 17px;
  background: transparent;
  color: black;
  border: 1px solid black;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
`;

export default CardEnd;
