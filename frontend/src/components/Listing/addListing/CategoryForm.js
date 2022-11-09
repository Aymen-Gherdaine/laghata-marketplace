import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { scrollToTop } from "../../../utils/utils";

// The form that handle the selecting of category and subCategory
const CategoryForm = ({ modifyIndex, listingData }) => {
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
  });

  // set form data state to the global state if the user decide to go back so he can find what he typed
  useEffect(() => {
    setFormData({
      category: listingData.category,
      subcategory: listingData.subcategory,
    });
  }, []);

  // handle radio input changes
  const handleRadio = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // prevent the form from reload the page when transitioning between forms
  const categorySubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={categorySubmitHandler}>
      <h1>Choose product category</h1>

      <input
        onChange={handleRadio}
        type="radio"
        name="category"
        id="surf"
        value="surf"
        checked={formData.category === "surf"}
      />
      <label htmlFor="surf">Surf</label>
      <input
        onChange={handleRadio}
        type="radio"
        name="category"
        id="bike"
        value="bike"
        checked={formData.category === "bike"}
      />
      <label htmlFor="bike">Bike</label>
      <input
        onChange={handleRadio}
        type="radio"
        name="category"
        id="snow"
        value="snow"
        checked={formData.category === "snow"}
      />
      <label htmlFor="snow">Snow</label>

      <h1>Choose product subcategory</h1>

      <input
        onChange={handleRadio}
        type="radio"
        name="subcategory"
        id="Standup paddleboard"
        value="Standup paddleboard"
        checked={formData.subcategory === "Standup paddleboard"}
      />
      <label htmlFor="Standup paddleboard">Standup paddleboard</label>
      <input
        onChange={handleRadio}
        type="radio"
        name="subcategory"
        id="kayak and canoe"
        value="kayak and canoe"
        checked={formData.subcategory === "kayak and canoe"}
      />
      <label htmlFor="kayak and canoe">kayak and canoe</label>
      <input
        onChange={handleRadio}
        type="radio"
        name="subcategory"
        id="Mountain bike"
        value="Mountain bike"
        checked={formData.subcategory === "Mountain bike"}
      />
      <label htmlFor="Mountain bike">Mountain bike</label>
      <input
        onChange={handleRadio}
        type="radio"
        name="subcategory"
        id="Road bike"
        value="Road bike"
        checked={formData.subcategory === "Road bike"}
      />
      <label htmlFor="Road bike">Road bike</label>
      <input
        onChange={handleRadio}
        type="radio"
        name="subcategory"
        id="Snowboard"
        value="Snowboard"
        checked={formData.subcategory === "Snowboard"}
      />
      <label htmlFor="Snowboard">Snowboard</label>
      <input
        onChange={handleRadio}
        type="radio"
        name="subcategory"
        id="Snow accessories"
        value="Snow accessories"
        checked={formData.subcategory === "Snow accessories"}
      />
      <label htmlFor="Snow accessories">Snow accessories</label>
      <Button
        onClick={() => {
          // change the index of form and submit the state data and handle the progress bar changes
          modifyIndex(3, formData, 35), scrollToTop();
        }}
      >
        Next
      </Button>
    </Form>
  );
};

// form listing style
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;

  h1 {
    font-size: 25px;
    font-weight: 500;

    @media screen and (max-width: 700px) {
      font-size: 21px;
    }
  }

  input[type="radio"] {
    display: none;
  }

  label {
    position: relative;
    cursor: pointer;
    color: #242526;
    font-family: "poppins", sans-serif;
    font-size: 20px;
    border: 2px solid #242526;
    border-radius: 10px;
    padding: 5px 20px;
    display: flex;
    width: 45%;
    align-items: center;

    @media screen and (max-width: 700px) {
      width: 75%;
    }
  }

  label:before {
    content: "";
    height: 20px;
    width: 20px;
    border: 3px solid #242526;
    border-radius: 50%;
    margin-right: 20px;
  }

  input:checked + label {
    background-color: #242526;
    color: white;
  }

  input[type="radio"]:checked + label:before {
    height: 16px;
    width: 16px;
    border: 10px solid white;
    background-color: #01cc65;
  }
`;

const Button = styled.button`
  padding: 10px 17px;
  margin: 5px auto;
  background: #000;
  color: #f5f0ed;
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
    width: 35%;
  }
`;

export default CategoryForm;
