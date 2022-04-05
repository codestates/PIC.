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
  top: 100px;

  z-index: -1;

  display: flex;
  justify-content: center;
  
  width: 100%;
  height: 100px;

  color: #888;

  .viewmore {
    position: relative;

    top: 50%;
    text-align: center;
    font-size: 1rem;
    svg {
      margin-bottom: 10px;
    }
  }
`

export const PostContainer = ({ category }) => {

  const serverPath = process.env.REACT_APP_SERVER_PATH
  const loginToken = window.localStorage.getItem('loginToken')
  const userId = window.localStorage.getItem('userId')

  const navigate = useNavigate()

  const [reqEndpoint, setReqEndpoint] = useState('')

  const [postsData, setPostsData] = useState([])
  const [pageLevel, setPageLevel] = useState(1);
  const [prevData, setPrevData] = useState([])
  const [newData, setNewData] = useState([])

  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openSignupModal, setOpenSignupModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false)

  const viewmore = useRef()


  useEffect(() => {
    // 카테고리 props 가 변경되는 것을 감지하고, 그에 필요한 엔드포인트를 상태에 저장한다.
    if (category === 'my_pics') setReqEndpoint(`${serverPath}/api/posts?date=true&mypost=${userId}`)
    if (category === 'most_likes') setReqEndpoint(`${serverPath}/api/posts?like=true`)
    if (category === 'new_pics') setReqEndpoint(`${serverPath}/api/posts?date=true`)
    if (category === 'favorites') setReqEndpoint(`${serverPath}/api/posts?date=true&bookmark=${userId}`)
  }, [category])


  // 교차 감시 선언
  const io = new IntersectionObserver((entries, observer) => {
    if (isLoading) return
    // 데이터 로딩 중에는 실행안한다.
    if (entries[0].isIntersecting) {
      // 감시하는 요소가 조건에 따라 보여지면 아래의 함수를 실행한다.
      setIsLoading(true)

      if (prevData.length === 12 && !isLoading) {
        // 새로운 데이터가 12개인 경우 -> 불러올 데이터가 있을 수 있으니 +1
        setPageLevel(pageLevel + 1)
      }

      if (prevData.length === 0) return
      // 새로운 데이터가 없는 경우, 
      // 레벨을 추가 하지 않는다.
      // 명시적으로 작성.
    }
  }, { root: null, threshold: 1 })

  if (viewmore.current) {
    io.observe(viewmore.current)
  }

  // 엔드포인트의 변경, 즉 카테고리를 이동한 경우의 게시글 데이터를 설정한다.
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      setPostsData([])
      // 데이터 초기화
      setPageLevel(1)
      // 페이지 레벨 초기화
      if (reqEndpoint) {
        try {
          const res = await axios.get(`${reqEndpoint}&level=${pageLevel}`)
          if (res.status === 200) {
            setPostsData(res.data.posts)
            setPrevData(
              res.data.posts.map((post) => {
                return post._id
              })
            )
            setIsLoading(false)
          }
        }
        catch (err) {
          // console.log(err)
        }
      }
    })()
  }, [reqEndpoint])

  // 페이지 레벨이 변경되는 경우 기존 데이터에 새로운 데이터를 추가한다.
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      if (reqEndpoint) {
        try {
          const res = await axios.get(`${reqEndpoint}&level=${pageLevel}`)
          if (res.status === 200) {
            setPostsData([...postsData, ...res.data.posts])
            // 카테고리 이동과는 다르게, 
            setPrevData(
              res.data.posts.map((post) => {
                return post._id
              })
            )
            setIsLoading(false)
          }
        }
        catch (err) {
          // console.log(err)
        }
      }
    })()
  }, [pageLevel])

  console.log(prevData)

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
        {postsData.length > 11
          ? (
            <ViewmoreContainer ref={viewmore}>
              <div className="viewmore">
                <BsChevronDoubleDown size={'2rem'} />
                <div>더 보기</div>
              </div>
            </ViewmoreContainer>
          )
          : null}
      </InnerContainer>
    </Container>
  );
};