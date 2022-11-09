import React from "react";
import styled from "styled-components";
import Item from "./Item";

const Listings = ({ listings, renters, updatedListing, search }) => {
  return (
    <ListingGrid>
      {listings &&
        renters &&
        updatedListing &&
        updatedListing
          .filter((product) => {
            if (search === "") {
              return product;
            } else if (
              product.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return product;
            }
          })
          .map((listing) => {
            return (
              <Item listing={listing} renters={renters} key={listing._id} />
            );
          })}
    </ListingGrid>
  );
};

// Listings style
const ListingGrid = styled.div`
  max-width: 96%;

  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  gap: 15px;

  animation-name: slideInUp;
  animation-duration: 1s;
  animation-timing-function: ease-out;

  @-webkit-keyframes slideInUp {
    0% {
      transform: translateY(100%);
      visibility: visible;
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes slideInUp {
    0% {
      transform: translateY(100%);
      visibility: visible;
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default Listings;
