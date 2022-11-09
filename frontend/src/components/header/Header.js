import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import NavBottom from "./NavBottom";
import RightNavigation from "./navTop/RightNavigation";
import LeftNavigation from "./navTop/LeftNavigation";
import { useUser } from "../hooks/useUser";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  // get user information useUser Hook
  const user = useUser();
  console.log(user);
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

  return (
    <HeaderContainer>
      <NavTop>
        <LeftNavigation toggleNav={toggleNav} />

        <Logo>
          <NavLink to="/">
            <img src={logo} alt="" width="130px" />
          </NavLink>
        </Logo>

        <RightNavigation
          setOpen={setOpen}
          open={open}
          width={width}
          user={user}
        />
      </NavTop>
      {(toggleMenu || width > 700) && <NavBottom user={user} />}
    </HeaderContainer>
  );
};

// Header style
const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 9999;
`;

const Logo = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  justify-content: center;
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

export default Header;
