import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PageTitle } from '../components/pageTitle';
import { Tag } from '../components/tagComponent';
import { PostThumbnail } from '../components/postThumbnail';

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
  // 검색창에 검색되는 태그키워드들을 담는 상태함수 (초기 빈문자열)
  const [tags, setTags] = useState([]);
  // 검색된 태그키워드들 배열에 저장하는 상태함수 (초기 빈배열)
  const [postData, setPostData] = useState([])
  // 추가된 태그키워드와 일치하는 썸네일을 저장하고 값을 가져오기 위한 상태함수 (초기 빈배열_통신에 맞는 태그와 관련된 썸네일 담기)
  const navigate = useNavigate()
  //! 1. ---------------------------------- 입력창에 작성된 태그를 배열에 저장 
  const addTag = () => {
    setTags(
      [...tags, inputValue]
      // setInputValue 로 인해 입력창에 쓰여진 키워드는 inputValue 에 저장이 되고
      // 그 inputValue 를 쓰여지는 족족 나열하며 저장하기 위해 스프레드 문법사용
    )

  }
  // console.log(tags, '저장된 태그') _ onClick 시 addTag 가 실행이 되는데 콘솔을 이용해서 어떤식으로 저장이 되는지 보기 위해서

  // useEffect(() => {
  //   setInputValue 
  // }, [tags])


  //! 2. ---------------------------------- 생성된 태그 조건에 안맞으면 !== -> 삭제 
  const removeTag = (value) => {
    setTags(
      tags.filter((el) => {
        return el !== value
      })
    )
  }

  //! 3. ---------------------------------- 생성된 태그 -> 통신 연결 
  const sendReq = async () => {
    try {
      const res = await axios.get(`${serverPath}/api/posts?date=true&hashtags=${tags}`)

      // [${tags}]
      if (res.status === 200) {
        setPostData(res.data.posts)
        // console.log(res.data.posts, "뭐니?")
      }
    } catch (err) {

    }
  }
  // 랜더링시 실행 , tags 가 추가 될 때 마다 실행
  useEffect(() => {
    if(tags.length){
      sendReq()
    }
    else{
      setPostData([]);
    }
  }, [tags])



  const goDetails = (value) => {
    navigate(`/posts/${value._id}`)
  }

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
              // tagComponent에서 props로 가져와서 사용 , - 버튼 누를 시 삭제는 안되기 때문에 여기서 만들어서 사용
            }))
            : null
        }
        {postData ? postData.map((el, idx) => {
          return <PostThumbnail data={el} key={idx} action={() => goDetails(el)} />
          // 작성된 태그를 가지고 get 요청을 해서 해당 값에 맞는 태그가 있으면 가지고 오기
        }) : null}
      </InnerContainer>
    </Container>
  )
}
