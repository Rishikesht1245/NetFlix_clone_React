import React from "react";
import { useState, useRef } from "react";
import Cards from "./Cards";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default React.memo(function CardSlider({ data, title }) {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();

  //handle left and right movements of Slider
  const handleDirection = (directions) => {
    // getting the distance mean length of the x-axis
    let distance = listRef.current.getBoundingClientRect().x - 70;
    //left button will only work if we clicked the right at least once (sliderPosition >0)
    if (directions === "left" && sliderPosition > 0) {
      // recovering from negative x values
      listRef.current.style.transform = `translateX(${270 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    //right button only works for four times
    if (directions === "right" && sliderPosition < data.length - 4) {
      //translate x to -230 means translating the first card to outside of the boundary
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };
  return (
    <Container
      className="flex column"
      showControls={showControls}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1 className="sm:text-4xl text-2xl sm:text-center text-start sm:px-0 px-5">
        {title}
      </h1>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className="slider sm:ml-[50px] ml-5 flex" ref={listRef}>
          {data.map((movie, index) => {
            return <Cards movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
  );
});
const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    font-family: poppins;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
      top: 50%;
      transform: translateY(-40%);
    }
    .right {
      right: 0;
      top: 50%;
      transform: translateY(-40%);
    }
  }
`;
