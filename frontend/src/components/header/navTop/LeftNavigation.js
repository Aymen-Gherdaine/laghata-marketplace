import React from "react";
import styled from "styled-components";
import Hamburger from "hamburger-react";
import {
  FaInstagram,
  FaFacebook,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const LeftNavigation = ({ toggleNav }) => {
  return (
    <SocialMediaIcons className="icon">
      <Button onClick={toggleNav}>
        <Hamburger direction="right" />
      </Button>

      <a href="#">
        <FaInstagram style={iconStyles} className="icon" />
      </a>
      <a href="#">
        <FaPinterest style={iconStyles} className="icon" />
      </a>
      <a href="#">
        <FaFacebook style={iconStyles} className="icon" />
      </a>
      <a href="#">
        <FaTwitter style={iconStyles} className="icon" />
      </a>
      <a href="#">
        <FaYoutube style={iconStyles} className="icon" />
      </a>
    </SocialMediaIcons>
  );
};

// Left Navigation Style
let iconStyles = {
  color: "white",
  fontSize: "1.1em",
};

const SocialMediaIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0.4;

  a {
    padding-right: 1.8rem;
  }

  a:last-child {
    padding-right: 0;
  }

  .searchIcon {
    display: none;
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

  @media screen and (max-width: 700px) {
    a {
      display: none;
    }

    .searchIcon {
      display: block;
      padding-left: 1rem;
      padding-top: 0.3rem;
    }
  }
`;

const Button = styled.button`
  display: none;
  font-size: 2rem;
  padding-top: 0.4rem;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  @media screen and (max-width: 700px) {
    display: block;
    margin-bottom: 7px;
    border: none;
    outline: none;
  }
`;

export default LeftNavigation;
