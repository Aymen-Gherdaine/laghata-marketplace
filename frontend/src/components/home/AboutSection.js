import React from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
  const { ref: aboutSectionRefLeft, inView: inViewLeftEl } = useInView();
  const { ref: aboutSectionRefRight, inView: inViewRightEl } = useInView();

  return (
    <AboutSectionContainer>
      <LeftSide
        ref={aboutSectionRefLeft}
        className={`${inViewLeftEl ? "moveFromLeft" : ""}`}
      >
        <h1>Traveling with no hassle</h1>
        <p>
          Laghata offers personalized service for every trip with our Surf Bike
          and Snow marketplace. Whether you're a first time traveler or a
          seasoned traveler, we have the right gear for you.
        </p>
      </LeftSide>
      <RightSide
        ref={aboutSectionRefRight}
        className={`${inViewRightEl ? "moveFromRight" : ""}`}
      >
        <Img
          src="https://images.unsplash.com/photo-1512249167167-32fb4f8b17f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTl8fHN1cmZ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          className="photo1"
        />
        <Img
          src="https://images.unsplash.com/photo-1444491741275-3747c53c99b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmlrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          className="photo2"
        />
        <Img
          src="https://images.unsplash.com/photo-1486078695445-0497c2f58cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNub3d8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          className="photo3"
        />
      </RightSide>
    </AboutSectionContainer>
  );
};

// About Us Section
const AboutSectionContainer = styled.section`
  max-width: 1300px;
  height: 600px;
  display: flex;
  margin: 20px auto;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    height: 500px;
  }
`;

const LeftSide = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: flex-start;
  padding-top: 180px;

  p {
    text-align: center;
    width: 90%;
    margin: 0 auto;
  }

  @media screen and (max-width: 700px) {
    padding-top: 30px;
  }
`;
const RightSide = styled.div`
  flex: 0.5;
  position: relative;
  margin: 40px 30px;
  transition: all 0.4s;

  .photo1 {
    left: 1rem;
    top: 7rem;
  }

  .photo2 {
    right: 1.5rem;
    top: 5rem;
  }

  .photo3 {
    left: 20%;
    top: 11rem;
  }

  @media screen and (max-width: 700px) {
    width: 90%;
    margin: 0 30px 40px 30px;

    .photo1 {
      left: 2rem;
      top: 2rem;
    }

    .photo2 {
      right: 2rem;
      top: 0.7rem;
    }

    .photo3 {
      left: 6.2rem;
      top: 5rem;
    }
  }
`;

const Img = styled.img`
  width: 50%;
  height: 40%;
  object-fit: cover;
  box-shadow: 0 1.5rem 4rem black;
  border-radius: 10px;
  position: absolute;
  z-index: 1;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2.5 4rem #000;
    z-index: 2;
  }

  @media screen and (max-width: 700px) {
    width: 160px;
    height: 150px;
  }
`;
export default AboutSection;
