import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Listings from "../components/Listings";
import Search from "../components/Search";
import Filters from "../components/Filters";
import surf1 from "../assets/surf1.jpg";
import snow from "../assets/snow.jpg";
import bike from "../assets/bike.jpg";
import { Circles } from "react-loader-spinner";
import {
  fetchAllCategoryListing,
  fetchAllRenters,
} from "../utils/apiFetchFunctions";

const Category = () => {
  const [updatedListing, setUpdatedListing] = useState([]);

  const [search, setSearch] = useState("");

  // get category id from url
  const { id } = useParams();

  // fetching listing data by listing category id
  const { data: listings } = useQuery(
    ["categoryListings", id],
    () => fetchAllCategoryListing(id),
    {
      onSuccess: () => setUpdatedListing(listings),
    }
  );

  // fetch renters data
  const { data: renters } = useQuery("renters", fetchAllRenters);

  return (
    <>
      <Hero>
        <img
          src={
            id === "bike" ? bike : id === "surf" ? surf1 : id === "snow" && snow
          }
          alt="bike"
        />
      </Hero>
      <AllListingContainer>
        <Filters listings={listings} setUpdatedListing={setUpdatedListing} />

        <ListingContainer>
          <Search search={search} setSearch={setSearch} />

          {listings && renters ? (
            <Listings
              search={search}
              listings={listings}
              renters={renters}
              updatedListing={updatedListing}
            />
          ) : (
            <Circles
              height="35"
              width="35"
              color="#010101"
              ariaLabel="circles-loading"
              wrapperClass="spinner"
              visible={true}
            />
          )}
        </ListingContainer>
      </AllListingContainer>
    </>
  );
};

// category page style
const AllListingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  max-width: 1300px;
  margin: 0 auto;

  .spinner {
    height: 10vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .navLink {
    text-decoration: none;
    color: black;
    opacity: 1;
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const ListingContainer = styled.div`
  flex: 0.8;
  margin: 50px auto;
`;

const Hero = styled.div`
  height: 300px;
  width: 100%;

  img {
    object-fit: cover;
    height: 300px;
    width: 100%;
  }
`;

export default Category;
