import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Search from "../components/Search";
import { fetchAllListing, fetchAllRenters } from "../utils/apiFetchFunctions";
import Filters from "../components/Filters";
import Listings from "../components/Listings";
import { Circles } from "react-loader-spinner";

const Categories = () => {
  const [updatedListing, setUpdatedListing] = useState([]);

  const [search, setSearch] = useState("");

  const { data: listings } = useQuery("listings", fetchAllListing, {
    onSuccess: () => setUpdatedListing(listings),
  });

  const { data: renters } = useQuery("renters", fetchAllRenters);

  return (
    <CategoriesContainer>
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
    </CategoriesContainer>
  );
};

// categories style
const CategoriesContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  padding-bottom: 200px;

  .navLink {
    text-decoration: none;
    color: black;
    opacity: 1;
  }

  .spinner {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const ListingContainer = styled.div`
  flex: 0.8;
  width: 90%;
  margin: 50px auto;

  .spinner {
    margin-top: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Categories;
