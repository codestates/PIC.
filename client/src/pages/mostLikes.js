import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";

import { PageTitle } from '../components/pageTitle';
import { LoadingIndicator } from "../components/loadingIndicator";
import { PostThumbnail } from "../components/postThumbnail";
import { BtnComponent as Btn } from "../components/BtnComponent";
import { AddPostFloatBtn } from "../components/addPostFloatBtn";

import { Login } from "../modals/login";
import { Signup } from "../modals/signup";
import { useRef } from "react";

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  height: max-content;
`

const InnerContainer = styled.div`
  position: relative;
  grid-column: 2 / 12;
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

const LoadingContainer = styled.section`
  grid-column: 1/ -1;
  height : 500px;

  display: grid;
  place-items: center;
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

  display: grid;
  place-items: center;
  
  width: 100%;
  height: 300px;

  .viewmore {
    position: absolute;
    bottom : 0px;
  }
`

export const MostLikes = ({ category }) => {
  const serverPath = process.env.REACT_APP_SERVER_PATH
  const loginToken = window.localStorage.getItem('loginToken')
  const userId = window.localStorage.getItem('userId')

  const navigate = useNavigate()

  const [postsData, setPostsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openSignupModal, setOpenSignupModal] = useState(false);

  const [pageLevel, setPageLevel] = useState(1);


  const viewmore = useRef()

  // 내 사진이나 즐겨찾기는 로그인 안되있으면 안내페이지로 보내버리기
  const io = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      console.log('보인다')
        // 바닥치면 요청 보내서 새로 저장해야함.

        // 바닥에 도달하면 조건에 따라 레벨 + 1
        // 응답이 0이면 숫자 추가 안함.
        // 1~11개 라면 추가 안하고, 다시 요청을 보냈을때 중복을 제외한 데이터 저장
        // 12개라면 +1

        // 페이지 이동시마다 해당 level은 초기화되어야함.

        (async () => {
          axios.get(`${serverPath}`)
        })()
    }
  }, { root: null, threshold: 1 })

  if (viewmore.current) {
    io.observe(viewmore.current)
  }


  useEffect(() => {
    (async () => {
      setIsLoading(true)
      if (category === "my_pics") {
        try {
          const res = await axios.get(`${serverPath}/api/posts?date=true&mypost=${userId}&level=${pageLevel}`)
          if (res.status === 200) {
            setPostsData(res.data.posts)
            setIsLoading(false)
          }
        }
        catch (err) {
          // 서버와 연결할 수 없습니다 이런거 띄워주면 좋을 듯
        }
      }
      if (category === "most_likes") {
        try {
          const res = await axios.get(`${serverPath}/api/posts?like=true&level=${pageLevel}`)
          if (res.status === 200) {
            setPostsData(res.data.posts)
            setIsLoading(false)
          }
        }
        catch (err) {
          // err
        }
      }
      if (category === "new_pics") {
        try {
          const res = await axios.get(`${serverPath}/api/posts?date=true&level=${pageLevel}`)
          if (res.status === 200) {
            setPostsData(res.data.posts)
            setIsLoading(false)
          }
        }
        catch (err) {
          // err
        }
      }
      if (category === "favorites") {
        try {
          const res = await axios.get(`${serverPath}/api/posts?date=true&mypost=${userId}&level=${pageLevel}`)
          if (res.status === 200) {
            setPostsData(res.data.posts)
            setIsLoading(false)
          }
        }
        catch (err) {
          // err
        }
      }
    })()
  }, [category])

  const TitleRender = () => {
    if (category === "my_pics") {
      return "나의 사진"
    }
    if (category === "most_likes") {
      return "좋아요 많은 순"
    }
    if (category === "new_pics") {
      return "새로 올라온 사진"
    }
    if (category === "favorites") {
      return "내가 좋아요한 사진"
    }
  }

  const SuggestionMsg = () => {
    // 로그인 되어있지 않은 경우
    if (category === "favorites" && !loginToken && !userId) {
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
    if (category === "my_pics" && !loginToken && !userId) {
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
        <AddPostFloatBtn />
        <PageTitle>
          <TitleRender />
        </PageTitle>
        {
          isLoading
            ? (
              <LoadingContainer>
                <LoadingIndicator size={'7rem'} />
              </LoadingContainer>
            )
            : (
              <ThumbnailContainer>
                {postsData.map((post, idx) => {
                  return <PostThumbnail key={idx} data={post} idx={idx} action={() => navigate(`/posts/${post._id}`)} />
                })}
                <SuggestionMsg />
              </ThumbnailContainer>
            )
        }
        <ViewmoreContainer ref={viewmore}>
          <div className="viewmore" >더 보기</div>
        </ViewmoreContainer>
      </InnerContainer>
    </Container >
  );
};
