import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const NaverCallback = () => {

  const sessionStorage = window.sessionStorage
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const naverState = process.env.REACT_APP_NAVER_STATE;
  const navigate = useNavigate()

  const userId = sessionStorage.getItem("userId")
  const loginToken = sessionStorage.getItem("loginToken")

  const nidCode = new URLSearchParams(window.location.search).get('code');
  (async () => {
    if (!nidCode && !userId && !loginToken) navigate('main')
    if (nidCode) {
      const res = await axios.post(`${serverPath}/api/users/oauth/naver`, {
        code: nidCode,
        state: naverState,
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
    <div>NaverCallback</div>
  )
}
