import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { LoadingIndicator } from './loadingIndicator';

import { Tag } from './tagComponent';

const Container = styled.section`
  width: 100%;

  h3 {
    font-size: 1.2rem;
    margin-top: 17px;
    margin-bottom: 7px;
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

const LoadingContainer = styled.section`
  display: grid;
  place-items : center;
  width: 100%;
  height: 300px;
`

export const TagSelection = ({setTags}) => {
  const serverPath = process.env.REACT_APP_SERVER_PATH
  // 최초 렌더링시에 태그 데이터를 불러와야함
  // 모양에 맞게 렌더링시키고, 선택된 태그들 내부의 값은 배열 상태에 추가
  // 나의 태그 추가를 이용해서 추가 및 삭제가 가능하게 해야함.
  // 중복된 값을 태그로 추가 될 수 없음
  // -> 그래야 일치하는 값을 찾아 삭제가능.(안복잡해짐)
  const [tagData, setTagData] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [myTag, setMyTag] = useState([])

  const [loading, setLoading] = useState(false)
  // 저장한 태그를 props 로 갱신함수를 받아서 올려줘야함.


  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${serverPath}/api/hashtags`)
        if (res.status === 200) {
          setTagData(res.data.hashtags)
        }
        setLoading(false)
      } catch (err) {
        // 에러
      }
    })()
    // 페이지를 불러올 때 해당 테그 데이터를 불러온다.
  }, [])

  useEffect(() => {
    setTags(
      [ ...selectedTags, ...myTag]
    )
  }, [myTag, selectedTags])

  const selectTag = (value) => {
    if (selectedTags.includes(value)) {
      setSelectedTags(
        selectedTags.filter((tag) => {
          return tag !== value
        })
      )
    }
    else {
      setSelectedTags(
        [...selectedTags, value]
      )
    }
  }

  const addMyTag = (value) => {
    if (!myTag.includes(value)) {
      setMyTag(
        [...myTag, value]
      )
    }
  }

  const removeMyTag = (value) => {
    setMyTag(
      myTag.filter((tag) => {
        return tag !== value
      })
    )
  }

  const RenderTags = (data) => {
    return data.data.map((tag) => {
      return <Tag key={tag} selectFn={selectTag}>{tag}</Tag>
    }
    )
  }

  return (
    <Container>
      {loading
        ? <LoadingContainer><LoadingIndicator size={'9rem'}/></LoadingContainer> // 여기에 로딩 컴포넌트 넣기
        :
        (
          // tagData.map((tagData, idx) => { 
          //   return (
          //     <div key={idx}>
          //       <h3>{tagData.category}</h3>
          //       <TagContainer>
          //         <RenderTags data={tagData.content} />
          //       </TagContainer>
          //     </div>
          //   )
          // })

          <div>
            <h3>지역</h3>
            <TagContainer>
              {tagData[0] ? tagData[0].content.map((tag) => <Tag key={tag} selectFn={selectTag}>{tag}</Tag>) : null}
            </TagContainer>
            <h3>시간</h3>
            <TagContainer>
              {tagData[1] ? tagData[1].content.map((tag) => <Tag key={tag} selectFn={selectTag}>{tag}</Tag>) : null}
            </TagContainer>
            <h3>주제</h3>
            <TagContainer>
              {tagData[2] ? tagData[2].content.map((tag) => <Tag key={tag} selectFn={selectTag}>{tag}</Tag>) : null}
            </TagContainer>
            <h3>분위기</h3>
            <TagContainer>
              {tagData[3] ? tagData[3].content.map((tag) => <Tag key={tag} selectFn={selectTag}>{tag}</Tag>) : null}
            </TagContainer>
            <h3>날씨</h3>
            <TagContainer>
              {tagData[4] ? tagData[4].content.map((tag) => <Tag key={tag} selectFn={selectTag}>{tag}</Tag>) : null}
            </TagContainer>
          </div>
        )
      }

      <h3>나의 태그</h3>
      <TagContainer>
        {
          myTag.map((myTag) => {
            return <Tag key={myTag} usage={'added'} removeFn={removeMyTag}>{myTag}</Tag>
          })
        }
        <Tag usage={'add'} addFn={addMyTag}>내 태그추가</Tag>
      </TagContainer>
    </Container >
  );
};
