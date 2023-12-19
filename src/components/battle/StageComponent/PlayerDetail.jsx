import React from 'react';
import styled from 'styled-components';

const PlayerDetail = ({playerCurrent}) => {

  if (!playerCurrent) {
    return (
      <PlayerSide>
        <div>
          <h1>Loading...</h1>
        </div>
      </PlayerSide>
    );
  }

  return ( 
    <PlayerSide>
      <div>
        <h1>{playerCurrent.name}</h1>
        <h3>{playerCurrent.rHP}/{playerCurrent.tHP}</h3>
      </div>
      <Sprite src={playerCurrent.sprite} alt='Pokemon Sprite'/>
    </PlayerSide>
   );
}
 
export default PlayerDetail;

const PlayerSide = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: end;
  padding: 5rem 4rem;
`;

const Sprite = styled.img`
  width: auto;
  max-width: 250px;
  height: auto;
  max-height: 250px;
`;