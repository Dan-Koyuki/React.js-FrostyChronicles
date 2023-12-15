import React from 'react';
import styled from 'styled-components';
const BotDetail = ({botCurrent}) => {
  return ( 
    <BotSide>
      <div>
        <h1>{botCurrent.name}</h1>
        {botCurrent.types?.length === 1 ? (
            <h3>{botCurrent.types[0].TypeID}</h3>
          ) : (
            <h3>{botCurrent.types[0].TypeID}/{botCurrent.types[1].TypeID}</h3>
          )
        }
        <h3>{botCurrent.rHP}/{botCurrent.tHP}</h3>
      </div>
      <Sprite src={botCurrent.sprite} alt='Opponent Sprite'/>
    </BotSide>
  );
}
 
export default BotDetail;

const Sprite = styled.img`
  width: auto;
  max-width: 250px;
  height: auto;
  max-height: 250px;
`

const BotSide = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: start;
  padding: 3rem 15rem;
`;