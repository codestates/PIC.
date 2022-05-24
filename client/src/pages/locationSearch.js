import styled from "styled-components";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { PlaceSearch } from "../modals/placeSearch";
import markerImg from "../img/marker.png";
import { IoLocateSharp as LocationPin, IoSearch } from "react-icons/io5";

const Container = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  width: 1200px;
  height: max-content;
`;

const InnerContainer = styled.div`
  grid-column: 3 / 11;

  display: flex;
  flex-direction: column;

  min-height: max-content;

  align-items: center;

  .BtnWrapper {
    width: 100%;
    display: flex;
    column-gap: 10px;
  }
`;

const KakaoMapBox = styled.section`
  width: 100%;
  aspect-ratio: 2 / 1;
  background-color: #aaa;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);

  border-radius: 10px;

  @media screen and (max-width: 500px) {
    width: 100%;
    aspect-ratio: 2 / 1;
  }
`;

const SelectDistance = styled.div`
  position: relative;

  display: grid;
  place-items: center;

  width: 50px;
  height: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;

  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);

  cursor: pointer;

  span {
    position: relative;
    top: 2px;
  }

  transition: 0.1s;

  &:hover {
    background-color: #ffea7c;
  }
`;

const BtnOnMap = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  width: max-content;
  height: 1.5rem;
  padding: 0 6px;

  background-color: #ffd600;
  border-radius: 1.5rem;
  box-shadow: 0px 2px 3px rgba(0,0,0,0.5);

  color: #000;

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
    transform: translateY(-3px);
    box-shadow: 0px 2px 6px rgba(0,0,0,0.5);
  }
`
const MyLocationBtn = styled(BtnOnMap)`
  top: 17px;
  right: 17px;
`

const LocationSearchBtn = styled(BtnOnMap)`
  bottom: 17px;
  right: 17px;
`

export const LocationSearch = () => {
  // 일단 지도불러오기
  // -> 게시글의 위치에 마커 찍기
  // -> 마커 찍고나면 커스텀 오버레이 천천히 해보기
  // 거리 옵션 설정 버튼 만들기
  // 옵션태그 써서 정렬 기준 만들기
  // 썸네일 불러오기
  // -> 게시글 전체 한번에 불러와야함
  // -> 페이지네이션 없는 무한 스크롤 만들기.

  const serverPath = process.env.REACT_APP_SERVER_PATH
  const [centerPosition, setCenterPosition] = useState([]);
  const [location, setLocation] = useState({ latitude: 37.5666805, longitude: 126.9784147 });
  const [distance, setDistance] = useState(0.5);
  const [searchModal, setSearchModal] = useState(false);
  const [isLoadingMyLocation, setIsLoadingMyLocation] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(3)

  const kakao = window.kakao;
  const kakaoMap = useRef();

  useEffect(async () => {
    const mapContainer = kakaoMap.current;
    const getZoomLevel = () => {
      if (distance === 0.1) return 1
      if (distance === 0.3) return 2
      if (distance === 0.5) return 3
      if (distance === 1) return 4
      if (distance === 3) return 5

    }

    let options = {
      center: new kakao.maps.LatLng(37.5666805, 126.9784147),
      // center: location ? new kakao.maps.LatLng(location.latitude, location.longitude) : new kakao.maps.LatLng(37.5666805, 126.9784147),
      level: getZoomLevel()
    };
    console.log(distance, "HERE")

    const map = new kakao.maps.Map(mapContainer, options);

    const imageSrc = markerImg, // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(50, 45), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(25, 38) };

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const markerPosition = new kakao.maps.LatLng(37.5666805, 126.9784147);
    // 마커 표시 될 위치

    const marker = new kakao.maps.Marker({
      // map: map,
      // position: positions[0].latlng,
      position: markerPosition,
      image: markerImage,
    });
    // 지도에 마커 표시
    marker.setMap(map);


    if (location) {
      marker.setPosition(new kakao.maps.LatLng(location.latitude, location.longitude));
      const latlng = marker.getPosition();
      map.setCenter(latlng);
    }

    const res = await axios.get(`${serverPath}/api/posts?date=true&center=[${[location.latitude, location.longitude]}]&distance=${distance}&level=1`)

    for (let el of res.data.posts) {
      const iwContent = `<a href="posts/${el._id}" style="color:blue; padding: 5px;" target="_self">${el.title}</a><br><div style="padding:1px;"><br> <a href="https://map.kakao.com/link/to/Hello World!,${el.location.latitude}, ${el.location.longitude}" style="color:blue" target="_blank">해당 게시글 길찾기</a></div>`
      console.log(el, "HOO")
      const infowindow = new kakao.maps.InfoWindow({
        position: new kakao.maps.LatLng(el.location.latitude, el.location.longitude),
        content: iwContent
      })

      const postsMarker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.location.latitude, el.location.longitude)
      })
      postsMarker.setMap(map);
      infowindow.open(map, postsMarker)
    }

    kakao.maps.event.addListener(map, "dragend", (e) => {
      let latlng = map.getCenter()
      // map.getCenter(); // 현재 지도의 중심좌표를 가져옴.
      // 인자로 e 를 넣고 e.latLng 를 하면 이벤트에 dragend에는 이벤트 객체가 없어서 (click과 달리) 저장할 것이 없다.
      // 위치를 저장해야 하므로 지도의 중앙 좌표 getCenter()를 이용해서 지더의 중앙 위치를 저장해야한다. 
      marker.setPosition(latlng);
      console.log(latlng, "HERE");

      setLocation({
        latitude: latlng.getLat(),
        longitude: latlng.getLng(),
      });

      setCenterPosition([latlng.Ma, latlng.La]);
    });
  }, [centerPosition, distance, location]);
  // 거리 사용 -> 거리에 따라 확대비율 조정해야하니까.

  const getMyLocation = () => {
    setIsLoadingMyLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          setLocation(
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

  const modalHandler = (modal) => {
    if (modal === "search") {
      searchModal ? setSearchModal(false) : setSearchModal(true);
    }
  }
  return (
    <Container>
      {searchModal ? <PlaceSearch setLocation={setLocation} closeFn={() => modalHandler('search')} /> : null}
      <InnerContainer>
        <KakaoMapBox ref={kakaoMap}>
          {/* {centerPosition && (
            <div>
              현재 중앙 좌표 : {centerPosition} // here ; {distance}
            </div>
          )} */}
          <MyLocationBtn onClick={getMyLocation}>
            <span>{isLoadingMyLocation ? '위치를 가져오는 중...' : '내 위치'}</span>
            <LocationPin />
          </MyLocationBtn>
          <LocationSearchBtn onClick={() => modalHandler('search')}>
            <span>주소로 검색하기</span>
            <IoSearch />
          </LocationSearchBtn>
        </KakaoMapBox>
        {/* Ma -> 위도, La -> 경도 */}
        <div className="BtnWrapper">
          <SelectDistance onClick={() => setDistance(0.1)}>
            <span>100m</span>
          </SelectDistance>
          <SelectDistance onClick={() => setDistance(0.3)}>
            <span>300m</span>
          </SelectDistance>
          <SelectDistance onClick={() => setDistance(0.5)}>
            <span>500m</span>
          </SelectDistance>
          <SelectDistance onClick={() => setDistance(1)}>
            <span>1 km</span>
          </SelectDistance>
          <SelectDistance onClick={() => setDistance(3)}>
            <span>3 km</span>
          </SelectDistance>
        </div>
      </InnerContainer>
    </Container>
  );
};
// 위치에 대한 옵션 제공 -> 필요하지 않음
// -> 내 위치 혹은, 지도에서 주소검색 이용해서 위치를 정할 수 있음
// 그리고 그 위치를 중심좌표로 이용해서 주변 반경 nkm 의 사진을 불러 오는 것

// 저렇게 받아온 배열, 여기서 sort -> 좋아요 순 혹은 날짜 순으로 정렬해서 보여주기.
// if -> API 내부에서 페이지 값이 없을때, 반환하는 값이 없다면 할 수 없음
// 왜냐? 정렬을 하기 위해선 위치 조건에 부합하는 전체 게시물을 받아와서 정렬해야 하기 때문
// 만약 일부의 데이터만 가져와서 정렬한다? 원하는 값이 아니게됨.

// api 자체가 거리만 기준으로 하고, 페이지네이션 되어있다? 그럼 그냥 주변에서 가장 가까운 순의 사진만 보여 줄 수 있음
// -> 여기서는 상훈이 협조 필요

// 중심 좌표 기준 거리순(ok), 좋아요 순, 최신순
// 전체를 반환하나? 아니면 페이지네이션 되어있나.
// 만약 거리순에서, 전체반환이다? 프론트에서 해결 가능
// 페이지네이션? API 추가 필요

// 기능
// 1. 카카오 맵
// 1-1. 불러온 사진 지도 위에 마커에 표시하기
// 1-2. 거리 설정 버튼 추가하기
// 1-2-1. 거리 설정에 따라 지도의 확대 비율 조정
// 2. 무한스크롤
// 3. option 태그 이용한 정렬(거리, 최신, 좋아용)
