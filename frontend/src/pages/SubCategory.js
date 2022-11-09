import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Listings from "../components/Listings";
import Search from "../components/Search";
import Filters from "../components/Filters";
import { Circles } from "react-loader-spinner";
import {
  fetchAllSubCategoryListing,
  fetchAllRenters,
} from "../utils/apiFetchFunctions";

const SubCategory = () => {
  const [updatedListing, setUpdatedListing] = useState([]);

  const [search, setSearch] = useState("");

  // get category id from url
  const { id } = useParams();

  // fetching listing data by listing category id
  const { data: listings } = useQuery(
    ["subCategoryListings", id],
    () => fetchAllSubCategoryListing(id),
    {
      onSuccess: () => setUpdatedListing(listings),
    }
  );

  // fetch renters data
  const { data: renters } = useQuery("renters", fetchAllRenters);

  return (
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
  );
};

// sub category page style
const AllListingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  max-width: 1300px;
  margin: 0 auto;

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

  .spinner {
    margin-top: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export default SubCategory;
