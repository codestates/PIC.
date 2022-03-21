import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;

  display: grid;
  place-items: center;
  
  width: 100%;
  height: 100%;
`

const PageTitle = styled.h2`
  position: relative;
  margin-bottom: 20px;
  
  font-size: 1.4rem;  
`

const HLine = styled.div`
    display: block;
    margin-bottom: 30px;
    
    width: 100%;
    height: 1px;

    background-color: #aaa;
`

const Forms = styled.div`
  position: absolute;
  top : 200px;

  display: flex;
  flex-direction: column;

  align-items: center;

  width: 600px;
  height: 800px;
  
  .fields{
    display: grid;
    justify-content: center;

    width: 305px;
    min-height: 50px;

    margin-top: 50px;
  }

  .fields > div{
    margin-bottom: 25px;
  }

  .fields input{
    width: 305px;
    height: 38px;

    margin-top: 6px;
    box-sizing: border-box;

    border: 1px solid #aaa;
    border-radius: 3px;

    &:focus {
      outline: 3px solid #FFD600;
      border: transparent;
    }
  }

  .form{
    position: relative;
  }
`

const ProfileImg = styled.div`
  width: 130px;
  height: 130px;

  margin-bottom: 20px;

  border: 2px solid black;
  border-radius: 30%;
`

const Btn = styled.div`
  display: grid;
  place-items: center;

  width: 305px;
  height: 40px;

  background-color: #FFD600;

  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0,0,0,0.2);

  cursor : pointer;

  transition: 0.1s;

  &:hover{
    transform: translateY(-2px);
    box-shadow: 0px 5px 4px rgba(0,0,0,0.1);
  }

    span{
    position: relative;
    top: 2px;
  }
`

const ProfileImgBtn = styled(Btn)`
  margin-top: 10px;
`

const ConfirmBtn = styled(Btn)`
  margin-top: 30px;
`

const SignoutBtn = styled(Btn)`
  background-color: #ff796b;
  margin-top: 30px;
`

const Nofication = styled.div`
  position: absolute;
  top : 2px;
  right : 0;

  font-size: 0.8rem;;
`

const serverPath = process.env.REACT_APP_SERVER_PATH

export const ModifyMyinfo = () => {
  // 프로파일 이미지 업로드 및 표시
  // 호스팅 사용해야하고, 해당 주소 응답 받아서 표시해주어야 함.

  // 기존 비밀번호
  // 요청보내서 확인하기
  // 수정 누르면 요청 보내야함.

  // 새로운 닉네임
  // 요청 보내서 확인하기
  // 이 때 요청은 onBlur 이벤트에서 실행되어야 함.
  // 닉네임 유효성 검사 필요
  // 유효성 검사 결과에 따라 안내메시지 필요
  //
  // 새로운 비밀번호 ㅇㅋ
  // 새로운 비밀번호 확인 ㅇㅋ
  // 두개가 동일한지 확인 ㅇㅋ

  // 수정완료
  // patch 요청 보내야함

  // 회원탈퇴
  // 모달 띄우고, 예 눌렀을때 delete 요청 보내야함.
  // 아니요 누르면 그냥 뒤로가기
  // 페이지 이동 감지해서 alert 표시하기.
  // 아니면 모달?
  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [retypePassword, setRetypePassword] = useState()
  const [newNickname, setNewNickname] = useState()

  const [nicknameCheck, setNicknameCheck] = useState(false)
  const [passwordCheck, setPasswordCheck] = useState(false)

  useEffect(() => {
    if (newPassword === retypePassword) {
      setPasswordCheck(true)
    } else {
      setPasswordCheck(false)
    }
    console.log('리타입')
  }, [newPassword, retypePassword])


  const nicknameCheckHandler = (e) => {
    setNewNickname(e.target.value)
  }

  useEffect(() => {
    (async () => {
      if (newNickname) {
        const res = await axios.post(`${serverPath}/api/users/nickname`, {
          nickname: newNickname
        })
        if(res.status === 200) {
          setNicknameCheck(true)
        }
      }
    })()
  }, [newNickname])
  // useEffect 를 이용하여, newNickname 상태가 바뀌면 닉네임 요청을 보낸다.
  // 위의 문법은 즉시실행함수로, 호출하지 않고 1회성으로 함수를 실행 시킬 수 있다.
  // 이후 응답에 따라 분기하여 상태를 변경한다.

  const NicknameNofication = () => {
    if (!nicknameCheck && newNickname) {
      return <Nofication>올바른 닉네임인지 확인해주세요!</Nofication>
    } else {
      return null
    }
    // 여기서 조건 분기
  }
  const PasswordNofication = () => {
    if (!passwordCheck && retypePassword) {
      // 두 값이 다르고, 확인 필드에 값이 있는 경우
      return <Nofication>비밀번호가 서로 다릅니다!</Nofication>
    } else {
      return null
    }
  }

  return (
    <Container>

      <Forms>
        <PageTitle>프로필 정보 수정</PageTitle>
        <HLine />
        <ProfileImg />
        <ProfileImgBtn>
          <span>프로필 이미지 변경</span>
        </ProfileImgBtn>
        <div className='fields'>
          <div className='form'>
            <div>기존 비밀번호 입력</div>
            <input type={"password"} onBlur={(e) => { setOldPassword(e.target.value) }} />
          </div>
          <div className='form'>
            <div>새로운 닉네임</div>
            <input type="text" onBlur={nicknameCheckHandler} />
            <NicknameNofication />
          </div>
          <div className='form'>
            <div>새로운 비밀번호 입력</div>
            <input type={"password"} onBlur={(e) => { setNewPassword(e.target.value) }} />
          </div>
          <div className='form'>
            <div>새로운 비밀번호 확인</div>
            <input type={"password"} onChange={(e) => { setRetypePassword(e.target.value) }} />
            <PasswordNofication />
          </div>
        </div>
        <ConfirmBtn>
          <span>회원정보 수정</span>
        </ConfirmBtn>
        <SignoutBtn>
          <span>회원탈퇴</span>
        </SignoutBtn>
      </Forms>
    </Container>
  );
};
