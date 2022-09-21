import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logoBlack from "../../assets/logoBlack.png";
import { scrollToTop } from "../utils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Send Reset Link handler
  const sendResetLinkHandler = async (e) => {
    e.preventDefault();

    // POST info to server
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    // function that handle the post of data to db
    const sendUser = async () => {
      try {
        await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/forgot-password/${email}`,
          requestOptions
        );

        setSuccess(true);

        // redirect the user to the login page after 3s
        setTimeout(() => {
          navigate("/login");
          scrollToTop();
        }, 3000);
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message);
      }
    };
    sendUser();
  };
  return (
    <ForgotPasswordContainer>
      <Info>
        <form onSubmit={sendResetLinkHandler}>
          <LogoContainer>
            <Logo src={logoBlack} alt="logoBlack" />
          </LogoContainer>
          {success ? (
            <>
              <Title>Success</Title>
              <Message>Check your email for a reset</Message>
            </>
          ) : (
            <>
              <Title>Forgot Password</Title>
              <Message>
                Please enter your email and we'll send you a reset link
              </Message>
              {errorMessage && <div>{errorMessage}</div>}
              <InputsDiv>
                <Input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </InputsDiv>
              <Button type="submit" disabled={email.trim() === ""}>
                Send Reset Link
              </Button>
            </>
          )}
        </form>
      </Info>
    </ForgotPasswordContainer>
  );
};

// style ForgotPassword page
const ForgotPasswordContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const Info = styled.div`
  width: fit-content;
  padding: 50px;
  margin: 10rem auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media screen and (max-width: 700px) {
    width: 90%;
    padding: 30px;
  }
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0 5px 0;
  font-size: 30px;
  margin: 20px 0 10px 0;
`;

const Message = styled.p`
  margin: 20px 0 20px 0;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 150px;
`;

const InputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;

  @media screen and (max-width: 700px) {
    width: 300px;
  }
`;

const Input = styled.input`
  padding: 12px 10px;
  border-radius: 25px;
  outline: none;
  font-size: 17px;
  border: 1px solid black;
`;

const Button = styled.button`
  padding: 12px 15px;
  color: white;
  background: black;
  border: 1px solid white;
  border-radius: 25px;
  font-size: 18px;
  transition: all 0.7s ease-in-out;
  margin: 25px 0;
  width: 100%;
  cursor: pointer;

  :hover {
    background: transparent;
    color: black;
    border: 1px solid black;
  }
`;

export default ForgotPassword;
