import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const KakaoCallback = () => {

  const localStorage = window.localStorage
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const navigate = useNavigate()

  const userId = localStorage.getItem("userId")
  const loginToken = localStorage.getItem("loginToken")

  const kakaoCode = new URLSearchParams(window.location.search).get('code');
  (async () => {
    if (!kakaoCode && !userId && !loginToken) navigate('main')
    if (kakaoCode) {
      const res = await axios.post(`${serverPath}/api/users/oauth/kakao`, {
        code: kakaoCode
      })
      if (res.status === 200) {
        localStorage.setItem("userId", res.data._id)
        localStorage.setItem("loginToken", res.data.accessToken)
        localStorage.setItem("loginMethod", "social")
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
