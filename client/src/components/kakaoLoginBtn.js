import React from 'react'
import styled from 'styled-components'
import kakaoIcon from "../img/kakao_oauth_icon.png"

const Container = styled.div`
img {
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px;

  cursor: pointer;

  transition: 0.1s;
  
  &:hover{
    transform: translateY(-2px);
  }
}
`

export const KakaoLoginBtn = () => {
  const restApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const loginHandler = async () => {
    const redirect = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`
    window.location.replace(redirect)
  }

  return (
    <Container>
      <img src={kakaoIcon} alt="kakao_icon" width="40" onClick={loginHandler} />
    </Container>
  )
}
