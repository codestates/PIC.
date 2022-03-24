import styled from 'styled-components';
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    position : relative;
    display: grid;
    place-items: center;
    
    width: 100%;
`

const Title = styled.h2`
  position: relative;
  margin-bottom: 20px;
  
  font-size: 1.4rem;  
`

const GoBackBtn = styled(BsChevronLeft)`
  position: absolute;
  left: calc(50% - 306px);
  top: -3px;

  font-size: 1.5rem;
  color: #aaa;
  cursor: pointer;
`

const HLine = styled.div`
    display: block;
    margin-bottom: 30px;
    
    width: 600px;
    height: 1px;

    background-color: #aaa;
`

export const PageTitle = ({children}) => {
  const navigate = useNavigate()

  return (
    <Container>
      <Title>{children}</Title>
      <GoBackBtn onClick={() => navigate(-1)}/>
      <HLine />
    </Container>
  );
};
