import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { PageTitle } from '../components/pageTitle';
// import { Tag } from '../components/tagSelection';


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
const TitleContainer = styled.section`
  input {
    width: 30%;
    height: 35px;
   
    box-sizing: border-box;

    padding-left: 10px;
    font-size: 1.2rem;
  }
`
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap : 12px 10px;
  width: 100%;

  height: max-content;
  margin-left: 5px;

  transition : 0.3s;
`
export const TagSearch = () => {
  //! -------------------------------------- 1. 상태선언 ------------------------------------
  const serverPath = process.env.REACT_APP_SERVER_PATH

  const [hashtag, setHashtag] = useState([]);
  // onChange로 관리할 문자열
  const [hashArr, setHashArr] = useState([]);
  // 해시태그를 담을 배열

  const [tags, setTags] = useState([]);

  // 태그를 삭제하는 메소드 구현
  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  // 새로운 태그를 추가하는 메소드
  const addTags = (event) => {
    // 이미 있는 태그라면 추가하지 않기 : filter 메소드로 판별
    // 아무것도 입력하지 않은 채 Enter 키 입력시 메소드 실행하지 않기

    const filtered = tags.filter((el) => el === event.target.value);
    if (event.target.value !== '' && filtered.length === 0) {
      setTags([...tags, event.target.value]);     // spread 문법 사용

      // 태그가 추가되면 input 창 비우기
      event.target.value = '';
    }
    // console.log(tags, "뭐냐")
    // console.log(event, "뭐냐")
  };

  const clickClick = () => {

  };

  const onCreateHashtagAdd = (e) => {
    setHashArr(hashArr => [...hashArr, hashtag]);
    setHashtag('');
    console.log(e)
  };

  const HandleSubmit = () => {
    if (hashtag.length < 1) {
      alert("최소 1글자 이상 입력해주세요.")
      return
    }
    alert("저장 성공!");
    console.log(tags, "누구야")
    // 리턴 다음의 값을 알게다 싶으면 
  };


  return (
    <Container>
      <InnerContainer>
        <PageTitle>태그 검색</PageTitle>
        <TitleContainer>
          <input
            type="text"
            value={hashtag}
            onChange={(e) => { setHashtag(e.target.value) }}
            placeholder="검색할 태그를 적어주세요."
            onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
          />
          <button>검색</button>
        </TitleContainer>
        <TagContainer>

          {tags.map((tag, index) => (
            <li key={index} className='tag'>
              <span className='tag-title'>{tag}</span>
              <span className='tag-close-icon' onClick={() => removeTags(index)}>
                &times;
              </span>
            </li>
          ))}

        </TagContainer>
      </InnerContainer>
    </Container >
  );
};