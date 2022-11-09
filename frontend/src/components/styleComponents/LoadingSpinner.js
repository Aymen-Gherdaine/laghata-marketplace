import React from "react";
import styled from "styled-components";

const LoadingSpinner = () => {
  return (
    <Container>
      <Preloader></Preloader>
    </Container>
  );
};

// style
const Container = styled.div`
  background: #000;
  display: flex;
  align-items: flex-start;
  padding-top: 250px;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;

const Preloader = styled.div`
  width: 100px;
  height: 100px;
  border-top: 5px solid yellow;
  position: relative;
  transform: rotate(30deg);
  border-radius: 50%;
  animation: Preloader linear 5s infinite;

  ::before {
    content: "";
    width: 60px;
    height: 60px;
    border-top: 5px solid lightblue;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(30deg);
    border-radius: 50%;
  }

  ::after {
    content: "";
    width: 80px;
    height: 80px;
    border-top: 5px solid green;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(60deg);
    border-radius: 50%;
  }

  @keyframes Preloader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
export default LoadingSpinner;
