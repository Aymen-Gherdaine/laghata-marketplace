import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logoBlack from "../../assets/logoBlack.png";
import { scrollToTop } from "../../utils/utils";
import { Circles } from "react-loader-spinner";

const SignUp = () => {
  const [picture, setPicture] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // send the user to the home page after has been signing in
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/");
        scrollToTop();
      }, 5000);
    }
  }, [success]);

  // post pictures to cloudinary
  const postPictureToCloudinary = async (pictures) => {
    if (pictures.type === "image/jpeg" || pictures.type === "image/png") {
      const data = new FormData();
      data.append("file", pictures);
      data.append("upload_preset", "laghata-app");
      data.append("cloud_name", "laghata");

      try {
        const postPicture = await fetch(
          `${process.env.REACT_APP_CLOUDINARY_url}`,
          {
            method: "POST",
            body: data,
          }
        );
        const responseJson = await postPicture.json();

        await setPicture(responseJson.secure_url.toString());
      } catch (error) {
        console.log(error.stack);
      }
    }
  };

  // registration handler
  const registerUserHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (password.toLowerCase() !== confirmPassword.toLowerCase()) {
      return;
    } else {
      // POST info to server
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          picture: picture,
        }),
      };

      // function that handle the post of data to db
      const postData = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/signup`,
            requestOptions
          );
          const responseJson = await response.json();

          if (responseJson.status === 201) {
            // store some information in local storage
            localStorage.setItem("token", responseJson.data.token);

            setSuccess(true);
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.log(error.message);
          setLoading(false);
        }
      };
      postData();
    }
  };
  return (
    <SignUpContainer>
      <RegistrationInfo>
        <form onSubmit={registerUserHandler}>
          <LogoContainer>
            <Logo src={logoBlack} alt="logoBlack" />
          </LogoContainer>
          {success ? (
            <>
              <TitleSuccess>Thanks for signing Up!</TitleSuccess>
              <Message>
                A verification email has been sent to the email address you
                provided, Please verify your email to unlock full site feature.
              </Message>
            </>
          ) : (
            <>
              <Title>Registration</Title>

              <InputsDiv>
                <Input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
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
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required
                />
                <InputPicture
                  type="file"
                  name="file"
                  id="file"
                  accept="/image/*"
                  onChange={(e) => {
                    postPictureToCloudinary(e.target.files[0]);
                  }}
                />
                <Label htmlFor="file">Choose a picture</Label>
              </InputsDiv>
              {picture && (
                <ImgContainer>
                  <Img src={picture} alt="profile Picture" />
                </ImgContainer>
              )}
              <Button type="submit" onClick={() => scrollToTop()}>
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
                  "Register"
                )}
              </Button>
            </>
          )}
        </form>
      </RegistrationInfo>
    </SignUpContainer>
  );
};

// style signup page
const SignUpContainer = styled.div`
  min-height: 100vh;
`;
const RegistrationInfo = styled.div`
  max-width: 70%;
  width: fit-content;
  padding: 50px;
  margin: 4rem auto;
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
`;

const TitleSuccess = styled.h3`
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

const InputPicture = styled.input`
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const Label = styled.label`
  font-size: 1.25em;
  font-weight: 500;
  color: black;
  border: 1px solid;
  background-color: transparent;
  padding: 10px 15px;
  display: inline-block;
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;

  :hover {
    background-color: black;
    color: white;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  height: 90px;
  width: 90px;
  border-radius: 50%;
`;
export default SignUp;
