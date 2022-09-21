import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import Hamburger from "hamburger-react";
import NavBottom from "./NavBottom";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";
import { scrollToTop } from "../utils";
import useClickOutside from "../hooks/useClickOutside";
import { useUser } from "../hooks/useUser";
import {
  FaInstagram,
  FaFacebook,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { FiSettings, FiList, FiInbox, FiUser } from "react-icons/fi";
import { MdNotifications } from "react-icons/md";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  // get user information useUser Hook
  const user = useUser();

  // hook to redirect the user to a specific page
  const navigate = useNavigate();

  // getting chat information from the chat context
  const { notification, setNotification, openChat, setOpenChat } =
    useContext(ChatContext);

  // custom hook to check and close if we click outside the calender
  let ref = useClickOutside(() => {
    setOpen(false);
  });

  // toggle nav on click
  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  // listen to window width when resizing the window
  useEffect(() => {
    // function that set the with to the current with
    const changeWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  // function that handle redirecting the user to homepage when logout and clear local storage
  const logoutHandler = () => {
    navigate("/");
    window.localStorage.clear();
  };

  return (
    <>
      <HeaderEl>
        <NavTop>
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

          <div className="logo">
            <NavLink to="/">
              <img src={logo} alt="" width="130px" />
            </NavLink>
          </div>

          <RightNav>
            {user ? (
              <>
                {user && (
                  <>
                    <NotifDiv>
                      {notification.length > 0 && !openChat && (
                        <>
                          <NavLink to="/userinbox" className="navStyle">
                            <MdNotifications
                              className="notification"
                              style={{ color: "#fff" }}
                            />
                            <ItemCount>{notification.length}</ItemCount>
                          </NavLink>
                        </>
                      )}
                    </NotifDiv>
                    <ProfileImg
                      src={user.picture}
                      alt="Profile Pictue"
                      onClick={() => {
                        setOpen(!open), scrollToTop();
                      }}
                    />
                    {open && (
                      <DropDown ref={ref}>
                        <NavLink
                          to="/userlisting"
                          className="navStyle"
                          onClick={() => {
                            setOpen(!open), scrollToTop();
                          }}
                        >
                          <Icon>
                            <FiList />
                          </Icon>
                          Listing
                        </NavLink>
                        <NavLink
                          to="/userinbox"
                          className="navStyle"
                          onClick={() => {
                            setOpen(!open), scrollToTop();
                          }}
                        >
                          <Icon>
                            <FiInbox />
                          </Icon>
                          Inbox
                        </NavLink>
                        <NavLink
                          to="/profile"
                          className="navStyle"
                          onClick={() => {
                            setOpen(!open), scrollToTop();
                          }}
                        >
                          <Icon>
                            <FiSettings />
                          </Icon>
                          Profile
                        </NavLink>
                        <NavLink to="/">
                          <LogOutButton
                            onClick={() => {
                              setOpen(!open);
                              logoutHandler();
                              scrollToTop();
                            }}
                          >
                            Log Out
                          </LogOutButton>
                        </NavLink>
                      </DropDown>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {width < 700 ? (
                  <NavLink
                    to="/login"
                    className="loginIcon"
                    onClick={scrollToTop}
                  >
                    <FiUser />
                  </NavLink>
                ) : (
                  <>
                    <NavLink to="/signup" onClick={scrollToTop}>
                      <SignupButton>Signup</SignupButton>
                    </NavLink>
                    <NavLink to="/login" onClick={scrollToTop}>
                      <LogInButton>Login</LogInButton>
                    </NavLink>
                  </>
                )}
              </>
            )}
          </RightNav>
        </NavTop>
        {(toggleMenu || width > 700) && <NavBottom />}
      </HeaderEl>
    </>
  );
};

// Header style
let iconStyles = {
  color: "white",
  fontSize: "1.1em",
};

const HeaderEl = styled.header`
  position: sticky;
  top: 0;
  z-index: 9999;

  .logo {
    flex: 0.3;
    display: flex;
    align-items: center;
    justify-content: center;
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
const NavTop = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000000;
  color: white;
  height: 80px;
  border-bottom: 1px solid #061d1f;
  border-top: 1px solid #061d1f;
  padding: 10px 30px;

  @media screen and (max-width: 700px) {
    padding: 10px 15px;
  }
`;

const RightNav = styled.ul`
  display: flex;
  flex: 0.4;
  align-items: center;
  justify-content: flex-end;

  .icon {
    opacity: 1;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .icon:hover {
    color: rgb(175, 169, 170);
    opacity: 0.3;
  }

  .loginIcon {
    font-size: 25px;
    color: white;
    padding-right: 5px;
    cursor: pointer;
  }

  @media screen and (max-width: 700px) {
    li:nth-child(2) {
      display: none;
    }
  }
`;

const NotifDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 17px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .notification {
    font-size: 25px;
  }
`;

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

const SignupButton = styled.button`
  padding: 10px 15px;
  color: white;
  background: transparent;
  border: 1px solid white;
  border-radius: 25px;
  font-size: 15px;
  transition: all 0.7s ease-in-out;
  margin-left: 10px;
  margin-right: 12px;
  cursor: pointer;

  :hover {
    background: white;
    color: black;
  }

  @media screen and (max-width: 700px) {
    margin-left: 3px;
    margin-right: 3px;
    padding: 10px 10px;
  }
`;

const LogInButton = styled.button`
  padding: 10px 25px;
  color: black;
  background: white;
  border: 1px solid black;
  border-radius: 25px;
  font-size: 15px;
  transition: all 0.7s ease-in-out;
  margin-left: 10px;
  cursor: pointer;

  :hover {
    background: transparent;
    color: white;
    border: 1px solid white;
  }

  @media screen and (max-width: 700px) {
    margin-left: 3px;
    margin-right: 3px;
    padding: 10px 15px;
  }
`;

const LogOutButton = styled.button`
  padding: 8px 20px;
  color: white;
  background: transparent;
  border: 1px solid white;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.7s ease-in-out;
  margin-left: 10px;
  margin-right: 12px;
  cursor: pointer;

  :hover {
    background: white;
    color: black;
  }
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid white;
`;

const DropDown = styled.div`
  position: absolute;
  top: 67px;
  width: 160px;
  background-color: #000;
  border-radius: 10px;
  padding: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 13px;

  .navStyle {
    display: flex;
    align-items: center;
    gap: 7px;
    transition: background 0.3s;
    padding: 5px 10px;
    border-radius: 25px;
    text-decoration: none;
    color: #fff;

    :hover {
      background-color: #525357;
    }
  }
`;

const Icon = styled.span`
  font-size: 17px;
  border-radius: 50%;
  border: 1px solid white;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemCount = styled.span`
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: white;
  color: black;
  position: absolute;
  top: 15px;

  right: 92px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Header;
