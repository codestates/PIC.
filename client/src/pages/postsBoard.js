import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";

import { PageTitle } from '../components/pageTitle';
import { LoadingIndicator } from "../components/loadingIndicator";
import { PostThumbnail } from "../components/postThumbnail";
import { BtnComponent as Btn } from "../components/BtnComponent";
import { AddPostFloatBtn } from "../components/addPostFloatBtn";

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  height: max-content;
`

const InnerContainer = styled.div`
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

export const PostsBoard = ({ category }) => {
  const serverPath = process.env.REACT_APP_SERVER_PATH
  const loginToken = window.localStorage.getItem('loginToken')
  const userId = window.localStorage.getItem('userId')

  const navigate = useNavigate()

  const [postsData, setPostsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // 내 사진이나 즐겨찾기는 로그인 안되있으면 안내페이지로 보내버리기

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      if (category === "my_pics") {
        if (!loginToken) navigate('/main')
        else {
          try {
            const res = await axios.get(`${serverPath}/api/posts?date=true`)
            if (res.status === 200) {
              setPostsData(
                res.data.posts.filter((post) => {
                  return post.author === userId
                })
              )
              setIsLoading(false)
            }
          }
          catch (err) {
            // 서버와 연결할 수 없습니다 이런거 띄워주면 좋을 듯
          }
        }
      }
      if (category === "most_likes") {
        try {
          const res = await axios.get(`${serverPath}/api/posts?like=true`)
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
          const res = await axios.get(`${serverPath}/api/posts?date=true`)
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
        if (!window.localStorage.getItem('loginToken')) navigate('/main')
        else {
          try {
            const res = await axios.get(`${serverPath}/api/posts?date=true`)
            if (res.status === 200) {
              setPostsData(
                res.data.posts.filter((post) => {
                  return post.likes.includes(userId)
                })
              )
              setIsLoading(false)
            }
          }
          catch (err) {
            // err
          }
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

  return (
    <Container>
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
      </InnerContainer>
    </Container>
  );
};
