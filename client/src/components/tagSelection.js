import axios from 'axios';
import { useState } from 'react';
import { useRef } from 'react';
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

export const TagSelection = ({ setTags, tags, hideMyTags }) => {
  const serverPath = process.env.REACT_APP_SERVER_PATH

  const [tagData, setTagData] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [myTags, setMyTags] = useState([])

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
    if (tags) {
      // 수정페이지인 경우 기존 태그를 저장해둔 해당 props 를 전달해주지만, 
      // 추가페이지의 경우 해당 props 가 없으므로, 있는 경우에만 아래의 과정을 통해
      // 상태의 기본값을 지정한다.
      setSelectedTags(tags.keywords)
      setMyTags(tags.myTags)
    }
  }, [])

  useEffect(() => {
    setTags(
      {
        keywords: selectedTags,
        myTags: myTags
      }
    )
  }, [myTags, selectedTags])


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
    if (!myTags.includes(value)) {
      setMyTags(
        [...myTags, value]
      )
    }
  }

  const removeMyTag = (value) => {
    setMyTags(
      myTags.filter((tag) => {
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

  // 어떤 클래스를 가진 요소를 전체 불러오고, 
  // 만약 그 요소의 텍스트컨텐츠가 배열에 있는 값과 동일하다면
  // click 이벤트를 실행시킨다.

  // 즉, keywords props 로 받아온 배열내부에 있는 값과 일치하는 경우.


  return (
    <Container>
      {loading
        ? <LoadingContainer><LoadingIndicator size={'9rem'} /></LoadingContainer> // 여기에 로딩 컴포넌트 넣기
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
              {tagData[0] ? tagData[0].content.map((tag) => <Tag key={tag} selectFn={selectTag} tags={tags}>{tag}</Tag>) : null}
            </TagContainer>
            <h3>시간</h3>
            <TagContainer>
              {tagData[1] ? tagData[1].content.map((tag) => <Tag key={tag} selectFn={selectTag} tags={tags}>{tag}</Tag>) : null}
            </TagContainer>
            <h3>주제</h3>
            <TagContainer>
              {tagData[2] ? tagData[2].content.map((tag) => <Tag key={tag} selectFn={selectTag} tags={tags}>{tag}</Tag>) : null}
            </TagContainer>
            <h3>분위기</h3>
            <TagContainer>
              {tagData[3] ? tagData[3].content.map((tag) => <Tag key={tag} selectFn={selectTag} tags={tags}>{tag}</Tag>) : null}
            </TagContainer>
            <h3>날씨</h3>
            <TagContainer>
              {tagData[4] ? tagData[4].content.map((tag) => <Tag key={tag} selectFn={selectTag} tags={tags}>{tag}</Tag>) : null}
            </TagContainer>
          </div>
        )
      }
      {
        hideMyTags
          ? null
          : (
            <div>
              <h3>나의 태그</h3>
              <TagContainer>
                {
                  myTags.map((myTag) => {
                    return <Tag key={myTag} usage={'added'} removeFn={removeMyTag}>{myTag}</Tag>
                  })
                }
                <Tag usage={'add'} addFn={addMyTag}>내 태그추가</Tag>
              </TagContainer>
            </div>
          )
      }
    </Container>
  );
};
