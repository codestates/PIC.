import styled from 'styled-components';

import { PageTitle } from '../components/pageTitle';
import { AddPostFloatBtn } from "../components/addPostFloatBtn";

import { PostContainer } from "../components/postContainer";
import { useState } from 'react';
import { useEffect } from 'react';

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
export const PostsBoard = ({ category }) => {

  const [reqEndpoint, setReqEndpoint] = useState('')

  const serverPath = process.env.REACT_APP_SERVER_PATH
  const userId = window.localStorage.getItem('userId')

  useEffect(() => {
    // 카테고리 props 가 변경되는 것을 감지하고, 그에 필요한 엔드포인트를 상태에 저장한다.
    if (category === 'my_pics') setReqEndpoint(`${serverPath}/api/posts?date=true&mypost=${userId}`)
    if (category === 'most_likes') setReqEndpoint(`${serverPath}/api/posts?like=true`)
    if (category === 'new_pics') setReqEndpoint(`${serverPath}/api/posts?date=true`)
    if (category === 'favorites') setReqEndpoint(`${serverPath}/api/posts?date=true&bookmark=${userId}`)

    if (category === 'tag_search' && tags.length) {
      setReqEndpoint(`${serverPath}/api/posts?date=true&hashtags=${tags}`)
    } else if (category === 'tag_search' && !tags.length) {
      setReqEndpoint(`${serverPath}/api/posts?date=true&hashtags=${['존재하지않는태그12341234']}`)
    }
    
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

  return (
    <Container>
      <InnerContainer>
        <AddPostFloatBtn />
        <PageTitle>
          <TitleRender />
        </PageTitle>
        <PostContainer category={category} reqEndpoint={reqEndpoint}/>
      </InnerContainer>
    </Container >
  );
};
