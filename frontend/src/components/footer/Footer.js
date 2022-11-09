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
      <FooterContentWrapper>
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
        <FooterMenu>
          <CategoryMenu>
            <CategoriesTitle>Categories</CategoriesTitle>
            <NavLink to="/category/surf">Surf</NavLink>

            <NavLink to="/category/bike">Bike</NavLink>

            <NavLink to="/category/snow">Snow</NavLink>
          </CategoryMenu>
          <QuikMenu>
            <QuikMenuTitle>Quick links</QuikMenuTitle>
            <NavLink to="/">Home</NavLink>

            <NavLink to="/categories">Categories</NavLink>

            <NavLink to="/about">About Us</NavLink>
          </QuikMenu>
        </FooterMenu>
      </FooterContentWrapper>
      <FooterCopywriteContainer>
        <FooterCopywriteWrapper>
          <FooterCopywriteParagraph>
            © 2022 laghata® | Great Adventure Equipement.
          </FooterCopywriteParagraph>
        </FooterCopywriteWrapper>
      </FooterCopywriteContainer>
    </FooterContainer>
  );
};

// Footer style
const FooterContainer = styled.footer`
  bottom: 0;
  width: 100%;
  background-color: #000;
  height: 380px;

  @media screen and (max-width: 668px) {
    height: 100%;
    padding: 2rem;
  }
`;

const FooterContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding-bottom: 1.5rem;

  @media screen and (max-width: 668px) {
    flex-direction: column;
    gap: 4rem;
  }

  @media screen and (min-width: 668px) {
    width: 80%;
  }
`;

const FooterLogo = styled.div`
  height: 100%;
  flex: 0.4;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 668px) {
    align-items: center;
  }
`;

const FooterMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0.6;
  gap: 8rem;
  height: 100%;
  width: 100%;

  @media screen and (max-width: 668px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
  }
`;

const CategoryMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.8rem;
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
  display: flex;
  padding-right: 20px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.8rem;

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

const FooterCopywriteContainer = styled.div`
  background-color: #000;
`;

const FooterCopywriteWrapper = styled.div`
  max-width: 1300px;
  border-top: 1px solid rgb(216 223 225/1);
  padding: 2rem 0;
  margin: 0 auto;

  @media screen and (min-width: 668px) {
    width: 80%;
  }
`;

const FooterCopywriteParagraph = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 300;
  text-align: center;
  color: #f5f6f7;
`;
export default Footer;
