import { useState } from 'react';
import styled from 'styled-components';

import { PageTitle } from '../components/pageTitle';
import { TagSelection } from '../components/tagSelection';
import { PostContainer } from '../components/postContainer';

import { FiSearch } from "react-icons/fi";


const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  min-height: 800px;
  height: max-content;

  .category {
    font-size : 1.5rem;
    margin-bottom: 10px;
  }
`

const InnerContainer = styled.div`
  position: relative;
  grid-column: 2 / 12;
  height: max-content;

  `
const TagContainer = styled.section`
  margin-bottom: 40px;
`

const ResultContainer = styled.section`

`
const Hline = styled.div`
  margin-bottom : 23px;
  margin-top : 23px;

  width: 100%;
  height: 1px;

  background-color: #ddd;
`

const Notification = styled.section`
  display: grid;
  place-items: center;

  width: 100%;  
  height: 400px;

  color: #aaa;

  .msg {
    text-align: center;
  }

  svg {
    margin-bottom: 30px;
  }

  .msg p {
    font-size: 0.9rem;

    &:nth-child(2){
      font-size: 1.2rem;
      margin-bottom: 15px;
    }
  }
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
          {/* <h3 className='category'>태그</h3> */}
          <Hline />
          <TagSelection setTags={setSelectTags} hideMyTags={true} />
        </TagContainer>
        <ResultContainer>
          {/* <h3 className='category'>검색결과</h3> */}
          <Hline />
        <PostContainer reqEndpoint={reqEndpoint} />
        </ResultContainer>
        {
          selectTags.length
            ? null
            : (
              <Notification>
                <div className='msg'>
                  <FiSearch size={'3rem'} />
                  <p>검색된 결과가 없습니다</p>
                  <p>키워드를 선택하지 않았거나, 해당하는 사진이 없습니다.</p>
                </div>
              </Notification>
            )
        }
      </InnerContainer>
    </Container>
  )
}