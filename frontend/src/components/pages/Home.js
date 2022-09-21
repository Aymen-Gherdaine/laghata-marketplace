import React from "react";
import styled from "styled-components";
import home1 from "../../assets/home1.jpg";
import { NavLink } from "react-router-dom";
import { scrollToTop } from "../utils";

const Home = () => {
  const subcategory = [
    {
      link: "/category/surf/Standup paddleboard",
      name: "Standup paddleboard",
      url: "https://images.unsplash.com/photo-1597269239268-1025c30817a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhbmR1cCUyMHBhZGRsZWJvYXJkfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      link: "/category/surf/kayak and canoe",
      name: "kayak and canoe",
      url: "https://images.unsplash.com/photo-1620903669944-de50fbe78210?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      link: "/category/surf/Mountain bike",
      name: "Mountain bike",
      url: "https://images.unsplash.com/photo-1627044185459-09e6dbc39444?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fG1vdW50YWluJTIwYmlrZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      link: "/category/surf/Road bike",
      name: "Road bike",
      url: "https://images.unsplash.com/photo-1560036092-8b98cadbee6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fHJvYWQlMjBiaWtlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      link: "/category/surf/Snow accessories",
      name: "Snow Accessories",
      url: "https://images.unsplash.com/photo-1596473536056-91eadf31189e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fHNub3clMjBhY2Nlc3Nvcmllc3xlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      link: "/category/surf/Snowboard",
      name: "Snowboard",
      url: "https://images.unsplash.com/photo-1522056615691-da7b8106c665?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNub3dib2FyZHxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <HomePage>
      <HeroBackground>
        <img src={home1} />
        <h1>Great adventure equipement. Great times</h1>
      </HeroBackground>
      <CategorySection>
        <h1>Choose from our lagre collection</h1>
        <CategoryProduct>
          {subcategory.map((item, index) => {
            return (
              <NavLink
                to={item.link}
                onClick={scrollToTop}
                className="navlink"
                key={index}
              >
                <Category>
                  <img src={item?.url} />
                  <p>{item.name}</p>
                </Category>
              </NavLink>
            );
          })}
        </CategoryProduct>
      </CategorySection>

      <AboutSection>
        <LeftSide>
          <h1>Traveling with no hassle</h1>
          <p>
            Laghata offers personalized service for every trip with our Surf
            Bike and Snow marketplace. Whether you're a first time traveler or a
            seasoned traveler, we have the right gear for you.
          </p>
        </LeftSide>
        <RightSide>
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
      </AboutSection>

      <TestimonialsTitle>What are our customers saying?</TestimonialsTitle>
      <TestimonialsSection>
        <TestimonialsWrapper>
          <Review>
            The kayak was amazing. I use it for fishing as well as racing. There
            are so many different features and adjustments that I never get
            bored.
          </Review>
          <ReviewBottom>
            <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
            <span>Jessica Welk</span>
          </ReviewBottom>
        </TestimonialsWrapper>
        <TestimonialsWrapper>
          <Review>
            I was actually very impressed with the rental process and the
            overall quality of the bike I rented. I got a comfortable bike with
            a great set of lights
          </Review>
          <ReviewBottom>
            <img src="https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
            <span>Mary Thomas</span>
          </ReviewBottom>
        </TestimonialsWrapper>
        <TestimonialsWrapper>
          <Review>
            The gears are easy to use, and it's easy to turn the pedals by using
            my feet instead of my hands. It's easy
          </Review>
          <ReviewBottom>
            <img src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
            <span>Nick Smith</span>
          </ReviewBottom>
        </TestimonialsWrapper>
      </TestimonialsSection>
    </HomePage>
  );
};

// home page style
const HomePage = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 180px;
`;

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
    animation-duration: 1s;
    animation-timing-function: ease-out;
  }
`;

const CategorySection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 20px;

  h1 {
    font-size: 35px;
    padding-top: 30px;
    text-align: center;
    font-weight: 700;
    animation-name: moveTitleFromLeft;
    animation-duration: 1s;
    animation-timing-function: ease-out;
  }

  img {
    width: 250px;
    height: 220px;
    object-fit: cover;
    border-radius: 10px;
  }

  .navlink {
    text-decoration: none;
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
`;

const CategoryProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
  margin: 35px auto 0 auto;
  gap: 15px;

  animation-name: moveTitleFromRight;
  animation-duration: 1s;
  animation-timing-function: ease-out;
`;

const Category = styled.div`
  height: 220px;
  width: 250px;
  position: relative;

  p {
    color: white;
    font-size: 19px;
    font-weight: 600;
    text-align: center;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const AboutSection = styled.section`
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

const TestimonialsTitle = styled.h1`
  text-align: center;
  margin-bottom: 40px;

  animation-name: moveTitleFromLeft;
  animation-duration: 1s;
  animation-timing-function: ease-out;
`;
const TestimonialsSection = styled.section`
  max-width: 1300px;
  display: flex;
  gap: 20px;
  width: 80%;
  margin: 0 auto;

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

  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;
const TestimonialsWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  width: 30%;
  height: 300px;
  border-radius: 25px;
  padding: 15px;
  position: relative;
  cursor: pointer;
  transition: all 0.5s ease-out;

  :hover {
    scale: 1.05;
  }

  &:before,
  &:after {
    font-family: Revalia;
    color: #f5f0ed;
    font-size: 100px;
    position: absolute;
  }

  &:before {
    content: "“";
    top: -5px;
    left: 10px;
  }

  &:after {
    content: "”";
    bottom: -52px;
    right: 10px;
  }

  @media screen and (max-width: 700px) {
    width: 90%;
  }
`;

const Review = styled.p`
  text-align: center;
  font-weight: 500;
  padding-top: 50px;
`;

const ReviewBottom = styled.div`
  position: absolute;
  bottom: 17px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 9px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;

export default Home;
