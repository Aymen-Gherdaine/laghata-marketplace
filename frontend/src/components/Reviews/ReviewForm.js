import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { Circles } from "react-loader-spinner";
import { useUser } from "../hooks/useUser";

const ReviewForm = ({ setReviews, currentUserId, listingId, reviews }) => {
  // get user information from useUser hook
  const user = useUser();

  const [starHoverValue, setStarHoverValue] = useState(undefined);

  const [userReview, setUserReview] = useState({
    review: "",
    clientUsername: user?.username,
    clientId: currentUserId,
    clientPicture: user?.picture,
    listingId: listingId,
    rating: 0,
    createdAt: new Date(Date.now()).toString(),
  });

  const [loading, setLoading] = useState(false);

  // function that handle the update of state and sending the data to our db
  const createReviewHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // add the new review to our reviews state
      setReviews([userReview, ...reviews]);

      setUserReview((prev) => ({ ...prev, review: "", rating: 0 }));

      // POST info to server
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userReview),
      };

      // send the new review to our db
      const sendNewReview = fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/add-review`,
        requestOptions
      );

      if (sendNewReview.ok) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error.stack);
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={createReviewHandler}>
      <ReviewStars>
        {Array(5)
          .fill(0)
          .map((_, index) => {
            return (
              <FaStar
                key={index}
                style={{
                  cursor: "pointer",
                }}
                color={
                  (starHoverValue || userReview.rating) > index
                    ? "#000"
                    : "grey"
                }
                value={userReview.rating}
                name="rating"
                onClick={(e) =>
                  setUserReview((prev) => ({
                    ...prev,
                    rating: index + 1,
                  }))
                }
                onMouseOver={() => setStarHoverValue(index + 1)}
                onMouseLeave={() => setStarHoverValue(undefined)}
              />
            );
          })}
      </ReviewStars>
      <TextArea
        value={userReview.review}
        name="review"
        placeholder="Write your review here!"
        onChange={(e) =>
          setUserReview((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
      />
      <Button
        type="submit"
        disabled={userReview.rating === 0 && userReview.review.trim() === ""}
      >
        {loading ? (
          <Circles
            height="30"
            width="30"
            color="#000"
            ariaLabel="circles-loading"
            wrapperClass="spinner"
            visible={true}
          />
        ) : (
          "Send Review"
        )}
      </Button>
    </Form>
  );
};

// form style
const Form = styled.form`
  margin: 20px 0;
`;

const TextArea = styled.textarea`
  margin: 15px 0;
  min-width: 100%;
  max-width: 100%;
  border-radius: 5px;
  outline: none;
  height: 70px;
  padding: 9px;
  font-size: 16px;
`;

const ReviewStars = styled.div`
  padding-left: 2px;
  display: flex;
  gap: 5px;
`;

const Button = styled.button`
  padding: 10px 25px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  border: 1px solid;
  border-radius: 5px;
  transition: background 0.5s ease-in-out;

  :hover {
    background-color: #dadce1;
  }
`;
export default ReviewForm;
