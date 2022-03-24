import axios from 'axios';
import { useRef } from 'react';
import styled from 'styled-components';
import { PageTitle } from '../components/pageTitle';


const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  height: max-content;

  div{
    margin-bottom: 20px;
  }

  h3 {
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
  margin-bottom: 100px;
  height: max-content;
`

const BoxContianer = styled.div`
  display: flex;
  justify-content: space-between;
`

const UploadImage = styled.div`
  width: calc(50% - 5px);
  aspect-ratio: 1 / 1;
  background-color: #ddd;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.3);

  border-radius: 10px;

`

const KakaoMapContainer = styled.div`
  width: calc(50% - 5px);
  aspect-ratio: 1 / 1;
  background-color: #aaa;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.3);

  border-radius: 10px;
`

const TitleContainer = styled.div`
  input {
    width: 100%;
    height: 30px;
    padding-left: 10px;
    font-size: 1.2rem;
  }
`

const TagContainer = styled.div`

`

const DescContainer = styled.div`
  textarea {
    width: 100%;
    min-height: 300px;
    box-sizing: border-box;
    padding: 10px;

    font-family: sans-serif;
    font-size: 1.2rem;

    resize: none;
    overflow: hidden
    // 히든을 줌으로써 스크롤을 없앰 -> 크기에 맞게 늘어나니 스크롤은 보이지 않지만, 내용은 다 보인다.

  }
`

export const AddPost = () => {

  const kakaoMap = useRef()
  const descArea = useRef()

  const autoResizing = () => {
    const textarea = descArea.current
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
    console.log(textarea.scrollHeight)
  }

  // 사진을 업로드 할 수 있어야함 -> 내 정보 수정 페이지 참고
  // 지도를 함께 표시하고 검색 할 수 있어야함
  // -> 주소검색, 지도 크게 보기
  // 제공된 태그를 렌더링하고, 해당 태그를 클릭했을때 태그 배열에 저장되어야함.
  // 나의태그를 이용하여 추가된 태그도 태그 배열에 저장되어야 함.
  // 추가된 태그를 지울 수 있어야함.

  // 필요 필드 제목, 사진 설명(기본 크기 유지, 길어지면 늘어나게.)
  // 업로드 버튼 누를 시 post 요청
  return (
    <Container>
      <InnerContainer>
        <PageTitle class>게시글 작성</PageTitle>
        <BoxContianer>
          <UploadImage />
          <KakaoMapContainer ref={kakaoMap} />
        </BoxContianer>
        <TitleContainer>
          <h3>사진 이름</h3>
          <input type="text" />
        </TitleContainer>
        <TagContainer>
          <h3>태그</h3>
          <div>컴포넌트가 들어가야햇...</div>
        </TagContainer>
        <DescContainer>
          <h3>사진 설명</h3>
          <textarea ref={descArea} onKeyUp={autoResizing} onKeyDown={autoResizing}></textarea>
        </DescContainer>
        {/* 여기에 버튼 들어가기 */}
        <div style={{ height: '1200px' }} > </div>
      </InnerContainer>

    </Container >
  );
};
