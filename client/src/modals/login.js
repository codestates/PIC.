import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { GoogleLoginBtn } from "../components/googleLoginBtn";
import { NaverLoginBtn } from "../components/naverLoginBtn";
import { KakaoLoginBtn } from "../components/kakaoLoginBtn"
import { BtnComponent as Btn } from "../components/BtnComponent";
import { BsXCircleFill } from "react-icons/bs";


const Container = styled.section`
  position : fixed;
  display: grid;
  place-items: center;

  top:0; left: 0; bottom: 0; right: 0;

  width: 100vw;
  height: 100vh;

  z-index: 998;
`

const Backdrop = styled.div`
  position : fixed;
  top:0; left: 0; bottom: 0; right: 0;

  background-color: rgba(0,0,0,0.3);

  z-index: 998;
`

const Modal = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  background-color: white;
  width: 400px;
  height: 550px;
  border-radius: 15px;
  z-index: 999;

  .nofi {
    font-size: 0.8rem;
  }

  input {
    width: 305px;
    height: 40px;
    padding-left: 5px;
    border-radius: 3px;
    border: 1px solid #aaa;

    box-sizing: border-box;

    &:focus {
      border: none;
      outline: 3px solid #ffd600;
    }
  }

  h3{
    margin-top: 10px;
    margin-bottom: 10px;
  }

  @media screen and (max-width : 500px) {
    width: 92%;
  }
`;

const InnerContainer = styled.div`
  position: relative;
  top: 15px;
  height: max-content;
`

const CloseBtn = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;

  color: #ff796b;

  transition: 0.1s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
`

const Input = styled.input`
  margin-bottom: 10px;
  width: 200px;
  height: 30px;
`;

const InputContainer = styled.div`
  align-items: left;
  margin-bottom: 35px;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;


  margin-bottom: 35px;
`

const SignContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  div {
    margin-bottom: 20px;
  }
`



const serverPath = process.env.REACT_APP_SERVER_PATH;

export const Login = ({ closeFn, setOpenSignupModal, setOpenLoginModal }) => {
  const sessionStorage = window.sessionStorage;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false)

  const submit = async (e) => {
    // e.preventDefault();
    try {
      const res = await axios.post(`${serverPath}/api/users/login`, {
        email: email,
        password: password,
      })
      if (res) {
        sessionStorage.setItem("userId", res.data._id)
        sessionStorage.setItem("loginToken", res.data.accessToken)
        sessionStorage.setItem("loginMethod", "common")
        closeFn();
        window.location.reload()
      }
    } catch (err) {
      setFailedLogin(true)
    }
  };

  const enterEvent = (e) => {
    if (window.event.keyCode == 13) {
      submit()
    }
  }

  const openSignup = () => {
    setOpenLoginModal(false)
    setOpenSignupModal(true)
  };

  return (
    <Container>
      <Backdrop onClick={closeFn}/>
      <Modal>
        <CloseBtn onClick={closeFn}><BsXCircleFill size={'2rem'}/></CloseBtn>
        <InnerContainer>
          <InputContainer>
            <h3>이메일</h3>
            <Input autoFocus placeholder="이메일을 입력해주세요" onChange={(e) => setEmail(e.target.value)}></Input>
            <h3>비밀번호</h3>
            <Input type="password" onKeyUp={enterEvent} placeholder="비밀번호를 입력해주세요" onChange={(e) => setPassword(e.target.value)}></Input>
            {failedLogin ? <div className="nofi">이메일과 비밀번호를 확인해 주세요</div> : null}
          </InputContainer>
          <BtnContainer>
            <GoogleLoginBtn />
            <NaverLoginBtn />
            <KakaoLoginBtn />
          </BtnContainer>
          <SignContainer>
            <Btn action={submit}>로그인</Btn>
            <Btn action={openSignup}>회원가입</Btn>
          </SignContainer>
        </InnerContainer>
      </Modal>
    </Container>
  );
};
