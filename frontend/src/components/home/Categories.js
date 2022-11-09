import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { scrollToTop } from "../../utils/utils";

// Category list
const subcategory = [
  {
    link: "/category/surf/Standup paddleboard",
    name: "Standup paddleboard",
    url: "https://images.unsplash.com/photo-1597269239268-1025c30817a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhbmR1cCUyMHBhZGRsZWJvYXJkfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    link: "/category/surf/kayak and canoe",
    name: "kayak and canoe",
    url: "https://images.unsplash.com/photo-1620903669944-de50fbe78210?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    link: "/category/surf/Mountain bike",
    name: "Mountain bike",
    url: "https://images.unsplash.com/photo-1627044185459-09e6dbc39444?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fG1vdW50YWluJTIwYmlrZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    link: "/category/surf/Road bike",
    name: "Road bike",
    url: "https://images.unsplash.com/photo-1560036092-8b98cadbee6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fHJvYWQlMjBiaWtlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    link: "/category/surf/Snow accessories",
    name: "Snow Accessories",
    url: "https://images.unsplash.com/photo-1596473536056-91eadf31189e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fHNub3clMjBhY2Nlc3Nvcmllc3xlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    link: "/category/surf/Snowboard",
    name: "Snowboard",
    url: "https://images.unsplash.com/photo-1522056615691-da7b8106c665?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNub3dib2FyZHxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
  },
];

const Categories = () => {
  return (
    <CategorySection>
      <h1>Choose from our lagre collection</h1>
      <CategoryProduct>
        {subcategory.map((item, index) => {
          return (
            <NavLink
              to={item.link}
              onClick={scrollToTop}
              className="navlink"
              key={index}
            >
              <Category>
                <img src={item?.url} />
                <p>{item.name}</p>
              </Category>
            </NavLink>
          );
        })}
      </CategoryProduct>
    </CategorySection>
  );
};

// CategorySection style
const CategorySection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 20px;

  h1 {
    font-size: 35px;
    padding-top: 30px;
    text-align: center;
    font-weight: 700;
    animation-name: moveTitleFromLeft;
    animation-duration: 1s;
    animation-timing-function: ease-out;

    @media screen and (max-width: 700px) {
      font-size: 25px;
      width: 80%;
      margin: 0 auto;
    }
  }

  img {
    width: 250px;
    height: 220px;
    object-fit: cover;
    border-radius: 10px;
    transition: 1s ease;

    :hover {
      transform: scale(1.05);
    }
  }

  .navlink {
    text-decoration: none;
  }
`;

const CategoryProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
  margin: 35px auto 0 auto;
  gap: 15px;

  animation-name: moveTitleFromRight;
  animation-duration: 1s;
  animation-timing-function: ease-out;
`;

const Category = styled.div`
  height: 220px;
  width: 250px;
  position: relative;

  p {
    color: white;
    font-size: 19px;
    font-weight: 600;
    text-align: center;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Categories;
