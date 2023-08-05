import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar";
import { myList } from "../utils/constants";
import Cards from "../components/Cards";

const MyList = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const navigate = useNavigate();
  return (
    <Container>
      <NavBar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1 className="sm:text-4xl text-2xl sm:text-center text-start">
          My List
        </h1>
        <div className="gride flex">
          {myList.map((movie, index) => {
            return <Cards movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .content {
    margin: 2rem;
    margin-top: 8rem;
    gap: 3rem;
    .gride {
      flex-wrap: wrap;
      gap: 0.9rem;
    }
  }
`;
export default MyList;
