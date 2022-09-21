import React from "react";
import styled from "styled-components";

// the first form card it just tell the user to start adding his listing
const CardBegin = ({ modifyIndex }) => {
  return (
    <Card>
      <Title>Create your listing</Title>
      <Cardbutton onClick={() => modifyIndex(2)}>Start</Cardbutton>
    </Card>
  );
};

// card begin style
const Card = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 700px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 15px;

  @media screen and (max-width: 700px) {
    font-size: 30px;
  }
`;
const Cardbutton = styled.div`
  padding: 10px 17px;
  margin: 10px auto;
  background: black;
  color: white;
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

export default CardBegin;
