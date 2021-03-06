import styled from 'styled-components';
import axios from 'axios';
import { BsFillHeartFill } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';


const Container = styled.section`
  position: relative;
  top: -10px;
  right: 5px;

  display : grid;
  place-items : center;

  width: 50px;
  height: 50px;

  font-size: 2rem;

  transition: 0.1s;

  color: ${props => props.isLikePost ? '#ff796b' : '#ddd'};

  cursor: pointer;
`

export const ToggleLikeBtn = ({ likeStat, setLikeStat }) => {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const loginToken = window.sessionStorage.getItem('loginToken')

  const [isLikePost, setIsLikePost] = useState('')

  const params = useParams()

  useEffect(() => {
    setIsLikePost(likeStat)
  }, [likeStat])

  const toggleLike = async () => {
    await axios.post(`${serverPath}/api/posts/${params.id}/like`, {}, {
      headers: {
        Authorization: loginToken
      }
    })
    isLikePost ? setIsLikePost(false) : setIsLikePost(true)
    if (likeStat) likeStat ? setLikeStat(false) : setLikeStat(true)
  }

  return (
    <Container isLikePost={isLikePost}>
      <BsFillHeartFill onClick={toggleLike} />
    </Container>
  );
};
