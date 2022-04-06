import React from "react";
import styled from "styled-components";
import { GoMarkGithub } from "react-icons/go";
import { SiBloglovin } from "react-icons/si";
import { TiSpanner } from "react-icons/ti";



const Container = styled.div`
  position: relative;

  display: grid;
  place-items: center;

  width: 100vw;
  min-width: 1200px;
  height: 200px;

  box-sizing: border-box;
  padding: 30px 0;

  background-color: #ffd600;
`;

const InnerContainer = styled.div`
  display: flex;
  .card {
    display: grid;
    place-items: center;
    margin-right: 50px;
    margin-bottom: 20px;
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
    font-weight: 500;
    font-size: 0.8rem;
  }
  .mail {
    font-size: smaller;
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
    margin-bottom: 30px;
  }
`;

const Copyright = styled.div`
  display: flex;
  font-weight: lighter;
  font-size: 7px;
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
          <a href="https://github.com/codestates/PIC./wiki/Worklog"><TiSpanner /></a>
        </div>
      </Title>
      <InnerContainer>
        <div className="card">
          <div className="name">박우용</div>
          <div className="position">Front-End</div>
          <a href="https://github.com/Lpickle">
            <GoMarkGithub />
          </a>
          <a className="mail" href="mailto:pwooy2@gmail.com">pwooy2@gmail.com</a>
        </div>
        <div className="card">
          <div className="name">최경락</div>
          <div className="position">Front-End</div>
          <a href="https://github.com/CHOI-K-ROCK">
            <GoMarkGithub />
          </a>
          <a href="https://velog.io/@chl4842"><SiBloglovin /></a>
          <a className="mail" href="mailto:chl4842@gmail.com">chl4842@gmail.com</a>
        </div>
        <div className="card">
          <div className="name">조승호</div>
          <div className="position">Front-End</div>
          <a href="https://github.com/jo-seungho">
            <GoMarkGithub />
          </a>
          <a href="https://ahsldzjvl1.tistory.com/"><SiBloglovin /></a>
          <a className="mail" href="mailto:dkarlfurQkd1@gmail.com">dkarlfurQkd1@gmail.com</a>
        </div>
        <div className="card">
          <div className="name">이상훈</div>
          <div className="position">Back-End</div>
          <a href="https://github.com/tkdgns25300">
            <GoMarkGithub />
          </a>
          <a href="https://begin-to-end-project.tistory.com/"><SiBloglovin /></a>
          <a className="mail" href="mailto:tkdgns25300@gmail.com">tkdgns25300@gmail.com</a>
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
