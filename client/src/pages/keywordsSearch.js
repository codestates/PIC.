import { useState } from 'react';
import styled from 'styled-components';

import { PageTitle } from '../components/pageTitle';
import { TagSelection } from '../components/tagSelection';
import { PostContainer } from '../components/postContainer';


const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  height: max-content;

  section{
    margin-bottom: 20px;
  }

  .category {
    font-size : 1.5rem;
    margin-bottom: 10px;
  }

  input,
  textarea {
    border-radius: 3px;
    border : 1px solid #aaa;
  }
`
const InnerContainer = styled.div`
  grid-column: 3 / 11;
  margin-top: 200px;
  margin-bottom: 300px;
  height: max-content;
`
const TagContainer = styled.section`
`


export const KeywordsSearch = () => {
  const serverPath = process.env.REACT_APP_SERVER_PATH;

  const [selectTags, setSelectTags] = useState([])

  const reqEndpoint = (
    selectTags.keywords
      ? (selectTags.keywords.length
        ? `${serverPath}/api/posts?date=true&hashtags=${selectTags.keywords}`
        : `${serverPath}/api/posts?date=true&hashtags=${['tagnotexist1234']}`
      )
      : null
  )

  return (
    <Container>
      <InnerContainer>
        <PageTitle>키워드 검색</PageTitle>
        <TagContainer>
          <h3 className='category'>태그</h3>
          <TagSelection setTags={setSelectTags} hideMyTags={true} />
        </TagContainer>
        <PostContainer reqEndpoint={reqEndpoint} />
      </InnerContainer>
    </Container>
  )
}