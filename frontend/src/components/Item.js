import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { scrollToTop } from "./utils";

// Item (single listing) component
const Item = ({ listing, renters }) => {
  return (
    <ListingWrapper>
      <NavLink
        to={`/listing/${listing._id}`}
        className="navLink"
        onClick={scrollToTop}
      >
        <ListingMain>
          <Img src={listing.imageSrc[0]} alt={listing.name} />
          <Price>${listing.price}/Day</Price>
          <ListingName>{listing.name}</ListingName>
        </ListingMain>
      </NavLink>
      {renters.map((renter) => {
        if (renter._id === listing.renterId) {
          return (
            <NavLink
              to={`/renter/${renter._id}`}
              className="navLink"
              key={renter._id}
            >
              <ListingRenterInfo>
                <img src={renter.picture} alt="Renter photo" />
                <p>{renter.username}</p>
              </ListingRenterInfo>
            </NavLink>
          );
        }
      })}
    </ListingWrapper>
  );
};

// listing style
const ListingWrapper = styled.div`
  width: 290px;
  height: 320px;
  border-radius: 25px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  .navLink {
    text-decoration: none;
  }
`;

const ListingMain = styled.div`
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 245px;
  border-radius: 25px 25px 0 0;
`;

const Price = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 5px 8px;
  background-color: #fff;
  color: #242526;
  font-weight: 500;
  border-radius: 0 25px 0 25px;
`;

const ListingName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  font-weight: 500;
  font-size: 18px;
  text-transform: capitalize;
  padding: 0 0 13px 10px;
`;

const ListingRenterInfo = styled.div`
  background-color: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 24%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 10px;
  border-radius: 0 0 25px 25px;

  img {
    width: 37px;
    height: 37px;
    border-radius: 50%;
  }

  p {
    font-weight: 500;
    text-transform: capitalize;
    color: #242526;
    font-size: 17px;
  }
`;
export default Item;
