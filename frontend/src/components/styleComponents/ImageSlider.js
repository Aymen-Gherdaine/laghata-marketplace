import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// Image slider componenent
const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // function that handle slide to the previous image
  const goToPreviousHandler = () => {
    if (currentIndex === 0) {
      setCurrentIndex(slides.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // function that handle slide to the next image
  const goToNextHandler = () => {
    if (currentIndex === slides.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // function that handle the slider dots to be able to go to the specific slide
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <SliderStyles>
        <LeftArrowStyles onClick={goToPreviousHandler}>
          <IoIosArrowBack />
        </LeftArrowStyles>
        <RightArrowStyles onClick={goToNextHandler}>
          <IoIosArrowForward />
        </RightArrowStyles>
        <SlideStyle
          style={{ backgroundImage: `url(${slides[currentIndex]})` }}
        ></SlideStyle>
        <DotContainer>
          {slides.map((slide, slideIndex) => {
            return (
              <Dot key={slideIndex} onClick={() => goToSlide(slideIndex)}>
                ◦
              </Dot>
            );
          })}
        </DotContainer>
      </SliderStyles>
    </>
  );
};

// image slider style
const SliderStyles = styled.div`
  height: 100%;
  position: relative;
`;

const SlideStyle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background-position: center;
  background-size: cover;
`;

const LeftArrowStyles = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 17px;
  font-size: 45px;
  color: #fff;
  cursor: pointer;
`;

const RightArrowStyles = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 17px;
  font-size: 45px;
  color: #fff;
  cursor: pointer;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 99%;
  left: 50%;
  transform: translate(-50%, -99%);
`;

const Dot = styled.div`
  margin: 0 7px;
  cursor: pointer;
  font-size: 50px;
  color: #f5f0ed;
`;
export default ImageSlider;
