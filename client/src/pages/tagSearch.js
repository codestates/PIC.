import { useState } from 'react';
import styled from 'styled-components';

import { PageTitle } from '../components/pageTitle';
import { Tag } from '../components/tagComponent';
import { PostContainer } from "../components/postContainer";

import { FiSearch, FiCornerDownLeft } from "react-icons/fi";

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

const SearchContainer = styled.section`

  .wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .search_bar {
    position: relative;
    display: flex;
    justify-content: center;

    width: 55%;
    margin-bottom: 20px;

    input {
      width: 100%;
      height: 40px;
      
      box-sizing: border-box;
      padding-left: 40px;
      padding-right: 50px; 

      background-color: #FFF2AE;
      box-shadow: 0px 2px 3px rgba(0,0,0,0.2);

      border-radius: 20px;
      border: none;
      
      font-size: 1rem;

      &:focus {
        outline: none;
        }
      }
    }

    .btn,
    .search_icon {
      position: absolute;
      display: grid;
      place-items: center;
    }

    .search_icon {
      width: 40px;
      height: 40px;

      left: 0;

      color : #888;
    }

    .btn {
      right: -1px;

      width: 40px;
      height: 40px;

      box-shadow: 0px 2px 3px rgba(0,0,0,0.1);
      
      background-color: #fff;

      border-radius: 50%;

      transition: 0.2s;

      cursor: pointer;

      &:hover {
        box-shadow: 0px 2px 3px rgba(0,0,0,0.3);
        background-color: #ffd600;
      }
    }

  .tags {
    position: relative;

    display: flex;
    flex-wrap: wrap;
    min-height: 40px;

    column-gap: 8px;
    row-gap: 10px;
  }

  .tag_none {
    position: absolute;
    top: 8px;
    width: 160px;

    color: #888;
  }
`

const Hline = styled.div`
  margin-bottom : 23px;
  margin-top : 23px;

  width: 100%;
  height: 1px;

  background-color: #ddd;
`

const ResultContainer = styled.section`

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
        <SearchContainer>
          <div className="wrapper">
            <div className='search_bar'>
              <input spellCheck={false} type='text' placeholder='찾으시는 태그를 입력하세요.' onChange={(e) => { setInputValue(e.target.value) }} />
              <div className="search_icon">
                <FiSearch size={'1.5rem'}/>
              </div>
              <div className='btn' onClick={addTag}>
                <FiCornerDownLeft size={'1.5rem'}/>
              </div>
            </div>
          </div>
          <div className="tags">
            {tags.length
              ? (
                tags.map((el, idx) => {
                  return <Tag usage={'added'} removeFn={removeTag} key={idx}>{el}</Tag>
                })
              )
              : <p className='tag_none'>추가된 태그가 없습니다.</p>
            }
          </div>
        </SearchContainer>

        <ResultContainer>
          
          <Hline />
          <PostContainer reqEndpoint={reqEndpoint} />
        </ResultContainer>
        {
          tags.length
            ? null
            : (
              <Notification>
                <div className='msg'>
                <FiSearch size={'3rem'} />
                  <p>검색된 결과가 없습니다</p>
                  <p>태그를 추가하지 않았거나, 해당하는 사진이 없습니다.</p>
                </div>
              </Notification>
            )
        }
      </InnerContainer>
    </Container>
  )
}
