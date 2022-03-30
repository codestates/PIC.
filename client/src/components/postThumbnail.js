import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsGeoAltFill, BsChatDots, BsSuitHeartFill } from "react-icons/bs";


const Container = styled.section`
  position: relative;
  top : 10px;

  width: 220px;
  height: 320px;

  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 3px 3px 10px rgba(0,0,0,0.5);
  
  cursor : pointer;

  transition: 0.2s;
  &:hover{
    transform: translateY(-5px);
    box-shadow: 3px 8px 10px rgba(0,0,0,0.5);
  }

    @keyframes up {
    0% {
      opacity : 0;
      transform: translateY(10px);
    }
    100% {
      opacity : 1;
      transform: translateY(0px);
    }
  }

  animation: up 0.2s linear;

`

const PostImg = styled.div`
  width: 220px;
  height: 220px;
  background: ${props => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  /* background-color: #fff; */
  border-radius: 10px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.2);
  z-index: 1;
`

const PostInfo = styled.div`

  width: 100%;
  height: max-content;
  
  margin: 8px 0 0 8px;
  .title {
    display: block;
    width: 90%;
    padding-top: 1px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    font-size: 1.2rem;
    font-weight: bold;
  }
  .nickname {
    display: block;
    width: 90%;
    padding-top: 2px;
    margin-top: 4px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .address{
    position: relative;
    top: -2px;

    width: 90%;
    margin-top: 5px;

    color: #888;
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    svg{
      position: relative;
      top: 2px;
    }
  }
  .social-amounts{
    position : absolute;
    right: 10px;
    bottom : 7px;
    
    display: flex;

    font-size: 0.9rem;
    color: #888;

    div{
      display: inherit;
    }

    .comment{
      margin-left: 8px;
    }

    .amounts{
      position : relative;
      top: 1px;

      margin-left: 3px;
    }
  }
`

const NicknameSkeleton = styled.div`
  position: relative;
  top: -2px;
  width: 100px;
  height: 1rem;

  background-color: #ddd;

  @keyframes blink {
    0% {
      background-color: #ddd
    }
    50%{
      background-color: #eee
    }
    100% {
      background-color: #ddd
    }
  }

  animation: blink 1s infinite;
`

export const PostThumbnail = ({ data, action, idx }) => { // 실 사용시에는 해당 위치에 props 로 게시글의 정보를 받아옴.

  const [nickname, setNickname] = useState('')
  const [comments, setComments] = useState([])

  const serverPath = process.env.REACT_APP_SERVER_PATH

  const { _id, photo, title, author, location, likes, comment } = data
  // 여기서 _id 는 게시물 아이디임.

  // 유저 닉네임과 댓글 갯수 가져와야함 
  useEffect(() => {
    const getUserNickname = async () => {
      const userInfo = await axios.get(`${serverPath}/api/users/${author}`)
      setNickname(userInfo.data.userInfo.nickname)
      // 사용자 아이디를 path 로 이용하여 요청을 보내고 해당 값을 상태에 저장한다.
    }

    // const getComments = async () => {
    //   const comments = await axios.get(`${serverPath}/comment?id=${_id}`)
    //   setComments(comments) // 여기 값 들어올때 수정해야함 까먹지 말기
    //   // 게시물 아이디를 쿼리를 이용하여 요청을 보내고 해당 배열의 길이를 상태에 저장한다.
    // }
    getUserNickname()
    // getComments()
  }, [])

  let presentAdd
  if (location.roadAdd === null) {
    presentAdd = location.lotAdd
  } else {
    presentAdd = location.roadAdd
  }
  // 사진의 위치는 도로명 주소가 있는 경우에 도로명 주소, 아닌 경우 지번 주소 사용

  return (
    <Container onClick={action} idx={idx}>
      <PostImg url={photo} />
      <PostInfo>
        <h3 className='title'>{title}</h3>
        <p className='nickname'>{nickname ? nickname : <NicknameSkeleton />}</p>
        <p className='address'>
          <BsGeoAltFill />
          {presentAdd}
        </p>

        <div className='social-amounts'>
          <div className='like'>
            <BsSuitHeartFill />
            <p className='amounts'>{likes.length}</p>
          </div>
          <div className='comment'>
            <BsChatDots />
            <p className='amounts'>{comment.length}</p>
          </div>
        </div>
      </PostInfo>
    </Container>
  );
};
