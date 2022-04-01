import axios from 'axios';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BtnComponent as Btn } from '../components/BtnComponent';
import { LinkTag } from '../components/linkTag';
import { LoadingIndicator } from '../components/loadingIndicator';
import { OneBtnModal } from '../components/oneBtnModal';
import { PageTitle } from '../components/pageTitle';
import { TwoBtnModal } from '../components/twoBtnModal';
import { BsPencilSquare } from "react-icons/bs";
import { CommentContainer } from '../components/commentContainer';

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  height: max-content;

  section{
    margin-bottom: 20px;
  }

  .wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  .category {
    font-size : 1.5rem;
    margin-bottom: 10px;
  }
`

const InnerContainer = styled.div`
  position: relative;
  grid-column: 3 / 11;
  height: max-content;
`

const TagContainer = styled.section`
  position: relative;

  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 10px;
  
  width: 100%;
  min-height: 50px;
  height: max-content;
`

const ModifyBtn = styled.div`
  position: absolute;
  right: 0;
  top : -31px;

  display: flex;
  align-items: center;
  
  width: max-content;
  height: 30px;

  transition : 0.1s;

  cursor: pointer;

  font-size: 0.9rem;
  color: #777;

  span {
    position: relative;
    top: 1px;
    margin-right : 6px;
  }

  &:hover {
    transform: translateY(-2px);
    color: #000;
  }
`

const ImgContainer = styled.section`
  display: grid;
  place-items: center;

  width: 100%;
  aspect-ratio: 4 / 3;

  background: ${props => `url(${props.img})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  box-shadow: 0px 3px 5px rgba(0,0,0,0.3);

  border-radius: 10px;
`

const MapContainer = styled.section`
  width: 100%;
  aspect-ratio: 3 / 1;

  box-shadow: 0px 3px 5px rgba(0,0,0,0.3);

  border-radius: 10px;
`

const DescContainer = styled.section`
  width: 100%;
  min-height: 300px;
  max-height: 500px;

  box-sizing: border-box;
  padding: 10px;

  font-family: sans-serif;
  font-size: 1.1rem;

  border: 1px solid #aaa;
  border-radius: 3px;
`

// const CommentContainer = styled.section`
//   width: 100%;
//   min-height: 300px;
//   max-height: 500px;
// `

export const PostDetails = () => {
  const kakao = window.kakao


  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const loginToken = window.localStorage.getItem('loginToken')
  const userId = window.localStorage.getItem('userId')

  const [postData, setPostData] = useState({})
  const [coords, setCoords] = useState([])
  const [tags, setTags] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openDoneModal, setOpenDoneModal] = useState(false)

  const params = useParams()
  const navigate = useNavigate()
  const kakaoMap = useRef()

  window.scrollTo(0, 0)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`${serverPath}/api/posts/${params.id}`)
        const post = res.data.post

        setPostData(post)
        setCoords(post.location)
        setTags(
          [...post.hashtags.keywords, ...post.hashtags.myTags]
            .sort((a, b) => a < b ? - 1 : (a === b) ? 0 : 1)
        )
      } catch (err) {
        //err
      }
      setIsLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(coords.latitude, coords.longitude)
      })

      const staticMapContainer = kakaoMap.current, // 이미지 지도를 표시할 div  
        staticMapOption = {
          center: new kakao.maps.LatLng(coords.latitude, coords.longitude), // 이미지 지도의 중심좌표
          level: 5, // 이미지 지도의 확대 레벨,
        };

      const map = new kakao.maps.Map(staticMapContainer, staticMapOption);
      map.setDraggable(false);
      map.setZoomable(false);

      marker.setMap(map)
    }
  }, [coords])

  const { _id, title, description, photo, nickname } = postData

  const deletePost = async () => {
    try {
      const res = await axios.delete(`${serverPath}/api/posts/${params.id}`, {
        headers: {
          Authorization: loginToken
        }
      })
      if (res.status === 200) {
        setOpenDoneModal(true)
      }
    }
    catch (err) {
      // err
    }
  }

  // 파라미터 이용
  // 데이터 가져오기
  // 뿌리기
  // 태그 -> 가나다 순, 두 태그 합쳐서
  // 사진
  // 지도
  // -> 눌러서 웹에서 보기, 움직이지 않는 지도여야함.
  // 만약 내아이디와 동일?
  // 수정 버튼 렌더
  // 좋아요 토글
  // 댓글 컴포넌트 추가
  // 삭제버튼 -> 모달

  const navigateToModify = () => {
    navigate('modify')
  }

  const modalHandler = (modal) => {
    if (modal === "delete") {
      openDeleteModal ? setOpenDeleteModal(false) : setOpenDeleteModal(true);
    }
    if (modal === "done") {
      openDoneModal ? setOpenDoneModal(false) : setOpenDoneModal(true);
    }
  }
  console.log(postData.nickname)
  return (
    <Container>
      {openDeleteModal ? <TwoBtnModal main={'정말로 게시글을 삭제하시겠습니까?'} close={() => modalHandler('delete')} action={deletePost} /> : null}
      {openDoneModal ? <OneBtnModal main={'게시글이 삭제되었습니다.'} close={() => modalHandler('done')} nav={'/my_pics'} /> : null}
      <InnerContainer>
        <PageTitle author={postData.nickname}>{title}</PageTitle>
        {
          postData.author === userId
            ? (<ModifyBtn onClick={navigateToModify}>
              <span>게시글 수정하기</span>
              <BsPencilSquare />
            </ModifyBtn>)
            : null
        }
        <div className='wrapper'>
          <TagContainer>
            {tags.map((tag, idx) => <LinkTag key={idx} isActive={true}>{tag}</LinkTag>)}
          </TagContainer>
        </div>
        <ImgContainer img={photo}>
          {isLoading ? <LoadingIndicator size={'7rem'} /> : null}
        </ImgContainer>
        <h3 className='category'>장소</h3>
        <MapContainer ref={kakaoMap} />
        <h3 className='category'>사진 설명</h3>
        <DescContainer>
          <pre>{description}</pre>
        </DescContainer>
        {/* <CommentForm /> */}
        {
          postData.author === userId
            ? <Btn width={'100%'} color={'#ddd'} hover={'#FF796B'} action={() => modalHandler('delete')}>게시글 삭제하기</Btn>
            : null
        }
      </InnerContainer>
      <CommentContainer />
    </Container>
  );
};
