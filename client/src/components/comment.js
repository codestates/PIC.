import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";

export const Comment = ({ data }) => {
  const { description, author, nickname, _id } = data
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const { id } = useParams()
  const userId = localStorage.getItem("userId")
  const loginToken = localStorage.getItem("loginToken")

  const [text, setText] = useState(description)
  const [edit, setEdit] = useState(false)

  const headers = {
    headers: {
      "Authorization": loginToken
    }
  }

  const commentDelete = async () => {
    await axios.delete(`${serverPath}/api/posts/${id}/comments/${_id}`, headers)
    window.location.reload()
  }

  const modifyComment = async () => {
    await axios.patch(`${serverPath}/api/posts/${id}/comments/${_id}`, {
      newDescription: text
    }, headers)
    setEdit(false)
  }

  const editOn = () => {
    setEdit(true)
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div className='eachComment'>
      <div className='nick'>{nickname}</div>
      {author === userId ? <button className='option' onClick={commentDelete}>삭제</button> : null}
      {author === userId ? <button className='option' onClick={editOn}>수정</button> : null}
      {edit ? (
        <input type="text" value={text} onChange={(e) => handleChange(e)} />)
        : (<div>{text}</div>)
      }
      {edit ? <button onClick={modifyComment}>확인</button> : null}
    </div>
  )
}