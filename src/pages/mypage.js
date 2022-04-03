import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;

const ProfilePic = styled.div`
  width: 100px;
  height: 100px;
  background: ${(props) => `url(${props.url})`};
  background-position: center;
  background-size: cover;
`;

const Rows = styled.div`
  h3 {
  }

  span {
  }
`;

const ModifyBtn = styled.div`
  display: grid;
  place-items: center;
  width: 200px;
  height: 50px;
  border: 1px solid black;
  cursor: pointer;
`;

export const Mypage = () => {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const userId = window.localStorage.getItem('userId')

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
      <ProfilePic url={image} />
      <Rows>
        <h3>내 닉네임</h3>
        <span>{nickname}</span>
      </Rows>
      <Rows>
        <h3 className="red">내 이메일</h3>
        <span>{email}</span>
      </Rows>
      <Rows>
        <h3>내가 받은 좋아요</h3>
        <span>{likes}</span>
      </Rows>
      <ModifyBtn onClick={navigateToModify}>회원정보 수정</ModifyBtn>
    </Container>
  );
};
