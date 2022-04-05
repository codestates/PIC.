import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PageTitle } from '../components/pageTitle';
import { TagSelection } from '../components/tagSelection';
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
const TagContainer = styled.section`
`


export const KeywordsSearch = () => {
  const serverPath = process.env.REACT_APP_SERVER_PATH;

  const [selectTags, setSelectTags] = useState([])
  // 선택한 태그를 담는 상태함수
  const [postData, setPostData] = useState([])
  // 요청을 보냈을 때 값이 맞는 값 담아서 가져오기 위한 상태함수

  const navigate = useNavigate()
  // 썸네일 클릭시 이동하기 위해 만든 훅
  
  //! 1. ---------------------------------- 필요한 함수 ----------------------------------
  const sendReq = async () => {
    try {
      const res = await axios.get(`${serverPath}/api/posts?date=true&hashtags=${selectTags.keywords}&level=1`)
      if (res.status === 200) {
        setPostData(res.data.posts)
      } 
    } catch (err) {

    }
  }

  // 랜더링시 실행 , tags 가 추가 될 때 마다 실행
  useEffect(() => {
    if(selectTags.keywords){
      if (selectTags.keywords.length) {
        // tags 빈 배열이 아닐 때 요청 보내기 === 클릭이 하나라도 될 때 (값이 최소 1개 이상일 때) 
        sendReq()
      }
      else {
        setPostData([]);
      }
    }
  }, [selectTags])


  const goDetails = (value) => {
    navigate(`/posts/${value._id}`)
  }



  return (
    <Container>
      <InnerContainer>
        <PageTitle>키워드 검색</PageTitle>
        <TagContainer>
          <h3 className='category'>태그</h3>
          <TagSelection setTags={setSelectTags} />
        </TagContainer>
        {postData ? postData.map((el, idx) => {
          return <PostThumbnail data={el} key={idx} action={() => goDetails(el)} />
          // 작성된 태그를 가지고 get 요청을 해서 해당 값에 맞는 태그가 있으면 가지고 오기
        }) : null}
      </InnerContainer>
    </Container>
  )
}