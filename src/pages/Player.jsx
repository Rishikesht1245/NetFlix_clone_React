import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/video.mp4";
import { useNavigate } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video
          className="w-[100%] sm:h-[100%] h-[200px]"
          src={video}
          autoPlay
          loop
          controls
          muted
        ></video>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 2rem;
        cursor: pointer;
      }
    }
    video {
      object-fit: cover;
    }
  }
`;
export default Player;
