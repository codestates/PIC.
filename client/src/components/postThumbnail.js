import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiLike, BiChat } from "react-icons/bi";
import { BsGeoAltFill } from "react-icons/bs";


const Container = styled.div`
  position: relative;
  width: 220px;
  height: 320px;

  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 3px 3px 10px rgba(0,0,0,0.5);
  
  cursor : pointer;

  transition: 0.2s;
  &:hover{
    transform: translateY(-5px);
    box-shadow: 3px 8px 10px rgba(0,0,0,0.5);
  }

`

const PostImg = styled.div`
  width: 220px;
  height: 220px;
  background: ${props => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  /* background-color: #fff; */
  border-radius: 10px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.2);
  z-index: 1;
`

const PostInfo = styled.div`

  width: 100%;
  height: 100%;
  
  margin: 8px 0 0 8px;
  .title {
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    font-size: 1.2rem;
    font-weight: bold;
  }
  .nickname {
    margin-top: 5px;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .address{
    position: relative;
    top: -2px;
    margin-top: 5px;

    width: 90%;

    color: #888;
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    svg{
      position: relative;
      top: 2px;
    }
  }
  .social-amounts{
    display: flex;
    position : absolute;
    right: 10px;
    bottom : 7px;

    font-size: 0.9rem;
    color: #888;

    div{
      display: inherit;
    }

    .comment{
      margin-left: 8px;
    }

    .amounts{
      position : relative;
      top: 1px;

      margin-left: 3px;
    }
  }
`

const dummy = {
  _id: "<ObjectId1>",
  author: "<ObjectId0>",
  title: "엄청엄청엄청 긴 제목을 가진 사진이다.",
  description: "description1",
  photo: "https://i.ibb.co/hYsxHwX/172d903f28d5.jpg",
  location: {
    latitude: 33.45063772475703,
    longitude: 126.57068303345567,
    roadAdd: "서울특별시 중구 세종대로 110 아무튼 되게 긴주소 보다 더 긴 주소 길고긴 주소",
    // 도로명주소가 null 인 경우 고려해야함.
    lotAdd: "서울 중구 태평로1가 31"
  },
  hashtags: ["seoul", "village", "exciting"],
  likes: ["<ObjectId01>", "<ObjectId02>", "<ObjectId03>"],
  createdAt: "2022-03-04T05:45:13.706Z",
  updatedAt: "2022-03-04T05:45:13.706Z"
}

export const PostThumbnail = () => { // 실 사용시에는 해당 위치에 props 로 게시글의 정보를 받아옴.

  const [nickname, setNickname] = useState('')
  const [comments, setComments] = useState([])

  const serverPath = process.env.REACT_APP_SERVER_PATH

  const { _id, photo, title, author, location, likes } = dummy
  // 여기서 _id 는 게시물 아이디임.

  // 유저 닉네임과 댓글 갯수 가져와야함 
  useEffect(() => {
    const getUserNickname = async () => {
      const userInfo = await axios.get(`${serverPath}/user/${author}`)
      setNickname(userInfo.userInfo.nickname)
      // 사용자 아이디를 path 로 이용하여 요청을 보내고 해당 값을 상태에 저장한다.
    }

    const getComments = async () => {
      const comments = await axios.get(`${serverPath}/comment?id=${_id}`)
      setComments([]) // 여기 값 들어올때 수정해야함 까먹지 말기
      // 게시물 아이디를 쿼리를 이용하여 요청을 보내고 해당 배열의 길이를 상태에 저장한다.
    }
    getUserNickname()
    getComments()
  }, [])

  let presentAdd
  if (location.roadAdd === null) {
    presentAdd = location.lotAdd
  } else {
    presentAdd = location.roadAdd
  }
  // 사진의 위치는 도로명 주소가 있는 경우에 도로명 주소, 아닌 경우 지번 주소 사용
  return (
    <Container>
      <PostImg url={photo} />
      <PostInfo>

        <h3 className='title'>{title}</h3>
        <div className='nickname'>{nickname ? nickname : 'Nickname'}</div>
        <div className='address'>
          <BsGeoAltFill />
          {presentAdd}
        </div>

        <div className='social-amounts'>
          <div className='like'>
            <BiLike />
            <div className='amounts'>{likes.length}</div>
          </div>
          <div className='comment'>
            <BiChat />
            <div className='amounts'>{comments.length}</div>
          </div>
        </div>
      </PostInfo>
    </Container>
  );
};
