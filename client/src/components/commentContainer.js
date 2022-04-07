import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Comment } from "../components/comment"
import { HiArrowUp } from "react-icons/hi";
import { useRef } from "react";

const Container = styled.section`
margin-top: 10px;

`

const CommentList = styled.section`
  position: relative;
  width: 100%;
  min-height: 200px;
  height: max-content;
  max-height: 500px;

  box-sizing: border-box;
  
  .nick {
    font-weight: 550;
    font-size: 1.1rem;
    margin-bottom: 5px;
  }

  .eachComment {
    margin-bottom: 10px;
  }

  overflow: auto;
`;

const CommentForm = styled.div`
    position: relative;
    width: 100%;
    display: flex;

    .wrapper {
      display: flex;
      width: 100%;

      textarea {
        width: 100%;
        height: 50px;

        box-sizing: border-box;
        border-radius: 25px;

        padding: 16px 55px;

        font-size: 1rem;

        font-family: sans-serif;

        resize: none;
        overflow: hidden;

        border: 1px solid #aaa;

        &:focus{
          outline: 3px solid #ffd600;
          border: none;
        }
      }

      .button {
        position: absolute;
        right: 0;
        bottom: 1px;
        display: grid;
        place-items: center;

        box-sizing: border-box;

        width : 50px;        
        height: 50px;

        border-radius: 50%;
        background-color: #FFEA7C;

        cursor: pointer;

        transition: 0.2s;

        &:hover{
          border: none;
          box-shadow: 0px 2px 3px rgba(0,0,0,0.4);
          background-color: #ffd600;
        }
      }
  }
`

const ProfilePic = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 50px;
  height: 50px;

  background: ${props => props.url ? `url(${props.url})` : null};

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  border-radius: 50%;
`


export const CommentContainer = () => {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const sessionStorage = window.sessionStorage;
  const token = sessionStorage.getItem("loginToken")
  const userId = sessionStorage.getItem("userId")
  const { id } = useParams()

  const [input, setInput] = useState("")
  const [comments, setComments] = useState([]);
  const [myProfilePic, setMyProfilePic] = useState(null)

  useEffect(() => {
    const getProfilePic = async () => {
      const res = await axios.get(`${serverPath}/api/users/${userId}`)
      setMyProfilePic(res.data.userInfo.image)
    }
    getProfilePic()
  }, [])

  const writeArea = useRef()
  const autoResizing = () => {
    const textarea = writeArea.current
    textarea.style.height = '50px'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  const headers = {
    headers: {
      "Authorization": token
    }
  }

  const onChange = (e) => {
    setInput(e.target.value)
  }

  // 댓글 작성및 다시 댓글 목록 불러오기 요청
  const postComment = async () => {
    const res = await axios.post(`${serverPath}/api/posts/${id}/comments`, {
      description: input
    }, headers)
    if (res.status === 201) {
      const response = await axios.get(`${serverPath}/api/posts/${id}/comments`)
      setComments(response.data.comments)
      console.log(comments, "POST")
      setInput("")
      autoResizing()
    }
  }

  // 댓글 목록 불러오기 요청

  const getComment = async () => {
    const res = await axios.get(`${serverPath}/api/posts/${id}/comments`)
    setComments(res.data.comments)
  }

  useEffect(() => {
    getComment()
  }, [])

  console.log(comments)
  return (
    <Container>
      <CommentList>
        <div className="comment">
          {comments.map((el, idx) => {
            return <Comment data={el} key={idx}>nick: {el.nickname}  댓글 : {el.description}</Comment>
          })}
        </div>
      </CommentList>
      <h3 className="category">댓글 입력</h3>
      <CommentForm>
        <ProfilePic url={myProfilePic} />
        <div className="wrapper">
          <textarea ref={writeArea} value={input} type="text" onKeyUp={autoResizing} spellCheck={false} onChange={onChange} placeholder="댓글을 작성하세요."></textarea>
          <div className="button" onClick={postComment}><HiArrowUp size={'1.5rem'}/></div>
        </div>
      </CommentForm>
    </Container>
  );
};
