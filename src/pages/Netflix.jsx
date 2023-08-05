import React, { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import backgroundImage from "../assets/home.jpg";
import movieLogo from "../assets/homeTitle.webp";
import { FaPlay, FaTabletAlt } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";

import Slider from "../components/Slider";

const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres()).then(() => {
      dispatch(fetchMovies({ type: "all" }));
    });
  }, []);

  // useEffect(() => {
  //   dispatch(getGenres());
  // }, []);

  // // fetching Movies
  // useEffect(() => {
  //   if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  // }, []);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const navigate = useNavigate();

  return (
    <Container>
      <NavBar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="Background Image"
          className="background-image w-[100vw] sm:w-full h-[100vh]"
        />
        <div className="container">
          <div className="hidden sm:block">
            <img src={movieLogo} className="sm:pt-2 px-10" alt="Movie Logo" />
          </div>
          <div className="buttons flex flex-col sm:flex-row gap-3">
            <button
              className="flex j-center a-center"
              onClick={() => navigate("/player")}
            >
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      {/* movie slider */}
      <Slider movies={movies} />
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(90%);
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
export default Netflix;
