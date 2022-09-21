import React from "react";
import styled from "styled-components";
import category from "../assets/category.png";
import description from "../assets/description.png";
import images from "../assets/images.png";
import confirmation from "../assets/confirmation.png";

// This component is responsible of the progress bar in the top of the form
const Indicator = ({ progressBarValue }) => {
  return (
    <IndicatorContainer>
      <progress value={progressBarValue} max={100} className="progressBar" />

      <ImgContainer>
        <ImgBloc>
          <img src={category} alt="category" />
        </ImgBloc>
        <ImgBloc>
          <img src={description} alt="product description" />
        </ImgBloc>

        <ImgBloc>
          <img src={images} alt="product images" />
        </ImgBloc>
        <ImgBloc>
          <img src={confirmation} alt="confirm info" />
        </ImgBloc>
      </ImgContainer>
    </IndicatorContainer>
  );
};

// indicator style
const IndicatorContainer = styled.div`
  position: absolute;
  padding-top: 0px;
  left: 0px;
  top: -150px;
  width: 100%;

  @media screen and (max-width: 700px) {
    width: 80%;
    left: 50%;
    top: -150px;
    transform: translate(-50%, 10px);
  }

  .progressBar {
    width: 99%;
    position: absolute;
    top: 30px;

    @media screen and (max-width: 700px) {
      top: 20px;
    }
  }

  progress[value]::-webkit-progress-bar {
    height: 10px;
    border-radius: 20px;
    background-color: #242526;
  }

  progress[value]::-webkit-progress-value {
    height: 10px;
    border-radius: 20px;
    background-color: #54cbe3;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 20;
`;

const ImgBloc = styled.div`
  width: 70px;
  height: 70px;
  background: #f1f1f1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  :nth-child(1) {
    position: relative;
    right: 5px;
  }

  :nth-child(5) {
    position: relative;
    left: 5px;
  }

  img {
    height: 40px;
    width: 40px;
  }

  @media screen and (max-width: 700px) {
    width: 52px;
    height: 52px;

    img {
      height: 30px;
      width: 30px;
    }
  }
`;
export default Indicator;
