import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const Review = ({ review }) => {
  // create an array of star depending on how many star review we have
  const stars = Array(Number(review.rating)).fill(0);

  return (
    <ReviewContainer>
      <Top>
        <UserPicture>
          <img src={review.clientPicture} alt="user Profile" />
        </UserPicture>
        <ReviewInfo>
          <ReviewInfoTop>
            <h4>{review.clientUsername}</h4>
            <p>{review.createdAt.slice(4, 15)}</p>
          </ReviewInfoTop>

          <ReviewStars>
            {stars.map((_, index) => {
              return <FaStar key={index} />;
            })}
          </ReviewStars>
        </ReviewInfo>
      </Top>
      <ReviewSection>
        <div>{review.review}</div>
      </ReviewSection>
    </ReviewContainer>
  );
};

// review style
const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #242526;
  padding-top: 12px;
  margin: 10px 0 25px 0;
`;
const Top = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7px;
  padding-bottom: 12px;
`;
const UserPicture = styled.div`
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`;
const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ReviewStars = styled.div`
  display: flex;
  gap: 2px;
`;
const ReviewInfoTop = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  p {
    font-size: 13px;
  }
`;
const ReviewSection = styled.div``;
export default Review;
