import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Slider from "@mui/material/Slider";
import styled from "styled-components";
import { scrollToTop } from "../utils/utils";

const Filters = ({ listings, setUpdatedListing }) => {
  const [price, setPrice] = useState([0, 400]);

  // handle price change
  const rangeSelector = (event, newValue) => {
    setPrice(newValue);
  };

  // filter data by price
  const filterDataByPrice = () => {
    let listingsCopy = listings;

    const minPrice = price[0];
    const maxPrice = price[1];

    listingsCopy = listingsCopy.filter(
      (listing) =>
        Number(listing.price) >= minPrice && Number(listing.price) <= maxPrice
    );

    setUpdatedListing(listingsCopy);
  };

  // calling the filter function when price change
  useEffect(() => {
    if (listings) {
      filterDataByPrice();
    }
  }, [price, listings]);

  return (
    <FilterSide>
      <NavLink
        to="/categories"
        className="sideBarNavLink"
        onClick={scrollToTop}
      >
        <h3>All Caterories</h3>
      </NavLink>
      <CategoriesFilter>
        <NavLink
          to="/category/surf"
          className="sideBarNavLink"
          onClick={scrollToTop}
        >
          SURF
        </NavLink>
        <Subcategory>
          <NavLink
            to="/category/surf/Standup paddleboard"
            className="sideBarNavLink"
            onClick={scrollToTop}
          >
            Standup paddleboard
          </NavLink>
          <NavLink
            to="/category/surf/kayak and canoe"
            className="sideBarNavLink"
            onClick={scrollToTop}
          >
            kayak and canoe
          </NavLink>
        </Subcategory>
        <NavLink
          to="/category/bike"
          className="sideBarNavLink"
          onClick={scrollToTop}
        >
          BIKE
        </NavLink>
        <Subcategory>
          <NavLink
            to="/category/surf/Mountain bike"
            className="sideBarNavLink"
            onClick={scrollToTop}
          >
            Mountain bike
          </NavLink>
          <NavLink
            to="/category/surf/Road bike"
            className="sideBarNavLink"
            onClick={scrollToTop}
          >
            Road bike
          </NavLink>
        </Subcategory>
        <NavLink
          to="/category/snow"
          className="sideBarNavLink"
          onClick={scrollToTop}
        >
          SNOW
        </NavLink>
        <Subcategory>
          <NavLink
            to="/category/surf/Snowboard"
            className="sideBarNavLink"
            onClick={scrollToTop}
          >
            Snowboard
          </NavLink>
          <NavLink
            to="/category/surf/Snow accessories"
            className="sideBarNavLink"
            onClick={scrollToTop}
          >
            Snow accessories
          </NavLink>
        </Subcategory>
        <PriceFilter>
          <h3>Price</h3>

          <Slider
            value={price}
            onChange={rangeSelector}
            valueLabelDisplay="auto"
            min={0}
            max={400}
          />
          <PriceRange>
            <h5>Min: ${price[0]}</h5>
            <h5>Max: ${price[1]}</h5>
          </PriceRange>
        </PriceFilter>
      </CategoriesFilter>
    </FilterSide>
  );
};

// Filters Component style
const FilterSide = styled.div`
  flex: 0.2;
  padding-left: 19px;
  padding-top: 15px;

  animation-name: moveTitleFromLeft;
  animation-duration: 1s;
  animation-timing-function: ease-out;

  h3 {
    padding-bottom: 10px;
  }

  .sideBarNavLink {
    opacity: 1;
    text-decoration: none;
    color: black;
    transition: 0.5s ease-in-out;
  }

  .sideBarNavLink:hover {
    color: #0009;
    opacity: 0.5;
    transform: translateX(5%);
  }

  @media screen and (max-width: 700px) {
    align-items: center;
    width: 80%;
    margin: 0 auto;
  }
`;

const CategoriesFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const Subcategory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding-left: 10px;
`;

const PriceRange = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PriceFilter = styled.div`
  width: 80%;
`;
export default Filters;
