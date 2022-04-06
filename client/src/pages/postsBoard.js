import styled from 'styled-components';

import { PageTitle } from '../components/pageTitle';
import { AddPostFloatBtn } from "../components/addPostFloatBtn";

import { PostContainer } from "../components/postContainer";

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
        <PostContainer category={category} />
      </InnerContainer>
    </Container >
  );
};
