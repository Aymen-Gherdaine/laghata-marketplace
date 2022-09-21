import React from "react";
import styled from "styled-components";

const Dialog = ({ open, message, onClose, deleteHandler }) => {
  if (!open) return null;

  return (
    <DialogContainer>
      <DialogWrapper>
        <h3>{message}</h3>
        <ButtonDiv>
          <YesButton onClick={deleteHandler}>Yes</YesButton>
          <NoButton onClick={onClose}>No</NoButton>
        </ButtonDiv>
      </DialogWrapper>
    </DialogContainer>
  );
};

// dialog style
const DialogContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 50px;

  h3 {
    font-size: 18px;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const YesButton = styled.button`
  border: 1px solid;
  padding: 7px 20px;
  border-radius: 10px;
  transition: background 0.4s ease-in-out;
  background-color: #000;
  color: #f5f5f3;
  cursor: pointer;

  :hover {
    background-color: #9cc2c5;
  }
`;

const NoButton = styled.button`
  border: 1px solid;
  padding: 7px 20px;
  border-radius: 10px;
  cursor: pointer;
`;
export default Dialog;
