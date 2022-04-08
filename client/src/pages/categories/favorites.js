import styled from 'styled-components';

import { PageTitle } from '../../components/pageTitle';
import { AddPostFloatBtn } from "../../components/addPostFloatBtn";

import { PostContainer } from "../../components/postContainer";
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
export const Favorites = ({ category }) => {

  const [reqEndpoint, setReqEndpoint] = useState('')

  const serverPath = process.env.REACT_APP_SERVER_PATH
  const userId = window.sessionStorage.getItem('userId')

  useEffect(() => {
    // 카테고리 props 가 변경되는 것을 감지하고, 그에 필요한 엔드포인트를 상태에 저장한다.
    setReqEndpoint(`${serverPath}/api/posts?date=true&bookmark=${userId}`)
  }, [])

  return (
    <Container>
      <InnerContainer>
        {userId && <AddPostFloatBtn />}
        <PageTitle>즐겨찾는 사진</PageTitle>
        <PostContainer category={'favorites'} reqEndpoint={reqEndpoint} />
      </InnerContainer>
    </Container >
  );
};
