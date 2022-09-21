import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Circles } from "react-loader-spinner";
import { scrollToTop } from "../../utils";
import { VscClose } from "react-icons/vsc";

// upload pictures form componenent
const SubCategoryForm = ({ modifyIndex, handleReturn, currentListingData }) => {
  const [formData, setFormData] = useState({
    imageSrc: [],
  });
  const [loading, setLoading] = useState(false);

  // set the formData state to the global state if the user go back
  useEffect(() => {
    setFormData({
      imageSrc: currentListingData.imageSrc,
    });
  }, []);

  // Function that remove image from our state
  const deleteImageHandler = (imageSelected) => {
    // create a copy of our state
    let copyOfFormData = [...formData.imageSrc];

    // filter copyOfFormData to remove the image
    const copyFiltred = copyOfFormData.filter(
      (image) => image !== imageSelected
    );

    // update our state
    setFormData({
      imageSrc: copyFiltred,
    });
  };

  // upload images to cloudinary and update the state
  const postPictureToCloudinary = async (pictures) => {
    setLoading(true);

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

        setFormData({
          imageSrc: [...formData.imageSrc, responseJson.secure_url.toString()],
        });

        setLoading(false);
      } catch (error) {
        console.log(error.stack);
        setLoading(false);
      }
    }
  };

  return (
    <Form
      onSubmit={() => {
        e.preventDefault();
      }}
    >
      <h1>Choose Your Listing Pictures </h1>
      <h3>You Can Upload Up to 5 Pictures</h3>
      <InputPicture
        type="file"
        name="file"
        id="file"
        accept="/image/*"
        onChange={(e) => {
          postPictureToCloudinary(e.target.files[0]);
        }}
      />
      <Label htmlFor="file">Upload Pictures</Label>
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
        <ImgContainer>
          {formData.imageSrc.map((image, index) => {
            return (
              <>
                <ImgWrapper key={index}>
                  <VscClose
                    className="closeIcon"
                    onClick={() => deleteImageHandler(image)}
                  />
                  <Img src={image} alt="Listing Picture" key={index} />
                </ImgWrapper>
              </>
            );
          })}
        </ImgContainer>
      )}
      <BtnContainer>
        <BackButton
          type="button"
          onClick={() => {
            handleReturn(3, formData, 35), scrollToTop();
          }}
        >
          Back
        </BackButton>

        <Button
          onClick={() => {
            modifyIndex(5, formData, 96), scrollToTop();
          }}
        >
          Next
        </Button>
      </BtnContainer>
    </Form>
  );
};

// form listing style
const Form = styled.form`
  h1 {
    text-align: center;
    font-size: 35px;
  }

  h3 {
    text-align: center;
    font-size: 20px;
  }

  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
`;

const Button = styled.button`
  padding: 10px 17px;
  background: black;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.button`
  padding: 10px 17px;
  background: transparent;
  color: black;
  border: 1px solid black;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  display: flex;
  width: fit-content;
  margin: 30px auto;
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 50px;
  margin-top: 30px;
  padding: 25px;
`;

const ImgWrapper = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.6s ease-in;
  .closeIcon {
    display: none;
  }

  :hover {
    transform: scale(1.02);
    .closeIcon {
      display: block;
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 30px;
      color: white;
      transition: all 0.6s ease-in;

      :hover {
        transform: rotate(90deg);
      }
    }
  }
`;

const Img = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 10px;
  object-fit: cover;
`;

export default SubCategoryForm;
