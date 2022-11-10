import React, { useEffect, useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import CardBegin from "./CardBegin";
import CardEnd from "./CardEnd";
import CategoryForm from "./CategoryForm";
import Indicator from "./Indicator";
import ProductInfoForm from "./ProductInfoForm";
import UploadPhotosForm from "./UploadPhotosForm";
import { Navigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../styleComponents/LoadingSpinner";
import { CurrentUserContext } from "../../context/CurrentUserContext";

// the global form that handle all the other sub forms
const EditListing = () => {
  // get user information from current user context hook
  const { user } = useContext(CurrentUserContext);

  const [formIndex, setFormIndex] = useState(1);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [listingData, setListingData] = useState({
    name: "",
    price: "",
    category: "",
    subcategory: "",
    description: "",
    model: "",
    size: "",
    location: "",
    imageSrc: [],
    isBooked: false,
    renterId: user?._id,
    reservationsIds: [],
    reviewsIds: [],
  });
  const [currentListingData, setCurrentListingData] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // fetching current listing data
  useEffect(() => {
    try {
      setLoading(true);

      const fetchCurrentListingData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/listings/listing/${id}`
        );

        const responseJson = await response.json();

        if (responseJson.data) {
          setCurrentListingData(responseJson.data);

          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      fetchCurrentListingData();
    } catch (error) {
      console.log(error.stack);
      setLoading(false);
    }
  }, []);

  // change index of card and the state of the listing
  const modifyIndex = (index, data, value) => {
    setFormIndex(index);

    if (data) {
      // create a copy of our global state
      const listingDataCopy = { ...listingData };

      // update data property
      const newlistingData = Object.keys(data);

      newlistingData.map((key) => {
        listingDataCopy[key] = data[key];
      });

      // update the state
      setListingData(listingDataCopy);
      setProgressBarValue(value);
    }
  };

  // handle return
  const handleReturn = (index, data, value) => {
    modifyIndex(index, data, value);
  };

  return (
    <>
      {user ? (
        <MultiFormWrapper>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <MultiFormContainer>
                <Indicator progressBarValue={progressBarValue} />
                {formIndex === 1 ? (
                  <CardBegin modifyIndex={modifyIndex} />
                ) : formIndex === 2 ? (
                  <CategoryForm
                    modifyIndex={modifyIndex}
                    currentListingData={currentListingData}
                  />
                ) : formIndex === 3 ? (
                  <ProductInfoForm
                    modifyIndex={modifyIndex}
                    handleReturn={handleReturn}
                    currentListingData={currentListingData}
                  />
                ) : formIndex === 4 ? (
                  <UploadPhotosForm
                    modifyIndex={modifyIndex}
                    handleReturn={handleReturn}
                    currentListingData={currentListingData}
                  />
                ) : formIndex === 5 ? (
                  <CardEnd
                    listingData={listingData}
                    handleReturn={handleReturn}
                  />
                ) : (
                  ""
                )}
              </MultiFormContainer>
            </>
          )}
        </MultiFormWrapper>
      ) : (
        <>
          <Navigate to="/login" />
        </>
      )}
    </>
  );
};

// Multiform style
const MultiFormWrapper = styled.div`
  min-height: 100vh;
  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const MultiFormContainer = styled.div`
  max-width: 700px;
  background: #f5f5f3;
  margin: 200px auto 0;
  position: relative;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 100px;

  @media screen and (max-width: 700px) {
    margin: 200px 10px;
  }
`;

export default EditListing;
