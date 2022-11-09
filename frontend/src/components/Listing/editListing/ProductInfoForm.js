import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { scrollToTop } from "../../../utils/utils";

// product info form component
const ProductInfoForm = ({ modifyIndex, handleReturn, currentListingData }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    model: "",
    size: "",
    location: "",
    description: "",
  });

  // set the state to the previous state (user will find all his previous infos)
  useEffect(() => {
    setFormData({
      name: currentListingData.name,
      price: currentListingData.price,
      model: currentListingData.model,
      size: currentListingData.size,
      location: currentListingData.location,
      description: currentListingData.description,
    });
  }, []);

  // handle forData changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <label>Product Name*</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <label>Price*</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Renting Price"
        required
      />
      <label>Model</label>
      <input
        type="text"
        name="model"
        value={formData.model}
        onChange={handleChange}
        placeholder="Model"
      />
      <label>Size</label>
      <input
        type="text"
        name="size"
        value={formData.size}
        onChange={handleChange}
        placeholder="Size"
      />
      <label>Location*</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />
      <label>Description*</label>
      <textarea
        type="text-aria"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <BtnContainer>
        <BackButton
          type="button"
          onClick={() => {
            handleReturn(2, formData, 0), scrollToTop();
          }}
        >
          Back
        </BackButton>
        <Button
          onClick={() => {
            modifyIndex(4, formData, 70), scrollToTop();
          }}
        >
          Next
        </Button>
      </BtnContainer>
    </Form>
  );
};

// form listing style
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    width: 60%;
    margin: 0 auto;
    padding: 0 0 0 5px;
    font-weight: 500;
  }

  textarea,
  input {
    padding: 10px;
    border-radius: 7px;
    outline: none;
    font-size: 17px;
    width: 60%;
    margin: 0 auto;
    border: 1px solid;
  }

  textarea {
    max-width: 60%;
    overflow-y: hidden;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
`;
const Button = styled.button`
  padding: 10px 17px;
  background: #000;
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
export default ProductInfoForm;
