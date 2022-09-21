import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { scrollToTop } from "../../utils";

// product info form component
const ProductInfoForm = ({ modifyIndex, handleReturn, listingData }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    model: "",
    size: "",
    location: "",
    description: "",
  });

  // set the formData state to the global state if the user go back
  useEffect(() => {
    setFormData(listingData);
  }, []);

  // handle user input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Form onSubmit={() => e.preventDefault()}>
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

    @media screen and (max-width: 700px) {
      width: 75%;
    }
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

    @media screen and (max-width: 700px) {
      width: 75%;
    }
  }

  textarea {
    max-width: 60%;
    overflow-y: hidden;

    @media screen and (max-width: 700px) {
      max-width: 75%;
    }
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

  @media screen and (max-width: 700px) {
    width: 33%;
  }
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

  @media screen and (max-width: 700px) {
    width: 33%;
  }
`;
export default ProductInfoForm;
