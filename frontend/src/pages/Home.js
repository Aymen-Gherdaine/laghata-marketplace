import React from "react";
import styled from "styled-components";
import AboutSection from "../components/home/AboutSection";
import Testimonials from "../components/home/Testimonials";
import Categories from "../components/home/Categories";
import Hero from "../components/home/Hero";

const Home = () => {
  return (
    <HomePage>
      <Hero />

      <Categories />

      <AboutSection />

      <Testimonials />
    </HomePage>
  );
};

// home page style
const HomePage = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 180px;

  .animationSlideUp {
    animation-name: slideInUp;
    animation-duration: 2s;
    animation-timing-function: ease-out;
  }

  .moveFromRight {
    animation-name: moveTitleFromRight;
    animation-duration: 2s;
    animation-timing-function: ease-out;
  }

  .moveFromLeft {
    animation-name: moveTitleFromLeft;
    animation-duration: 2s;
    animation-timing-function: ease-out;
  }

  @keyframes moveTitleFromLeft {
    0% {
      opacity: 0;
      transform: translate(-100px);
    }

    80% {
      transform: translate(15px);
    }

    100% {
      opacity: 1;
      transform: translate(0);
    }
  }

  @keyframes moveTitleFromRight {
    0% {
      opacity: 0;
      transform: translate(100px);
    }

    80% {
      transform: translate(-10px);
    }

    100% {
      opacity: 1;
      transform: translate(0);
    }
  }

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

export default Home;
