import styled from 'styled-components';
import { PageTitle } from '../components/pageTitle';


const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  height: max-content;
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
  grid-column: 1/4;
  width: calc(50% - 5px);
  aspect-ratio: 1 / 1;
  background-color: #ddd;
`

const KakaoMap = styled.div`
  width: calc(50% - 5px);
  aspect-ratio: 1 / 1;
  background-color: #aaa;
`


export const AddPost = () => {
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
          <KakaoMap />
          </BoxContianer>

        <div style={{ height : '1200px'}}> </div>
      </InnerContainer>
      
    </Container >
  );
};
