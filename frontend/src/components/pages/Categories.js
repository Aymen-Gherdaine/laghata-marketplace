import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Item from "../Item";
import { scrollToTop } from "../utils";
import LoadingSpinner from "../styleComponents/LoadingSpinner";

const Categories = () => {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [updatedListing, setUpdatedListing] = useState([]);
  const [renters, setRenters] = useState([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState([0, 400]);

  // getting the value of the search and put it in the search state
  const searchProduct = (event) => {
    setSearch(event.target.value);
  };

  // fetching data
  useEffect(() => {
    try {
      setLoading(true);

      // function that handle the fetch of defferent data (listings & renters)
      const fechingDataHandler = async () => {
        // fetch all listing
        const fetchAllListing = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/get-all-listings`
        );

        // parse the response
        const responseJson = await fetchAllListing.json();

        // fetch all renters
        const fetchAllRenters = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/users`
        );

        // parse the response
        const responseJsonRenters = await fetchAllRenters.json();

        if (
          responseJson.data.length > 0 &&
          responseJsonRenters.data.length > 0
        ) {
          setListings(responseJson.data);

          setRenters(responseJsonRenters.data);

          setUpdatedListing(responseJson.data);

          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      fechingDataHandler();
    } catch (error) {
      console.log(error.stack);
      setLoading(false);
    }
  }, []);

  // handle price change
  const rangeSelector = (event, newValue) => {
    setPrice(newValue);
  };

  // filter data by price
  const filterDataByPrice = () => {
    // create a copy of our listing state to manipulate the copy and not the original one
    let listingsCopy = listings;

    // set the max and min price
    const minPrice = price[0];
    const maxPrice = price[1];

    // filter the listing copy array depending to the max and min price
    listingsCopy = listingsCopy.filter(
      (listing) =>
        Number(listing.price) >= minPrice && Number(listing.price) <= maxPrice
    );

    // update the listing state
    setUpdatedListing(listingsCopy);
  };

  // calling the filter function when price change
  useEffect(() => {
    filterDataByPrice();
  }, [price]);

  return (
    <CategoriesContainer>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <AllListingContainer>
            <FilterSide>
              <h3>All Caterories</h3>
              <CategoriesFilter>
                <NavLink
                  to="/category/surf"
                  className="sideBarNavLink"
                  onClick={scrollToTop}
                >
                  SURF
                </NavLink>
                <NavLink
                  to="/category/bike"
                  className="sideBarNavLink"
                  onClick={scrollToTop}
                >
                  BIKE
                </NavLink>
                <NavLink
                  to="/category/snow"
                  className="sideBarNavLink"
                  onClick={scrollToTop}
                >
                  SNOW
                </NavLink>
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
            <ListingContainer>
              <SearchBar>
                <Input
                  type="text"
                  placeholder="Search for a listing title"
                  value={search}
                  onChange={searchProduct}
                />
              </SearchBar>
              <ListingGrid>
                {listings &&
                  renters &&
                  updatedListing &&
                  updatedListing
                    .filter((product) => {
                      if (search === "") {
                        return product;
                      } else if (
                        product.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return product;
                      }
                    })
                    .map((listing) => {
                      return (
                        <Item
                          listing={listing}
                          renters={renters}
                          key={listing._id}
                        />
                      );
                    })}
              </ListingGrid>
            </ListingContainer>
          </AllListingContainer>
        </>
      )}
    </CategoriesContainer>
  );
};

// categories style
const CategoriesContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;
const AllListingContainer = styled.div`
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  padding-bottom: 200px;

  .spinner {
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

const SearchBar = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
`;

const Input = styled.input`
  padding: 10px 15px;
  width: 40%;
  border-radius: 10px;
  outline: none;
  border: 1px solid;
  font-size: 16px;
  position: relative;

  @media screen and (max-width: 700px) {
    width: 80%;
  }
`;

const FilterSide = styled.div`
  flex: 0.2;
  padding-left: 19px;
  padding-top: 15px;

  animation-name: moveTitleFromLeft;
  animation-duration: 1s;
  animation-timing-function: ease-out;

  h3 {
    padding-bottom: 10px;

    @media screen and (max-width: 700px) {
      text-align: center;
      padding-bottom: 15px;
    }
  }

  .sideBarNavLink {
    opacity: 1;
    text-decoration: none;
    color: black;
    transition: 0.2s ease-in-out;
  }

  .sideBarNavLink:hover {
    color: #242526;
    opacity: 0.3;
  }
`;

const ListingContainer = styled.div`
  flex: 0.8;
  width: 90%;
  margin: 50px auto;
`;

const CategoriesFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  @media screen and (max-width: 700px) {
    align-items: center;
    width: 90%;
    margin: 0 auto;
  }
`;

const PriceRange = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PriceFilter = styled.div`
  width: 80%;
`;
export default Categories;
