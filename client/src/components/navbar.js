import { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { OneBtnModal } from './oneBtnModal';
import { TwoBtnModal } from './twoBtnModal';


const Container = styled.div`
  position : relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  min-width: 1200px;
  height: 50px;

  background-color: #FFD600;
  font-size: 1.0rem;

  a{
    text-decoration: none;

    &:visited{
      color : #000;
    }
  }

`

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  min-width: 1200px;

  .logo{
    grid-column: 1/3;
    /* background-color: #000; */
  }

  .left-btns,
  .right-btns{
    margin-top: 4px;
  }

  .left-btns {
    grid-column: 3/7;
  }

  .right-btns {
    grid-column: 9/-1;
    
    div{
    cursor: pointer;
    }
  }
`

const Logo = styled.div`
  font-family: 'Sriracha', cursive;
  font-size: 2.3rem;
  text-align: center;
  cursor : pointer;
  span{
    color : #E80707;
  }

`

const LeftLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;

`

const RightLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
`

export const Navbar = () => {

  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openSignupModal, setOpenSignupModal] = useState(false)
  const [openTwoBtnModal, setOpenTwoBtnModal] = useState(false)
  // 각 모달 컴포넌트가 열리고 닫혀있는지 확인하는 상태

  const modalHandler = (modal) => {
    openModal ? setOpenModal(false) : setOpenModal(true)

    if (modal === 'login') {
      openLoginModal ? setOpenLoginModal(false) : setOpenLoginModal(true)
      console.log('로그인 모달 오픈')
    }
    if (modal === 'signup') {
      openSignupModal ? setOpenSignupModal(false) : setOpenSignupModal(true)
      console.log('회원가입 모달 오픈')
    }
    if (modal === 'logout') {
      openTwoBtnModal ? setOpenTwoBtnModal(false) : setOpenTwoBtnModal(true)
      console.log('로그아웃 체크 모달 오픈')
    }
  }

  const navigateToHome = () => {
    navigate('/main')
  }


  return (
    <div>
      {/* 로그인 모달 */}
      {/* {openLoginModal ? <LoginModal onClick={() => modalHandler('login')} /> : null} */}
      {/* 회원가입 모달 */}
      {/* {openSignupModal ? <SignupModal onClick={() => modalHandler('signup')} /> : null} */}
      {/* 로그아웃 시 확인 모달 */}
      {openTwoBtnModal ? <TwoBtnModal main={'모달이 열렸다네.'}close={() => modalHandler('logout')} action={() => {console.log('으엑')}} nav={"/main"}/> : null}
      {/* 위의 내용 수정 필요 */}

      {/* 여기에 완성된 로그인, 회원가입 모달 가져와서 상태에 따른 조건부 렌더링으로 처리하기 */}
      {/* 완성된 모달 컴포넌트에 props 로 modal 상태변경 함수를 내려서 사용하기 */}
      {/* 백드롭도 모달에서 관리해주어야함. */}
      <Container>
        <InnerContainer>
          <Logo className='logo' onClick={navigateToHome}>PIC<span>.</span></Logo>
          <LeftLinks className='left-btns'>
            <Link className='my_pics' to="my_pics">내 사진</Link>
            <Link className='most_likes' to="most_likes">인기사진</Link>
            <Link className='new_pics' to="new_pics">최신사진</Link>
            <Link className='favorites' to="favorites">즐겨찾기</Link>
          </LeftLinks>
          <RightLinks className='right-btns'>
            <Link className='keywords' to="keywords">키워드 검색</Link>
            <Link className='tags' to="tags">태그 검색</Link>
            {isLogin
              ? <Link className='mypage' to="mypage">마이페이지</Link>
              : <div className='login' onClick={() => modalHandler('login')}> 로그인 </div>}
            {isLogin
              ? <div className='logout' onClick={() => modalHandler('logout')}> 로그아웃 </div>
              : <div className='signup' onClick={() => modalHandler('signup')}> 회원가입 </div>}
          </RightLinks>
        </InnerContainer>
      </Container>
    </div>
  );
};