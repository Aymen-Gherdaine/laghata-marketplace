import React from "react";
import styled from "styled-components";

const Search = ({ search, setSearch }) => {
  // getting the value of the search and put it in the search state
  const searchProduct = (event) => {
    setSearch(event.target.value);
  };

  return (
    <SearchBar>
      <Input
        type="text"
        placeholder="Search for a listing title"
        value={search}
        onChange={searchProduct}
      />
    </SearchBar>
  );
};

// Search Component Style
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

export default Search;
