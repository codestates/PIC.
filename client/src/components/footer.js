import React from "react";
import styled, { StyledComponent } from "styled-components";
import { Link } from "react-router-dom";
import { GoMarkGithub } from "react-icons/go";

const Container = styled.div`
  display: grid;
  background-color: #ffd600;
  padding: 15px 0;
  box-sizing: border-box;
  place-items: center;
  width: 100vw;
  min-width: 1200px;
  height: 200px;
  bottom: 0px;
  position: absolute;
`;

const InnerContainer = styled.div`
  display: flex;
  .card {
    display: grid;
    place-items: center;
    margin-right: 50px;
    margin-bottom: 15px;
    &:last-child {
      margin-right: 0;
    }
    a {
      color: black;
      margin-top: 8px;
    }
    a:visited {
      color: black;
      &:hover {
        color: purple;
      }
    }
  }
  .name {
    font-size: 0.8rem;
    margin-bottom: 17px;
  }
  .position {
    font-weight: lighter;
    font-size: 0.8rem;
  }
`;

const Logo = styled.div`
  font-family: "Sriracha", cursive;
  font-size: 2.3rem;
  text-align: center;
  position: absolute;
  span {
    color: #e80707;
  }
`;

const Title = styled.div`
  font-size: 1.1rem;
  display: flex;
  a {
    color: black;
  }
  .head {
    margin-right: 10px;
    margin-bottom: 35px;
  }
`;

const Copyright = styled.div`
  display: flex;
  font-weight: lighter;
  font-size: 7px;
  .copy {
    margin-top: 20px;
  }
`;

export const Footer = () => {
  return (
    <Container>
      <Title>
        <div className="head">About us</div>
        <div>
          <a href="https://github.com/codestates/PIC.">
            <GoMarkGithub />
          </a>
        </div>
      </Title>
      <InnerContainer>
        <div className="card">
          <div className="name">박우용</div>
          <div className="position">Front-End</div>
          <a href="https://github.com/Lpickle">
            <GoMarkGithub />
          </a>
        </div>
        <div className="card">
          <div className="name">최경락</div>
          <div className="position">Front-End</div>
          <a href="https://github.com/CHOI-K-ROCK">
            <GoMarkGithub />
          </a>
        </div>
        <div className="card">
          <div className="name">조승호</div>
          <div className="position">Front-End</div>
          <a href="https://github.com/jo-seungho">
            <GoMarkGithub />
          </a>
        </div>
        <div className="card">
          <div className="name">이상훈</div>
          <div className="position">Back-End</div>
          <a href="https://github.com/tkdgns25300">
            <GoMarkGithub />
          </a>
        </div>
      </InnerContainer>
      <Copyright>
        <div className="copy">Copyright © 2022 Waat All rights reserved</div>
      </Copyright>
      {/* <Logo className="logo">
        PIC<span>.</span>
      </Logo> */}
    </Container>
  );
};
