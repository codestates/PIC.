import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import { BsCameraFill } from "react-icons/bs";
import { IoLocateSharp as LocationPin } from "react-icons/io5";


import { PageTitle } from '../components/pageTitle';
import { TagSelection } from '../components/tagSelection';
import { LoadingIndicator } from "../components/loadingIndicator";
import { BtnComponent as Btn } from '../components/BtnComponent';


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
  height: max-content;
`

const BoxContianer = styled.section`
  display: flex;
  justify-content: space-between;
`

const UploadImageBox = styled.section`
  display: grid;
  place-items: center;

  width: calc(50% - 5px);
  aspect-ratio: 1 / 1;
  
  background-color: ${props => props.img ? '#000' : '#fff'};
  background-image: ${props => props.img ? `url(${props.img})` : null};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  box-shadow: 0px 3px 5px rgba(0,0,0,0.3);

  border-radius: 10px;

  transition : 0.2s;
  
  color: #aaa;

  &:hover{
    background-color: ${props => props.img ? '#000' : '#FFEA7C'};
    color : #555;
  }

  .click_for_upload {
    text-align: center;

    user-select: none;

    svg{
      font-size: 3rem;
    }
  }
  cursor: pointer;
`

const KakaoMapBox = styled.section`
  width: calc(50% - 5px);
  aspect-ratio: 1 / 1;
  background-color: #aaa;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.3);

  border-radius: 10px;

`

const MyLocation = styled.div`
  position: absolute;
  top: 17px;
  right: 17px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: max-content;
  height: 1.5rem;
  padding: 0 6px;

  background-color: #fff;
  border-radius: 1.5rem;
  box-shadow: 0px 2px 3px rgba(0,0,0,0.3);

  color: #666;

  z-index: 2;

  cursor : pointer;

  span {  
    position: relative;
    top: 1px;

    font-size: 0.9rem;
  }

  svg {
    margin-left: 5px;
  }

  transition: 0.1s;

  &:hover {
    background-color: #ffd600;
    color: #000;
  }
`

const TitleContainer = styled.section`
  input {
    width: 100%;
    height: 35px;

    box-sizing: border-box;

    padding-left: 10px;
    font-size: 1.2rem;

    outline : none;
    &:focus {
      outline: 3px solid #FFD600;
      border: #FFD600;
    }
  }
`

const TagContainer = styled.section`

`

const DescContainer = styled.section`
  textarea {
    width: 100%;
    min-height: 300px;
    box-sizing: border-box;
    padding: 10px;

    font-family: sans-serif;
    font-size: 1.2rem;

    resize: none;
    overflow: hidden;
    // 히든을 줌으로써 스크롤을 없앰 -> 크기에 맞게 늘어나니 스크롤은 보이지 않지만, 내용은 다 보인다.

    &:focus {
      outline: 3px solid #FFD600;
      border: #FFD600;
    }

  }
`

export const AddPost = () => {

  // todo 요청 보내야함
  // 포스트 요청
  // 이름, 태그, 사진주소, 좌표 및 한글주소

  // ! 태그 저장해야함
  // -> 현재 컴포넌트에서 상태 만들어서 갱신함수 내려주기
  // -> [...선택한 태그, ... 추가한 태그 ] 가 되어야함.

  // todo 지도 넣어야함
  // 좌표저장하는 상태 ok
  // 주소 가져오고 저장하느 상태
  // 주소검색 넣기
  // 현재 위치 찍는거 넣기

  // 1. 지도 넣기, 도로명 주소까지
  // 2. 요청 작성

  const kakao = window.kakao

  const serverPath = process.env.REACT_APP_SERVER_PATH
  const imgbbApi = process.env.REACT_APP_IMGBB_API_KEY
  const accessToken = window.localStorage.getItem('loginToken')

  const [imgBase64, setImgBase64] = useState(null)
  const [imgHostUrl, setImgHostUrl] = useState('')

  const [currentLocation, setCurrentLocation] = useState(null) // 지오로케이션 사용하면 쓰기
  const [location, setLocation] = useState(null)
  const [address, setAddress] = useState([])

  const [isUploading, setIsUploading] = useState(false)
  const [isLoadingMyLocation, setIsLoadingMyLocation] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDesctription] = useState('')
  const [tags, setTags] = useState([])

  const imgInput = useRef()
  const kakaoMap = useRef()
  const descArea = useRef()

  // 이미지 읽어오기
  const uploadImage = (e) => {
    e.preventDefault()
    let img = e.target.files[0]

    const reader = new FileReader()

    reader.readAsDataURL(img)
    reader.onload = () => {
      setImgBase64(reader.result.split(',')[1])
    }
  }

  // 이미지가 읽히고 나면 요청 전송
  useEffect(() => {
    if (imgBase64) {
      (async () => {
        setIsUploading(true)

        const form = new FormData()
        form.append('key', imgbbApi)
        form.append('image', imgBase64)

        const res = await axios.post('https://api.imgbb.com/1/upload', form)
        setImgHostUrl(res.data.data.url)

      })()
    }
  }, [imgBase64])

  useEffect(() => {
    setTimeout(() => {
      setIsUploading(false)
    }, 900)

  }, [imgHostUrl])

  // 카카오 지도 API 사용
  useEffect(() => {
    const container = kakaoMap.current
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표, 추후에 위치 지정하기.
      level: 3
    }

    const map = new kakao.maps.Map(container, options)

    const marker = new kakao.maps.Marker()

    marker.setMap(map)

    // 현재 위치가 있는 경우 해당 위치에 마커를 표시한다.
    if (currentLocation) {
      marker.setPosition(new kakao.maps.LatLng(currentLocation.latitude, currentLocation.longitude))
      const latlng = marker.getPosition() // 이동한 좌표
      map.panTo(latlng)

      setLocation({
        latitude: latlng.getLat(), //위도
        longitude: latlng.getLng() //경도
      })
    }

    //
    kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
      let latlng = mouseEvent.latLng
      marker.setPosition(latlng) // 클릭한 좌표

      setLocation({
        latitude: latlng.getLat(), //위도
        longitude: latlng.getLng() //경도
      })
    })
  }, [currentLocation])

  // location 상태가 바뀔 때 
  useEffect(() => {
    let geocoder = new kakao.maps.services.Geocoder()
    if (location) {

      geocoder.coord2Address(location.longitude, location.latitude, (result, status) => {
        if (status === kakao.maps.services.Status.OK && result[0].road_address) {
          setAddress(
            {
              roadAdd: result[0].road_address.address_name, // 도로명 주소
              lotAdd: result[0].address.address_name // 지번 주소
            }
          )
        } else {
          setAddress(
            {
              roadAdd: null,
              lotAdd: result[0].address.address_name
              // 도로명 주소는 없을 수 있으므로, 도로명 주소가 없다면 null 을 전달한다.
            }
          )
        }
      })

    }
  }, [kakao.maps.services.Geocoder, kakao.maps.services.Status.OK, location])

  // 내 위치 가져오기
  const getMyLocation = () => {
    setIsLoadingMyLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          setCurrentLocation(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          )
          setIsLoadingMyLocation(false)
        }
      })
    } else {
      setIsLoadingMyLocation(false)
      // 모달 상태
    }
  }
  // 현재위치를 불러오는 중입니다.
  // 현재위치를 불러올수없습니다 -> 모달
  console.log(location, address)

  // 본문 작성 페이지 리사이징
  const autoResizing = () => {
    const textarea = descArea.current
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  const ImageContainer = () => {
    if (isUploading) {
      return (
        <LoadingIndicator size="7rem" />
      )
    }
    if (!isUploading && !imgHostUrl) {
      return (<div className='click_for_upload'>
        <BsCameraFill />
        <p>클릭하여 이미지 업로드</p>
      </div>)
    }
    if (imgHostUrl) {
      return null
    }
  }
  const uploadPost = () => {
    const headers = {
      headers: {
        Authorization: accessToken
      }
    }
    const body = {
      title: title,
      description: description,
      photo: imgHostUrl,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        roadAdd: address.roadAdd,
        lotAdd: address.lotAdd
      },
      hashtags: tags
    }
    axios.post(`${serverPath}/api/posts`, body, headers)
  }

  const UploadBtnByCondition = () => {
    if (title && imgHostUrl && location) {
      return <Btn action={uploadPost} width={'100%'}>업로드하기</Btn>
    } else {
      return <Btn disabled={true} width={'100%'}>업로드하기</Btn>
    }
  }
  return (
    <Container>
      <InnerContainer>
        <PageTitle>게시글 작성</PageTitle>
        <BoxContianer>
          <input type="file" accept="image/*" style={{ display: 'none' }} ref={imgInput} onChange={uploadImage} />
          <UploadImageBox onClick={() => imgInput.current.click()} img={imgHostUrl}>
            <ImageContainer />
          </UploadImageBox>
          <KakaoMapBox ref={kakaoMap}>
            <MyLocation onClick={getMyLocation}>
              <span>{isLoadingMyLocation ? '위치를 가져오는 중...' : '내 위치' }</span>
              <LocationPin />
            </MyLocation>
          </KakaoMapBox>
        </BoxContianer>
        <TitleContainer>
          <h3 className='category'>사진 이름</h3>
          <input type="text" spellCheck={false} onChange={(e) => setTitle(e.target.value)} />
        </TitleContainer>
        <TagContainer>
          <h3 className='category'>태그</h3>
          <TagSelection setTags={setTags} />
        </TagContainer>
        <DescContainer>
          <h3 className='category'>사진 설명</h3>
          <textarea ref={descArea} onKeyUp={autoResizing} spellCheck={false} onChange={(e) => setDesctription(e.target.value)} ></textarea>
        </DescContainer>
        <UploadBtnByCondition />
      </InnerContainer>
    </Container >
  );
};
