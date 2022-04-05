import axios from 'axios';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BtnComponent as Btn } from './BtnComponent';
import { PostThumbnail } from './postThumbnail';

import { Login } from "../modals/login";
import { Signup } from "../modals/signup";
import { BsChevronDoubleDown } from 'react-icons/bs';

const Container = styled.section`

`

const InnerContainer = styled.div`
  position: relative;
  /* grid-column: 2 / 12; */
  width: 100%;
  height: max-content;
`

const ThumbnailContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  justify-items: center;
  grid-column-gap: 20px;
  grid-row-gap: 100px;
  
  width: 100%;
  min-height: 20px;
  height: max-content;
`

const SuggetionContainer = styled.div`
  grid-column: 1/ -1;

  position: relative;
  top : 200px;

  display: grid;
  justify-items: center;

  .msg {
    text-align: center;
    margin-bottom: 200px;
  }

  .msg p {
    color: #aaa;
    font-size: 0.9rem;

    &:first-child{
      font-size: 1.2rem;
      margin-bottom: 15px;
    }
  }
`

const ViewmoreContainer = styled.section`
  position: relative;
  top: 50px;

  z-index: -1;

  display: grid;
  place-items: center;
  
  width: 100%;
  height: 300px;

  color: #888;

  .viewmore {
    position: absolute;
    bottom : 30%;

    font-size: 1rem;
  }
`
// ! 사용 보류
export const PostContainer = ({ category, data }) => {

  const serverPath = process.env.REACT_APP_SERVER_PATH
  const loginToken = window.localStorage.getItem('loginToken')
  const userId = window.localStorage.getItem('userId')

  const navigate = useNavigate()

  const [reqEndpoint, setReqEndpoint] = useState('')

  const [postsData, setPostsData] = useState([])
  const [pageLevel, setPageLevel] = useState(1);

  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openSignupModal, setOpenSignupModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false)

  const viewmore = useRef()

  useEffect(() => {
    if (category === 'my_pics') setReqEndpoint(`${serverPath}/api/posts?date=true&mypost=${userId}&level=${pageLevel}`)
    if (category === 'most_likes') setReqEndpoint(`${serverPath}/api/posts?like=true&level=${pageLevel}`)
    if (category === 'new_pics') setReqEndpoint(`${serverPath}/api/posts?date=true&level=${pageLevel}`)
    if (category === 'favorites') setReqEndpoint(`${serverPath}/api/posts?date=true&bookmark=${userId}&level=${pageLevel}`)
  }, [])

  const io = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      // 바닥치면 요청 보내서 새로 저장해야함.
      console.log('seeit!')
    }
  }, { root: null, threshold: 1 })

  if (viewmore.current) {
    io.observe(viewmore.current)
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      if (reqEndpoint) {
        try {
          console.log(reqEndpoint)
          const res = await axios.get(reqEndpoint)
          if (res.status === 200) {
            setPostsData(res.data.posts)
            setIsLoading(false)
          }
        }
        catch (err) {
          // 서버와 연결할 수 없습니다 이런거 띄워주면 좋을 듯
          // console.log(err)
        }
      }
    })()
  }, [])

  const SuggestionMsg = () => {
    // 로그인 되어있지 않은 경우
    if (category === "favorites" || category === "my_pics") {
      if (!loginToken && !userId) {
        return (
          <SuggetionContainer>
            <div className="msg">
              <p>로그인이 필요합니다!</p>
              <p>로그인 또는 회원가입하여 서비스를 이용해보세요.</p>
            </div>
            <Btn action={() => setOpenLoginModal(true)}>로그인하기</Btn>
          </SuggetionContainer>
        )
      }
    }

    // 로그인이 되어있는 경우
    if (!postsData.length && category === "favorites") {
      return (
        <SuggetionContainer>
          <div className="msg">
            <p>아직 즐겨찾는 게시글이 없습니다.</p>
            <p>좋아요를 눌러 게시글을 추가해보세요!</p>
          </div>
          <Btn action={() => navigate('/new_pics')}>마음에 드는 게시글 찾으러 가기</Btn>
        </SuggetionContainer>
      )
    }
    if (!postsData.length && category === "my_pics") {
      return (
        <SuggetionContainer>
          <div className="msg">
            <p>아직 사진이 없습니다.</p>
            <p>역사적인 첫 사진을 업로드해보세요!</p>
          </div>
          <Btn action={() => navigate('/add_post')}>업로드하러 가기</Btn>
        </SuggetionContainer>
      )
    }
    return null
  }

  const modalHandler = (modal) => {
    if (modal === "login") {
      openLoginModal ? setOpenLoginModal(false) : setOpenLoginModal(true);
      console.log("로그인 모달 오픈");
    }
    if (modal === "signup") {
      openSignupModal ? setOpenSignupModal(false) : setOpenSignupModal(true);
      console.log("회원가입 모달 오픈");
    }
  }

  return (
    <Container>
      {openLoginModal ? <Login closeFn={() => modalHandler("login")} setOpenLoginModal={setOpenLoginModal} setOpenSignupModal={setOpenSignupModal} /> : null}
      {openSignupModal ? <Signup closeFn={() => modalHandler('signup')} /> : null}
      <InnerContainer>
        <ThumbnailContainer>
          {
            postsData
              ? postsData.map((post, idx) => {
                return <PostThumbnail key={idx} data={post} idx={idx} action={() => navigate(`/posts/${post._id}`)} />
              })
              : null
          }
          <SuggestionMsg />
        </ThumbnailContainer>
        {userId && postsData.length
          ? (
            <ViewmoreContainer ref={viewmore}>
              <BsChevronDoubleDown size={'2rem'} />
              <div className="viewmore">더 보기</div>
            </ViewmoreContainer>
          )
          : null}
      </InnerContainer>
    </Container>
  );
};