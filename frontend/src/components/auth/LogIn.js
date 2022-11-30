import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { Navigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import logoBlack from "../../assets/logoBlack.png";
import { Circles } from "react-loader-spinner";
import { loginUserHandler } from "../../utils/apiFetchFunctions";
import { getPayloadFromToken } from "../../utils/utils";
import { CurrentUserContext } from "../context/CurrentUserContext";

const LogIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { user, setUser } = useContext(CurrentUserContext);

  // Login user function
  const login = useMutation((userData) => loginUserHandler(userData), {
    onSuccess: (token) => {
      // set user state to the response
      setUser(getPayloadFromToken(token));
      // // store some information in local storage
      localStorage.setItem("token", token);

      // using session storage to display the subscription modal just one per session
      sessionStorage.setItem("showModalOnce", false);
    },
  });

  return (
    <LoginContainer>
      {user ? (
        <Navigate to="/" />
      ) : (
        <RegistrationInfo>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login.mutate({ email, password });
            }}
          >
            <LogoContainer>
              <Logo src={logoBlack} alt="logoBlack" />
            </LogoContainer>
            <Title>Log In To Your Account</Title>

            <InputsDiv>
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              {login.isError && (
                <ErrorMsg>
                  Something went wrong check your email or password
                </ErrorMsg>
              )}
            </InputsDiv>
            <RedirectForgotPassword>
              <NavLink to="/forgot-password" className="navlink">
                Forgot your password?
              </NavLink>
            </RedirectForgotPassword>
            <Button type="submit">
              {login.isLoading ? (
                <Circles
                  height="30"
                  width="30"
                  color="#54cbe3"
                  ariaLabel="circles-loading"
                  wrapperClass="spinner"
                  visible={true}
                />
              ) : (
                "Login"
              )}
            </Button>
            <RedirectSignup>
              <span>Don't have an Account?</span>
              <NavLink to="/signup" className="navlink">
                Sign up here.
              </NavLink>
            </RedirectSignup>
          </form>
        </RegistrationInfo>
      )}
    </LoginContainer>
  );
};

// Login page style
const LoginContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const RegistrationInfo = styled.div`
  width: fit-content;
  padding: 50px;
  margin: 6rem auto;
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

const InputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  width: 350px;

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
  margin: 10px 0;
  width: 100%;
  cursor: pointer;

  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :hover {
    background: transparent;
    color: black;
    border: 1px solid black;
  }
`;

const ErrorMsg = styled.span`
  color: #cc0000;
  padding-left: 15px;
  max-width: 350px;
`;

const RedirectSignup = styled.div`
  padding-left: 5px;

  .navlink {
    color: black;
    margin-left: 5px;
    cursor: pointer;
  }
`;

const RedirectForgotPassword = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  .navlink {
    color: black;
    margin-left: 5px;
    cursor: pointer;
  }
`;

export default LogIn;
