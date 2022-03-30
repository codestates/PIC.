// 해당 컴포넌트는 게시글을 모아보는 경우에만 표시합니다.

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Btn = styled.div`
  position: fixed;
  right: calc(50% - 30px - 550px);
  bottom: 250px;

  display: grid;
  place-items: center;

  width: 60px;
  height: 60px;
  background-color: #FFD600;

  border-radius: 30%;
  box-shadow : 0px 3px 3px rgba(0,0,0,0.5);

  cursor : pointer;

  transition : 0.2s;

  z-index: 998;
  &:hover{
    transform: translateY(-2px);
    box-shadow : 0px 5px 4px rgba(0,0,0,0.5);
  }

  &::before{
    content : '';
    display: block;
    position: absolute;
    width: 50%;
    height: 5px;

    background-color: #000;
  }
  &::after{
    content : '';
    display: block;
    position: absolute;
    height: 50%;
    width: 5px;

    background-color: #000;
  }
`

export const AddPostFloatBtn = () => {
  const navigate = useNavigate()
  const navigateToAddPost = () => {
    navigate('/add_post')
  }
  return (
      <Btn onClick={navigateToAddPost} />
  );
};
