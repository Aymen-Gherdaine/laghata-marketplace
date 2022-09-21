import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaInstagram,
  FaFacebook,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <FooterContainer>
      <CategoryMenu>
        <CategoriesTitle>Categories</CategoriesTitle>
        <NavLink to="/category/surf">Surf</NavLink>

        <NavLink to="/category/bike">Bike</NavLink>

        <NavLink to="/category/snow">Snow</NavLink>
      </CategoryMenu>
      <FooterLogo>
        <NavLink to="/">
          <img src={logo} alt="" width="130px" />
        </NavLink>
        <SocialMediaIcons className="icon">
          <a href="#">
            <FaInstagram className="icon" />
          </a>
          <a href="#">
            <FaPinterest className="icon" />
          </a>
          <a href="#">
            <FaFacebook className="icon" />
          </a>
          <a href="#">
            <FaTwitter className="icon" />
          </a>
          <a href="#">
            <FaYoutube className="icon" />
          </a>
        </SocialMediaIcons>
      </FooterLogo>
      <QuikMenu>
        <QuikMenuTitle>Quick links</QuikMenuTitle>
        <NavLink to="/">Home</NavLink>

        <NavLink to="/categories">Categories</NavLink>

        <NavLink to="/about">About Us</NavLink>
      </QuikMenu>
    </FooterContainer>
  );
};

// Footer style
const FooterContainer = styled.div`
  bottom: 0;
  width: 100%;
  background-color: #000;
  height: 220px;
  display: flex;
  align-items: center;
`;

const FooterLogo = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const CategoryMenu = styled.div`
  flex: 0.4;
  display: flex;
  padding-left: 20px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;

  @media screen and (min-width: 1300px) {
    padding-left: 6rem;
  }
`;
const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  transition: 0.2s ease-in-out;

  :hover {
    color: rgb(175, 169, 170);
  }
`;

const QuikMenu = styled.div`
  flex: 0.4;
  display: flex;
  padding-right: 20px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;

  @media screen and (min-width: 1300px) {
    padding-right: 6rem;
  }
`;

const QuikMenuTitle = styled.h3`
  color: white;
`;

const CategoriesTitle = styled.h3`
  color: white;
`;

const SocialMediaIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  a {
    color: white;
  }

  a:last-child {
    padding-right: 0;
  }

  .icon {
    opacity: 1;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .icon:hover {
    color: rgb(175, 169, 170);
    opacity: 0.3;
  }
`;
export default Footer;
