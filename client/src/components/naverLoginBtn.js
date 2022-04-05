import React from "react";

export const NaverLoginBtn = () => {
  const naverState = process.env.REACT_APP_NAVER_STATE;
  const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID
  const naverRedirectUrl = process.env.REACT_APP_NAVER_REDIRECT_URL

  const naverCode = async () => {
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${naverRedirectUrl}&state=${naverState}`
    window.location.replace(url)
  }

  return (
    <div>
      <button onClick={naverCode}>NAVER</button>
    </div>
  )
};
