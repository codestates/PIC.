import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const NaverCallback = () => {

  const localStorage = window.localStorage
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const naverState = process.env.REACT_APP_NAVER_STATE;
  const navigate = useNavigate()

  const userId = localStorage.getItem("userId")
  const loginToken = localStorage.getItem("loginToken")

  const nidCode = new URLSearchParams(window.location.search).get('code');
  (async () => {
    if (!nidCode && !userId && !loginToken) navigate('main')
    if (nidCode) {
      const res = await axios.post(`${serverPath}/api/users/oauth/naver`, {
        code: nidCode,
        state: naverState,
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
    <div>NaverCallback</div>
  )
}
