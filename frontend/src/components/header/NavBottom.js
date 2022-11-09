import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { scrollToTop } from "../../utils/utils";

const NavBottom = ({ user }) => {
  return (
    <NavBottomContainer>
      <Ul>
        <li>
          <NavLink
            to="/home"
            style={({ isActive }) => {
              return isActive
                ? { color: "#f8f8f8", borderBottom: "2px solid white " }
                : { color: "white" };
            }}
            onClick={() => scrollToTop()}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            style={({ isActive }) => {
              return isActive
                ? { color: "#f8f8f8", borderBottom: "2px solid white " }
                : { color: "white" };
            }}
            onClick={() => scrollToTop()}
          >
            Categories
          </NavLink>
        </li>

        {user && (
          <>
            <li>
              <NavLink to="/add-listing" onClick={() => scrollToTop()}>
                Add listing
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" onClick={() => scrollToTop()}>
                Profile
              </NavLink>
            </li>
          </>
        )}
      </Ul>
    </NavBottomContainer>
  );
};

// Navigation bottom style
const NavBottomContainer = styled.nav`
  background: #000000;
  border-bottom: 1px solid #091d21;
  border-top: 1px solid #091d21;
`;

const Ul = styled.ul`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    height: 20rem;
    padding-left: 1.5rem;
  }

  li {
    list-style-type: none;

    a {
      color: white;
      text-decoration: none;
      text-transform: uppercase;
      font-size: 0.9rem;
      padding: 0.95rem 0rem;

      &::after {
        content: "";
        display: block;
        width: 0;
        height: 2px;
        background: white;
        transition: width 0.3s;
      }
      &:hover::after {
        width: 100%;
      }
    }
  }
`;

export default NavBottom;
