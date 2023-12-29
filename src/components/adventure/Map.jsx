import React, { useEffect, useRef } from 'react';
import Overworld from './utils/Overworld';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';


const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background: grey;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
`;

const Map = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null); // Create a reference to the canvas element

  // const { user } = useUserAuth();

  useEffect(() => {
    const overworld = new Overworld({
      canvas: canvasRef.current // Use the canvas reference
    });
    overworld.init();
  }, []); // Run this effect only once, similar to componentDidMount

  const handleBack = () => {
    navigate("/home");
  };

  const handleNavigate = () => {
    window.location.href = "https://dan-koyuki.github.io/Web-Vanilla_FrostyTest/"
  }

  return (
    <>
    <GlobalStyle />
    <Container>
      <BackButton onClick={handleBack}>Back</BackButton>
      <BackButton onClick={handleNavigate}>vanilla version</BackButton>
      <GameContainer>
        <GameCanvas ref={canvasRef}></GameCanvas>
      </GameContainer>
    </Container>
    </>
  );
}

export default Map;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  margin: 0;
`

const BackButton = styled.button`
  height: 40px;
  width: 70px;
`

const GameContainer = styled.div`
  position: relative;
  background: #6b6969;
  width: 352px;
  height: 198px;
  margin: 0 auto;
  outline: 2px solid #fff;

  transform: scale(2.5) translateY(35%);
`

const GameCanvas = styled.canvas`
  width: 352px;
  height: 198px;
  image-rendering: pixelated;
`