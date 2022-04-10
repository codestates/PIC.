import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.section`
  width: 100vw;
  height: max-content;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Top = styled.div`
  position: absolute;
  top: -100px;
  left: 0;

  display: grid;
  place-items: center;

  width: 100%;
  height: 700px;

  background: url(https://images.unsplash.com/photo-1531012804729-7df44b58327b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1710&q=80);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .wrapper {
    position: absolute;
    left: 0;
    top: 0;

    display: grid;
    width: 100%;
    padding: 70px;

    box-sizing: border-box;

    font-size: 1.8rem;

    height: max-content;
    
    p {
      margin-top: 20px;
      margin-bottom: 20px;

      &:first-child{
        margin-top: 0;
      }
    }
  }

  .start {
    margin-top: 50px;

    width: max-content;

    font-size: 1.2rem;
    padding-bottom: 5px;
    border-bottom: 1px solid;

    cursor: pointer;
  }

  @media screen and (max-width : 500px){
    min-height: 300px;
    height: max-content;

    .wrapper {
      font-size: 1rem;
      height: 150px;
      padding: 20px;

      p {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }

    .start {
      position: absolute;
      top: 17px;
      right: 17px;

      margin-top: 0;

      font-size: 1rem;
    }
  }

`

const InnerContainer = styled.div`
  position: relative;
  width: 70%;
  height: max-content;

  margin-top: 700px;
  
  section {
    display: flex;
    justify-content: space-around;
    height: 400px;
    width: 100%;

    border: 1px solid;

    img {
      width: 100px;
      height: 100px;

      background-color: #ddd;
    }

    .image {
      display: grid;
      place-items: center;

      width: 50%;
    }

    .text {
      display: flex;
      align-items: center;
      width: 50%;
    }
  }

  @media screen and (max-width : 500px){
    width: 100%;
    margin-top: 200px;

    section {
      display: grid;
      place-items: center;
    }
  }
`

const Logo = styled.div`
  font-family: "Sriracha", cursive;
  color: #000;
  font-size: 4rem;
  cursor: pointer;
  span {
    color: #e80707;
  }

  @media screen and (max-width : 500px){
    font-size: 3rem;
  }
`

export const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Top>
        <div className="wrapper">
          <p>같은 장소, 다른 시선</p>
          <p>나의 감정과 시선을 공유하는 서비스</p>
          <Logo>PIC<span>.</span></Logo>
          <p>입니다.</p>
          <div className='start' onClick={() => navigate('/my_pics')}>시작하기 &gt;&gt;</div>
        </div>
      </Top>
      <InnerContainer>
        <section>
          <div className="image">
            <img />
          </div>
          <div className="text">
            <p>
              사진에 담긴 그때의 감정을 남들과 공유하고 싶으셨던 적이 있으셨나요?
            </p>
          </div>
        </section>
        <section>
          <div className="text">
            <p>
              반복되는 일상, 늘 지나던 같은 장소가 오늘만큼은 다르게 보이던 순간들이 있으셨나요?
            </p>
          </div>
          <div className="image">
            <img />
          </div>
        </section>
        <section>
          <div className="image">
            <img />
          </div>
          <div className="text">
            <p>
              로고 를 통해 다른 사람들과 당신의 특별한 순간을 공유해보세요.
            </p>
          </div>
        </section>
      </InnerContainer>
    </Container>
  );
};
