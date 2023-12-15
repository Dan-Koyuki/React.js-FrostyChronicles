import React, { useEffect, useRef } from 'react';
import Overworld from './utils/Overworld';

const Map = () => {
  const canvasRef = useRef(null); // Create a reference to the canvas element

  // const { user } = useUserAuth();

  useEffect(() => {
    const overworld = new Overworld({
      canvas: canvasRef.current // Use the canvas reference
    });
    // overworld.init();
  }, []); // Run this effect only once, similar to componentDidMount

  return (
    <div className='game-container'>
      <canvas className='game-canvas' ref={canvasRef} width={352} height={198}></canvas>
    </div>
  );
}

export default Map;