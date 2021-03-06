import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BsGeoAltFill, BsChatDots, BsFillHeartFill } from "react-icons/bs";
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { LoadingIndicator } from './loadingIndicator';


const Container = styled.section`
  position: relative;
  top : 10px;

  width: 100%;
  height: 320px;

  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 3px 3px 10px rgba(0,0,0,0.5);

  padding: 5px;
  
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
  position: relative;

  width: 100%;
  height: 220px;

  border-radius: 10px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.2);

  overflow: hidden;

  z-index: 1;

  .loading {
    position: absolute;

    display: grid;
    place-items : center;

    width: 100%;
    height: 100%;

    background-color: #fff;
  }

  img {
    width: 100%;
    height: 100%;
    
    object-fit: cover;
  }
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
    .like svg {
      color : ${props => props.isLike ? '#ff796b' : null};
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

const Skeleton = styled.div`
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

export const PostThumbnail = ({ data, action, idx }) => { // ??? ??????????????? ?????? ????????? props ??? ???????????? ????????? ?????????.
  const serverPath = process.env.REACT_APP_SERVER_PATH
  const userId = window.sessionStorage.getItem('userId')

  const [isLike, setIsLike] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const { _id, photo, title, location, likes, comment, nickname } = data
  // ????????? _id ??? ????????? ????????????.

  useEffect(() => {
    if (data) {
      setIsLike(likes.includes(userId))
    }
  }, [data])

  let presentAdd
  if (location.roadAdd === null) {
    presentAdd = location.lotAdd
  } else {
    presentAdd = location.roadAdd
  }
  // ????????? ????????? ????????? ????????? ?????? ????????? ????????? ??????, ?????? ?????? ?????? ?????? ??????

  return (
    <Container onClick={action} idx={idx}>
      <PostImg>
        {
          isLoading && (
            <div className='loading'>
              <LoadingIndicator size="5rem" />
            </div>
          )
        }
        <img src={photo} alt="thumbnail img" onLoad={() => setIsLoading(false)} />
      </PostImg>
      <PostInfo isLike={isLike}>
        <h3 className='title'>{title}</h3>
        <div className='nickname'>{nickname}</div>
        <div className='address'>
          <BsGeoAltFill />
          {presentAdd}
        </div>

        <div className='social-amounts'>
          <div className='like'>
            <BsFillHeartFill />
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
