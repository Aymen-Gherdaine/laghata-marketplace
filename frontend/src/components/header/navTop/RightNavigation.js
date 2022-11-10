import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils";
import userDefault from "../../../assets/user.png";
import { FiUser } from "react-icons/fi";
import { MdNotifications } from "react-icons/md";
import DropDownMenu from "../navTop/DropDownMenu";
import { ChatContext } from "../../context/ChatContext";

const RightNavigation = ({ setOpen, open, width, user }) => {
  // getting chat information from the chat context
  const { notification, setNotification, openChat, setOpenChat } =
    useContext(ChatContext);

  return (
    <RightNav>
      {user ? (
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
            src={user.picture || userDefault}
            alt="User Profile Picture"
            onClick={() => {
              setOpen(!open), scrollToTop();
            }}
          />
          {open && <DropDownMenu setOpen={setOpen} />}
        </>
      ) : (
        <>
          {width < 700 ? (
            <NavLink to="/login" className="loginIcon" onClick={scrollToTop}>
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
  );
};

// Right Navigation Style
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

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid white;
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

export default RightNavigation;
