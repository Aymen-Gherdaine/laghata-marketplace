import React from "react";
import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import { FiSettings, FiList, FiInbox } from "react-icons/fi";
import { scrollToTop } from "../../utils";

const DropDownMenu = ({ setOpen }) => {
  // hook to redirect the user to a specific page
  const navigate = useNavigate();

  // custom hook to check and close if we click outside the dropdown menu
  let ref = useClickOutside(() => {
    setOpen(false);
  });

  // function that handle redirecting the user to homepage when logout and clear local storage
  const logoutHandler = () => {
    navigate("/");
    window.localStorage.clear();
  };

  // function to handle the navlink click
  const navLinkClickHandler = () => {
    setOpen(!open), scrollToTop();
  };

  return (
    <DropDown ref={ref}>
      <NavLink
        to="/userlisting"
        className="navStyle"
        onClick={navLinkClickHandler}
      >
        <Icon>
          <FiList />
        </Icon>
        Listing
      </NavLink>
      <NavLink
        to="/userinbox"
        className="navStyle"
        onClick={navLinkClickHandler}
      >
        <Icon>
          <FiInbox />
        </Icon>
        Inbox
      </NavLink>
      <NavLink to="/profile" className="navStyle" onClick={navLinkClickHandler}>
        <Icon>
          <FiSettings />
        </Icon>
        Profile
      </NavLink>
      <NavLink to="/">
        <LogOutButton
          onClick={() => {
            navLinkClickHandler(), logoutHandler();
          }}
        >
          Log Out
        </LogOutButton>
      </NavLink>
    </DropDown>
  );
};

// DropDown Menu Style
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
export default DropDownMenu;
