import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;

`
const CommonTag = styled.div`
  display: grid;
  place-items: center;
  
  width: max-content;
  min-width: 60px;
  height: 25px;
  
  box-sizing: border-box;
  padding: 3px 10px 0px 10px;
  
  background-color: #ddd;

  overflow: hidden;

  div{
    min-width: 60px;
    max-width: max-content;
    height: 16px;

    border: none;

    text-align: center;
  }
  
  div:focus{
    outline: none;
  }
`

const Btn = styled.div`
  display: ${props => props.use === 'common' ? 'none' : 'block'};
  width: 25px;
  height: 25px;

  background-color: #aaa;

  cursor: pointer;
`

export const Tag = ({ use, action, children }) => {
  // spec 은 어떤 버튼인지. (일반 태그, 내가 추가한 버튼(삭제 버튼), 입력을 위한 태그 인풋(추가 버튼) )
  // action 은 어떤 함수를 실행할 것인지, (제거, 추가)

  const [addTagValue, setAddTagValue] = useState()
  // 위의 값을 props 를 이용하여 상위 컴포넌트로 전달한다.

  const doAction = () => {
    if (action) {
      action()
    }
  }

  const KeyHandler = (e) => {
    console.log(e.keyCode)
    if (e.keyCode === 32) {
      // space 막기
      e.preventDefault()
    }
    if (e.keyCode === 13) {
      // enter 막기
      e.preventDefault()
      if (action) {
        action()
      }
    }
  }

  return (
    <div>
      <Container>
        {use === 'common' ? <CommonTag>{children}</CommonTag> : null}
        {use === 'added' ? <CommonTag>{children}</CommonTag> : null}
        {use === 'add' ? (
          <CommonTag>
            <div contentEditable spellCheck={false} onInput={e => setAddTagValue(e.target.innerText)} onKeyDown={(e) => KeyHandler(e)}></div>
          </CommonTag>
        ) : null}
        <Btn onClick={doAction} use={use} />
      </Container>
    </div>
  );
};
