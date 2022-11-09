import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import logoBlack from "../../assets/logoBlack.png";
import { scrollToTop } from "../../utils/utils";
import { Circles } from "react-loader-spinner";

const ResetPassword = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // getting passwordResetCode from the url
  const { passwordResetCode } = useParams();

  // passwordReset handler
  const passwordResetHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    // POST info to server
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword: password }),
    };

    // function that handle the post of data to db
    const resetPasswordHandler = async () => {
      try {
        await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/${passwordResetCode}/reset-password`,
          requestOptions
        );

        setSuccess(true);

        setLoading(false);

        localStorage.clear();
      } catch (error) {
        console.log(error.message);
        setError(true);
        setLoading(false);
      }
    };
    resetPasswordHandler();

    setLoading(false);
  };
  return (
    <ResetPasswordContainer>
      <Info>
        <form onSubmit={passwordResetHandler}>
          <LogoContainer>
            <Logo src={logoBlack} alt="logoBlack" />
          </LogoContainer>
          {success ? (
            <>
              <Title>Success</Title>
              <Message>
                Your Password has been changed, now please login with your new
                password
              </Message>
              <Button
                onClick={() => {
                  navigate("/login"), scrollToTop();
                }}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <Title>Reset Password</Title>
              <Message>Please enter your a new password</Message>
              {error && (
                <Message>
                  We couldn't update your password please try again
                </Message>
              )}
              <InputsDiv>
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required
                />
              </InputsDiv>
              <Button
                type="submit"
                disabled={
                  password.toLowerCase() !== confirmPassword.toLowerCase() ||
                  password === "" ||
                  confirmPassword === ""
                }
              >
                {loading ? (
                  <Circles
                    height="30"
                    width="30"
                    color="#54cbe3"
                    ariaLabel="circles-loading"
                    wrapperClass="spinner"
                    visible={true}
                  />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </>
          )}
        </form>
      </Info>
    </ResetPasswordContainer>
  );
};

// style ResetPassword page
const ResetPasswordContainer = styled.div`
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
  text-align: center;
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

  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default ResetPassword;
