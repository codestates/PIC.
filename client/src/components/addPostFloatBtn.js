import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const Btn = styled.div`
  display: grid;
  place-items: center;
  position: fixed;

  right: 15%;
  bottom: 15%;

  width: 60px;
  height: 60px;
  background-color: #FFD600;

  border-radius: 30%;
  box-shadow : 0px 3px 3px rgba(0,0,0,0.5);

  cursor : pointer;

  transition : 0.2s;
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
