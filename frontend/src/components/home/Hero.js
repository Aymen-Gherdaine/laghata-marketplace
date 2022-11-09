import React from "react";
import styled from "styled-components";
import home1 from "../../assets/home1.jpg";

const Hero = () => {
  return (
    <HeroBackground>
      <img src={home1} />
      <h1>Great adventure equipement. Great times</h1>
    </HeroBackground>
  );
};

// Hero Section Style
const HeroBackground = styled.div`
  height: 550px;
  position: relative;

  img {
    height: 550px;
    width: 100%;
    object-fit: cover;
  }

  h1 {
    color: #f5f0ed;
    font-size: 35px;
    position: absolute;
    top: 150px;
    left: 50px;
    text-transform: capitalize;

    animation-name: moveTitleFromLeft;
    animation-duration: 2s;
    animation-timing-function: ease-out;
  }
`;

export default Hero;
