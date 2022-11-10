import React from "react";
import styled from "styled-components";
import home1 from "../../assets/home1.jpg";

const Hero = () => {
  return (
    <HeroBackground>
      <img src={home1} />
      <div>
        <h1>Great adventure equipement. Great times</h1>
      </div>
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

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  h1 {
    color: #f5f9f8;
    font-size: 45px;

    text-transform: capitalize;
    text-align: center;

    animation-name: titleSlideInUp;
    animation-duration: 2s;
    animation-timing-function: ease-out;
  }
`;

export default Hero;
