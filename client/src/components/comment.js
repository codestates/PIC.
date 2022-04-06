import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { useEffect } from 'react';
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";


const Nickname = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  padding-left: 3px;

  margin-bottom: 8px;

  .nick {
    position: relative;
    top: 5px;
  }

  .timestamp {
    position: absolute;
    right: 5px;
    bottom: 6px;

    font-size: 0.9rem;
    color: #888;
  }

`
const ProfilePic = styled.div`
  width: 35px;
  height: 35px;
  
  margin-right: 7px;
  
  background: ${props => props.url ? `url(${props.url})` : null};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  box-shadow: 0px 2px 3px rgba(0,0,0,0.4);

  border-radius: 50%;
  `


const CommentContent = styled.div`
  position: relative;

  display : flex;
  align-items: center;

  background-color: #FFF2AE;

  padding-left: 12px;
  padding-right: 80px;

  /* min-height: 35px; */
  height: max-content;
  border-radius: 15px;

  box-shadow: 0px 2px 3px rgba(0,0,0,0.2);

  pre {
    width: 100%;
    white-space: pre-wrap;
    padding: 10px;
    position: relative;
    top: 2px;
  }
`

const BtnWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 14px;

    .option {
    margin-left: 13px;
    color: #333;

    cursor: pointer;

    transition: 0.1s;

    &:first-child:hover{
      color: #91d92e;
      transform: scale(1.2);
    }

    &:last-child:hover{
      color: #ff796b;
      transform: scale(1.2);
    }
  }
`


export const Comment = ({ data }) => {
  const { description, author, nickname, _id, createdAt } = data
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const { id } = useParams()
  const userId = localStorage.getItem("userId")
  const loginToken = localStorage.getItem("loginToken")

  const [text, setText] = useState(description)
  const [edit, setEdit] = useState(false)
  const [userPic, setUserPic] = useState(null)


  useEffect(() => {
    const getProfilePic = async () => {
      const res = await axios.get(`${serverPath}/api/users/${author}`)
      setUserPic(res.data.userInfo.image)
    }
    getProfilePic()
  }, [])

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

  const Timestamp = () => {
    const date = new Date(createdAt)

    const y = date.getFullYear()
    const m = date.getMonth()
    const d = date.getDate()

    const hour = date.getHours()
    const min = date.getMinutes()
    

    return (
      <div className="timestamp">{y}. {m+1}. {d} / {hour}:{min}</div>
    )
  }

  return (
    <div className='eachComment'>
      <Nickname>
        <ProfilePic url={userPic} />
        <div className='nick'>{nickname}</div>
        <Timestamp />
      </Nickname>
      {edit ? (
        <input type="text" value={text} onChange={(e) => handleChange(e)} />)
        : (<CommentContent>
          <pre>{text}</pre>
          <BtnWrapper>
            {author === userId ? <div className='option' onClick={editOn}><BsPencilFill /></div> : null}
            {author === userId ? <div className='option' onClick={commentDelete}><BsFillTrashFill /></div> : null}
          </BtnWrapper>
        </CommentContent>)
      }
      {edit ? <button onClick={modifyComment}>확인</button> : null}
    </div>
  )
}