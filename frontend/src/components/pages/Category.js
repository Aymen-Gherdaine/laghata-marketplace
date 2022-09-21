import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Item from "../Item";
import surf1 from "../../assets/surf1.jpg";
import snow from "../../assets/snow.jpg";
import bike from "../../assets/bike.jpg";
import LoadingSpinner from "../styleComponents/LoadingSpinner";

const Category = () => {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [updatedListing, setUpdatedListing] = useState([]);
  const [renters, setRenters] = useState([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState([0, 400]);

  // take the category id from the url params
  const { id } = useParams();

  // getting the value of the search and put it in the search state
  const searchProduct = (event) => {
    setSearch(event.target.value);
  };

  // fetching data by category
  useEffect(() => {
    try {
      setLoading(true);

      // function that handle the fetch of data
      const fechingDataHandler = async () => {
        // fetch all listing by category
        const fetchAllListingByCategory = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/listings/${id}`
        );

        // parse the response
        const responseJson = await fetchAllListingByCategory.json();

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
          // update our states with data received

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
  }, [id]);

  // handle price change
  const rangeSelector = (event, newValue) => {
    setPrice(newValue);
  };

  // filter data by price
  const filterDataByPrice = () => {
    // create a copy of our state
    let listingsCopy = listings;

    // set the min and max price to the current min and max
    const minPrice = price[0];
    const maxPrice = price[1];

    // filter the copy to get the price between our range
    listingsCopy = listingsCopy.filter(
      (listing) =>
        Number(listing.price) >= minPrice && Number(listing.price) <= maxPrice
    );

    // update our state
    setUpdatedListing(listingsCopy);
  };

  // calling the filter function when price change
  useEffect(() => {
    filterDataByPrice();
  }, [price]);

  return (
    <CategoryPageContainer>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Hero>
            <img
              src={
                id === "bike"
                  ? bike
                  : id === "surf"
                  ? surf1
                  : id === "snow" && snow
              }
              alt="bike"
            />
          </Hero>
          <AllListingContainer>
            <FilterSide>
              <NavLink to="/categories" className="sideBarNavLink">
                <h3>All Caterories</h3>
              </NavLink>
              <CategoriesFilter>
                <NavLink to="/category/surf" className="sideBarNavLink">
                  SURF
                </NavLink>
                <Subcategory>
                  <NavLink
                    to="/category/surf/Standup paddleboard"
                    className="sideBarNavLink"
                  >
                    Standup paddleboard
                  </NavLink>
                  <NavLink
                    to="/category/surf/kayak and canoe"
                    className="sideBarNavLink"
                  >
                    kayak and canoe
                  </NavLink>
                </Subcategory>
                <NavLink to="/category/bike" className="sideBarNavLink">
                  BIKE
                </NavLink>
                <Subcategory>
                  <NavLink
                    to="/category/surf/Mountain bike"
                    className="sideBarNavLink"
                  >
                    Mountain bike
                  </NavLink>
                  <NavLink
                    to="/category/surf/Road bike"
                    className="sideBarNavLink"
                  >
                    Road bike
                  </NavLink>
                </Subcategory>
                <NavLink to="/category/snow" className="sideBarNavLink">
                  SNOW
                </NavLink>
                <Subcategory>
                  <NavLink
                    to="/category/surf/Snowboard"
                    className="sideBarNavLink"
                  >
                    Snowboard
                  </NavLink>
                  <NavLink
                    to="/category/surf/Snow accessories"
                    className="sideBarNavLink"
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
    </CategoryPageContainer>
  );
};

// category page style
const CategoryPageContainer = styled.div`
  min-height: 100vh;
`;
const AllListingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  max-width: 1300px;
  margin: 0 auto;

  .spinner {
    height: 60vh;
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

const Hero = styled.div`
  height: 300px;
  width: 100%;

  img {
    object-fit: cover;
    height: 300px;
    width: 100%;
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
    color: red;
    opacity: 0.3;
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
  font-weight: 500;

  @media screen and (max-width: 700px) {
    align-items: center;
    width: 90%;
    margin: 0 auto;
  }
`;

const Subcategory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding-left: 10px;

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
export default Category;
