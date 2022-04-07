import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const KakaoCallback = () => {

  const sessionStorage = window.sessionStorage
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const navigate = useNavigate()

  const userId = sessionStorage.getItem("userId")
  const loginToken = sessionStorage.getItem("loginToken")

  const kakaoCode = new URLSearchParams(window.location.search).get('code');
  (async () => {
    if (!kakaoCode && !userId && !loginToken) navigate('main')
    if (kakaoCode) {
      const res = await axios.post(`${serverPath}/api/users/oauth/kakao`, {
        code: kakaoCode
      })
      if (res.status === 200) {
        sessionStorage.setItem("userId", res.data._id)
        sessionStorage.setItem("loginToken", res.data.accessToken)
        sessionStorage.setItem("loginMethod", "social")
        navigate("/my_pics")
        window.location.reload()
      }
    } else {
      navigate()
    }
  })()

  return (
    <div>KakaoCallback</div>
  )
}
