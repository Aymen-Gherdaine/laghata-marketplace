import React from "react";
import styled from "styled-components";

const Testimonials = () => {
  return (
    <>
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
    </>
  );
};

// Testimonials Styles
const TestimonialsTitle = styled.h1`
  text-align: center;
  margin-bottom: 40px;

  animation-name: moveTitleFromLeft;
  animation-duration: 1s;
  animation-timing-function: ease-out;

  @media screen and (max-width: 700px) {
    font-size: 25px;
    width: 80%;
    margin: 3rem auto;
  }
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

export default Testimonials;
