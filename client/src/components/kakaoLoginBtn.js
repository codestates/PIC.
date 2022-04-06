import React from 'react'

export const KakaoLoginBtn = () => {
  const restApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const loginHandler = async () => {
    const redirect = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`
    window.location.replace(redirect)
  }

  return (
    <div>
      <button onClick={loginHandler}>깨깨오</button>
    </div>
  )
}
