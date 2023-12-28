import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TeamDisplay from "./details/TeamDisplay";

const Team = () => {

  return (
    <TeamContainer>
      <TitleSection>
        <Back>Back</Back>
        <Title>Team Builder</Title>
      </TitleSection>
      <DetailSection>
        <TeamDisplay></TeamDisplay>
      </DetailSection>
    </TeamContainer>
  );
};

export default Team;

const TeamContainer = styled.div`
  display: flex;
  margin: 0;
  padding: 0.5rem;
  height: 100%;
  max-height: 590px;
  flex-direction: column;
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  align-items: center;
`

const Back = styled.button`
  border: none;
  outline: none;
  margin: 0.3rem;
  width: 65px;
  height: 30px;
  background-color: rgba(59, 73, 197, 0.7);
  border-radius: 10px;
  color: white;
  font-weight: 500;
`

const Title = styled.h2`
  color: white;
  margin: 0 auto;
`
const DetailSection = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`