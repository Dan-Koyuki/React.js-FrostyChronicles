import React, { useEffect, useRef } from 'react';
import Overworld from './utils/Overworld';
import styled from 'styled-components';

const Map = () => {
  const canvasRef = useRef(null); // Create a reference to the canvas element

  // const { user } = useUserAuth();

  useEffect(() => {
    const overworld = new Overworld({
      canvas: canvasRef.current // Use the canvas reference
    });
    overworld.init();
  }, []); // Run this effect only once, similar to componentDidMount

  return (
    <Container>
      <BackButton>Back</BackButton>
      <GameContainer>
        <GameCanvas ref={canvasRef}></GameCanvas>
      </GameContainer>
    </Container>
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

  transform: scale(2.7) translateY(33%);
`

const GameCanvas = styled.canvas`
  width: 352px;
  height: 198px;
  image-rendering: pixelated;
`