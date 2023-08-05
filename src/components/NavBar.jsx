import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const NavBar = ({ isScrolled }) => {
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/myList" },
  ];

  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <Container>
      <nav
        className={`flex ${
          isScrolled ? "scrolled" : ""
        } md:px-[4rem] px-[1rem]`}
      >
        <div className="left flex a-center">
          {/* logo */}
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" onClick={() => navigate("/")} />
          </div>
          <ul className="links sm:flex hidden">
            {links.map(({ name, link }) => {
              return (
                <li key={name} className="text-xl">
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button className="sm:block hidden">
            <FaPowerOff />
          </button>
          <div className="sm:hidden block">
            {!mobileMenu ? (
              <GiHamburgerMenu
                className=" text-3xl"
                onClick={() => setMobileMenu(!mobileMenu)}
              />
            ) : (
              <div className="flex gap-1 bg-black w-[50vw] absolute top-0 right-0 h-[80vh] border-radius-[1rem] pt-5">
                <ul className="links flex flex-col px-5">
                  {links.map(({ name, link }) => {
                    return (
                      <li key={name} className="text-md py-5">
                        <Link to={link}>{name}</Link>
                      </li>
                    );
                  })}
                  <li className="text-md py-5">Sign Out</li>
                </ul>
                <AiOutlineClose
                  className="text-2xl my-4"
                  onClick={() => setMobileMenu(!mobileMenu)}
                />
              </div>
            )}
          </div>
        </div>
      </nav>
    </Container>
  );
};

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    height: 6rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 3.5rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2.5rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;
export default NavBar;
