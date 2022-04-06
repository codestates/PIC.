import { useState } from 'react';
import styled from 'styled-components';

import { PageTitle } from '../components/pageTitle';
import { Tag } from '../components/tagComponent';
import { PostContainer } from "../components/postContainer";

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


export const TagSearch = () => {
  const serverPath = process.env.REACT_APP_SERVER_PATH;

  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);

  const addTag = () => {
    setTags(
      [...tags, inputValue]
    )
  }

  const removeTag = (value) => {
    setTags(
      tags.filter((el) => {
        return el !== value
      })
    )
  }

  const reqEndpoint = (
    tags.length
      ? `${serverPath}/api/posts?date=true&hashtags=${tags}`
      : `${serverPath}/api/posts?date=true&hashtags=${['tagnotexist1234']}`
  )

  return (
    <Container>
      <InnerContainer>
        <PageTitle>태그 검색</PageTitle>
        <input type='text' onChange={(e) => { setInputValue(e.target.value) }} />
        <button onClick={addTag}>태그검색</button>
        {
          tags
            ? (tags.map((el, idx) => {
              return <Tag usage={'added'} removeFn={removeTag} key={idx}>{el}</Tag>
            }))
            : null
        }
        <PostContainer reqEndpoint={reqEndpoint} />
      </InnerContainer>
    </Container>
  )
}
