import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../styleComponents/LoadingSpinner";
import styled from "styled-components";
import logoBlack from "../../assets/logoBlack.png";
import { scrollToTop } from "../utils";

const EmailVerificationPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();

  // getting the verificationString from the url that user receive
  const { verificationString } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    // POST info to server
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verificationString: verificationString }),
    };
    const loadVerification = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/verify-email`,
          requestOptions
        );

        const parseResponse = await response.json();

        if (parseResponse) {
          // set the key token in local storage to the new token
          localStorage.setItem("token", parseResponse?.data?.token);
          setSuccess(true);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.stack);
        setSuccess(false);
        setLoading(false);
      }
    };
    loadVerification();
  }, []);

  return (
    <VerificationContainer>
      {loading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <VerificationWrapper>
            <LogoContainer>
              <Logo src={logoBlack} alt="logoBlack" />
            </LogoContainer>
            {success === true ? (
              <>
                <Title>Thanks for verifying your email.</Title>
                <Button
                  onClick={() => {
                    navigate("/"), scrollToTop();
                  }}
                >
                  Go To Home Page
                </Button>
              </>
            ) : (
              success === false && (
                <>
                  <Title>
                    Something went wrong while trying to verify you email.
                  </Title>
                  <Button
                    onClick={() => {
                      navigate("/signup"), scrollToTop();
                    }}
                  >
                    Back To SignUp Page
                  </Button>
                </>
              )
            )}
          </VerificationWrapper>
        </>
      )}
    </VerificationContainer>
  );
};

// Login page style
const VerificationContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const VerificationWrapper = styled.div`
  width: fit-content;
  padding: 50px;
  margin: 6rem auto;
  height: 100%;
  display: flex;
  flex-direction: column;
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
  padding: 15px 0;
  font-size: 30px;
  margin: 20px 0;

  @media screen and (max-width: 700px) {
    font-size: 25px;
  }
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

export default EmailVerificationPage;
