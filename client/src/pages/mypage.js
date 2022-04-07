import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../components/pageTitle";
import { BtnComponent as Btn } from "../components/BtnComponent";

const Container = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  
  width: 1200px;
  height: max-content;
`

const InnerContainer = styled.div`
  grid-column: 3 / 11;

  display: flex;
  flex-direction: column;

  min-height: max-content;

  align-items: center;`

const ProfilePic = styled.div`
  width: 130px;
  height: 130px;

  margin-bottom: 20px;

  background: ${(props) => `url(${props.url})`};
  background-position: center;
  background-size: cover;

  border-radius: 30%;

  box-shadow: 0 3px 3px rgba(0,0,0,0.2);
`;

const Userinfo = styled.div`
  width: 305px;

  margin-top: 30px;

  .info {
    h3 {
      margin-bottom: 15px;
      font-size: 1rem;
      font-weight: 500;
    }

    div {
      font-size: 1.2rem;
    }
  }

  .info:last-child {
    margin-bottom: 30px;
  }
`
const Hline = styled.div`
  margin : 28px 0;

  width: 100%;
  height: 1px;

  background-color: #ddd;
`


export const Mypage = () => {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const userId = window.sessionStorage.getItem('userId')

  const [userInfo, setUserInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserinfo = async () => {
      const res = await axios.get(`${serverPath}/api/users/${userId}`)
      if (userInfo) {
        setUserInfo(res.data.userInfo)
      }
    }
    getUserinfo()
  }, []);

  const navigateToModify = () => {
    navigate("modify");
  };

  let { email, nickname, image, likes } = userInfo;
  // 회원 이미지 필요
  // 닉네임 가져오고,
  // 내 이메일 가져오고
  // 좋아요 수 가져오고
  // 링크로 내 정보 수정 페이지로 넘어가야함.
  return (
    <Container>
      <InnerContainer>
        <PageTitle>내 정보보기</PageTitle>
        <ProfilePic url={image} />
        <Userinfo>
          <div className="info">
            <h3>내 닉네임</h3>
            <div>{nickname}</div>
          </div>
          <Hline />
          <div className="info">
            <h3>내 이메일</h3>
            <div>{email}</div>
          </div>
          <Hline />
          <div className="info">
            <h3>내가 받은 좋아요</h3>
            <div>{likes}</div>
          </div>
        </Userinfo>
        <Btn action={navigateToModify}>회원정보 수정</Btn>
      </InnerContainer>
    </Container>
  );
};
