import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { LoadingIndicator } from '../components/loadingIndicator';
import { OneBtnModal } from '../components/oneBtnModal';
import { TwoBtnModal } from '../components/twoBtnModal';
import { PageTitle } from '../components/pageTitle';


const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  
  width: 1200px;
  height: max-content;
`

const Forms = styled.div`
  grid-column: 3 / 11;

  display: flex;
  flex-direction: column;

  min-height: max-content;

  align-items: center;
  
  .fields{
    display: grid;
    justify-content: center;

    width: 305px;
    min-height: 50px;

    margin-top: 50px;
  }

  .fields > div{
    margin-bottom: 25px;
    font-weight: 500;
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
      border: #FFD600;
    }
  }
  .form{
    position: relative;
  }
`

const ProfileImg = styled.div`
  display: grid;
  place-items: center;

  width: 130px;
  height: 130px;

  margin-bottom: 20px;

  background : ${props => props.newPic ? `url(${props.newPic})` : `url(${props.oldPic})`};
  background-position: center;
  background-size: cover;
  

  border-radius: 30%;

  box-shadow: 0 3px 3px rgba(0,0,0,0.2);
`

const Btn = styled.button`
  font-size: 1rem;
  display: grid;
  place-items: center;

  width: 305px;
  height: 40px;

  background-color: ${props => props.disabled ? '#DDDDDD' : '#FFD600'};

  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0,0,0,0.2);

  cursor : ${props => props.disabled ? 'default' : 'pointer'};

  transition: 0.1s;

  &:hover{
    transform: ${props => props.disabled ? 'null' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'null' : '0px 5px 4px rgba(0,0,0,0.1)'};
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
  background-color:${props => props.disabled ? '#DDDDDD' : '#ff796b'};
  margin-top: 30px;
`

const Nofication = styled.div`
  position: absolute;
  top : 2px;
  right : 0;

  font-size: 0.8rem;;
`

export const ModifyMyinfo = () => {
  const serverPath = process.env.REACT_APP_SERVER_PATH
  const imgbbApi = process.env.REACT_APP_IMGBB_API_KEY
  const userId = window.sessionStorage.getItem('userId')
  const accessToken = window.sessionStorage.getItem('loginToken')

  const [profileImg, setProfileImg] = useState(null)
  const [oldProfileImg, setOldProfileImg] = useState(null)
  const [nowUploading, setNowUploading] = useState(false)
  const [imgBase64, setImgBase64] = useState('')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [newNickname, setNewNickname] = useState('')

  const [nicknameCheck, setNicknameCheck] = useState(true)
  const [passwordCheck, setPasswordCheck] = useState(false)

  const [okModalOpen, setOkModalOpen] = useState(false)
  const [invaildModalOpen, setInvaildModalOpen] = useState(false)
  const [signoutModalOpen, setSignoutModalOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)

  const navigate = useNavigate()
  const uploadBtn = useRef()

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${serverPath}/api/users/${userId}`)
      if (res) {
        setOldProfileImg(res.data.userInfo.image)
      }
    })()
  }, [])

  const imgUpload = async (e) => {
    e.preventDefault()
    let img = e.target.files[0]

    let reader = new FileReader()

    reader.readAsDataURL(img)
    reader.onload = () => {
      setImgBase64(reader.result.split(',')[1])
    }
  }

  useEffect(() => {
    const apiCall = async () => {
      setNowUploading(true)
      let form = new FormData()

      form.append('key', imgbbApi)
      form.append('image', imgBase64)

      const imgHosting = await axios.post('https://api.imgbb.com/1/upload', form)
      setProfileImg(imgHosting.data.data.url)
    }
    if (imgBase64) {
      apiCall()
    }
  }, [imgBase64, imgbbApi])

  useEffect(() => {
    if (profileImg) {
      (async () => {
        await axios.patch(`${serverPath}/api/users/${userId}`, {
          newImage: profileImg
        }, {
          headers: {
            Authorization: accessToken
          }
        })
      })()
      setNowUploading(false)
      setProfileModalOpen(true)
      // 프로필 이미지를 저장하는 상태가 변경되는 경우 위의 요청을 보내고, 요청이 끝난 뒤 로딩 상태를 false 로.
    }
  }, [profileImg, serverPath])

  useEffect(() => {
    if (newPassword === retypePassword) {
      setPasswordCheck(true)
    } else {
      setPasswordCheck(false)
    }
  }, [newPassword, retypePassword])

  const nicknameValidCheck = (value) => {
    let nicknameReg = /^[가-힣a-zA-Z0-9_]{2,12}$/;
    return nicknameReg.test(value)
  }

  const nicknameCheckHandler = (e) => {
    setNewNickname(e.target.value)
  }

  useEffect(() => {
    (async () => {
      if (newNickname && nicknameValidCheck(newNickname)) {
        // 새로운 닉네임 필드에 값이 있고, 유효한 경우에만 요청전송
        // 두 조건이 일치하는 요청에서 200이 아닌 경우 중복으로 볼 수 있음.
        try {
          const res = await axios.post(`${serverPath}/api/users/nickname`, {
            nickname: newNickname
          })
          if (res.status === 200) {
            setNicknameCheck(true)
          }
        }
        catch (err) {
          setNicknameCheck(false)
        }
      }
    })()
  }, [newNickname, serverPath])
  // useEffect 를 이용하여, newNickname 상태가 바뀌면 닉네임 요청을 보낸다.
  // 위의 문법은 즉시실행함수로, 호출하지 않고 1회성으로 함수를 실행 시킬 수 있다.
  // 이후 응답에 따라 분기하여 상태를 변경한다.

  const clickModifyBtn = async () => {
    const headers = {
      headers: {
        Authorization: accessToken
      }
    }

    try {
      const res = await axios.post(`${serverPath}/api/users/${userId}/password`, {
        password: oldPassword
      }, headers)
      if (res.status === 200) {
        const body = {
          newNickname: newNickname,
          newPassword: newPassword
        }
        axios.patch(`${serverPath}/api/users/${userId}`, body, headers)
        setOkModalOpen(true)
      }
    }
    catch (err) {
      setInvaildModalOpen(true)
    }
  }

  const clickSignoutBtn = async () => {
    const headers = {
      headers: {
        Authorization: accessToken
      }
    }

    try {
      const res = await axios.post(`${serverPath}/api/users/${userId}/password`, {
        password: oldPassword
      }, headers)
      if (res.status === 200) {
        setSignoutModalOpen(true)
      }
    }
    catch (err) {
      setInvaildModalOpen(true)
    }
  }

  const deleteAccount = () => {
    const headers = {
      headers: {
        Authorization: accessToken
      }
    }

    axios.delete(`${serverPath}/api/users/${userId}`, headers)
    navigate('/main')
  }

  // 기존 비밀번호랑 다를때 invaild
  // 기존 비밀번호랑 같을때 ok
  // 탈퇴 할때 signout

  const NicknameNofication = () => {
    if (!nicknameValidCheck(newNickname) && newNickname.length > 12 && newNickname) {
      return <Nofication>닉네임은 12글자를 넘길 수 없습니다!</Nofication>
    }
    if (!nicknameValidCheck(newNickname) && newNickname.length < 2 && newNickname) {
      return <Nofication>닉네임은 2글자 이상이여야 합니다!</Nofication>
    }
    if (!nicknameValidCheck(newNickname) && newNickname) {
      return <Nofication>한글, 영문, 숫자, _ ,- 만 입력 가능합니다!</Nofication>
    }
    if (!nicknameCheck && newNickname && nicknameValidCheck(newNickname)) {
      return <Nofication>이미 사용중인 닉네임입니다!</Nofication>
    }
    if (newNickname && nicknameCheck) {
      return <Nofication>사용가능한 닉네임입니다.</Nofication>
    }
    return null
  }
  const RetypePasswordNofication = () => {
    if (!passwordCheck && retypePassword) {
      // 두 값이 다르고, 확인 필드에 값이 있는 경우
      return <Nofication>비밀번호가 서로 다릅니다!</Nofication>
    }
    if (!passwordCheck && !retypePassword) {
      return <Nofication>비밀번호를 재입력하세요!</Nofication>
    }
    return null
  }

  const PasswordNofication = () => {
    if (newPassword && newPassword.length < 8) {
      return <Nofication>8자 이상이여야 합니다.</Nofication>
    }
    return null
  }

  const ConfirmBtnByCondition = () => {
    if (oldPassword && newNickname && nicknameCheck && newPassword && retypePassword && passwordCheck && newPassword.length >= 8) {
      // 모든 값이 입력되어 았고, 유효성 및 중복검사, 일치여부를 충족한 경우
      return (
        <ConfirmBtn onClick={clickModifyBtn}>
          <span>회원정보 수정</span>
        </ConfirmBtn>
      )
    }
    if (oldPassword && nicknameCheck && newPassword && retypePassword && passwordCheck && newPassword.length >= 8) {
      // 기존 비밀번호가 있고, 닉네임이 유효하며, 새 비밀번호, 리타입 필드에 값이 있고 그 둘이 같으며, 새 비밀번호의 길이가 8자 이상 일때
      // 닉네임의 중복확인이 되지 않은 경우를 걸러낼 수 잇음
      return (
        <ConfirmBtn onClick={clickModifyBtn}>
          <span>회원정보 수정</span>
        </ConfirmBtn>
      )
    }
    if (oldPassword && newNickname && nicknameCheck && !newPassword && !retypePassword) {
      // 닉네임 필드에만 값이 존재하는 경우.
      return (
        <ConfirmBtn onClick={clickModifyBtn}>
          <span>회원정보 수정</span>
        </ConfirmBtn>
      )
    } else {
      return (
        <ConfirmBtn disabled={true}>
          <span>회원정보 수정</span>
        </ConfirmBtn>
      )
    }
  }

  const SignoutBtnByCondition = () => {
    if (oldPassword) {
      return (
        <SignoutBtn onClick={clickSignoutBtn}>
          <span>회원탈퇴</span>
        </SignoutBtn>
      )
    } else {
      return (
        <SignoutBtn disabled={true}>
          <span>회원탈퇴</span>
        </SignoutBtn>
      )
    }
  }


  const modalHandler = (modal) => {
    if (modal === 'profile') {
      profileModalOpen ? setProfileModalOpen(false) : setProfileModalOpen(true)
    }
    if (modal === 'ok') {
      okModalOpen ? setOkModalOpen(false) : setOkModalOpen(true)
    }
    if (modal === 'invalid') {
      invaildModalOpen ? setInvaildModalOpen(false) : setInvaildModalOpen(true)
    }
    if (modal === 'signout') {
      signoutModalOpen ? setSignoutModalOpen(false) : setSignoutModalOpen(true)
    }
  }

  return (
    <Container>
      {profileModalOpen ? <OneBtnModal close={() => modalHandler('profile')} main={'프로필 사진이 변경되었습니다!'} /> : null}
      {okModalOpen ? <OneBtnModal close={() => modalHandler('ok')} main={'회원정보 변경이 완료되었습니다!'} /> : null}
      {invaildModalOpen ? <OneBtnModal close={() => modalHandler('invalid')} main={'비밀번호가 다릅니다.'} /> : null}
      {signoutModalOpen ? <TwoBtnModal close={() => modalHandler('signout')} action={deleteAccount} main={'정말로 회원탈퇴 하시겠습니다?\n삭제된 정보는 복구 할 수 없습니다.'} /> : null}

      <Forms>
        <PageTitle>프로필 정보 수정</PageTitle>
        <ProfileImg newPic={profileImg} oldPic={oldProfileImg}>
          {nowUploading ? <LoadingIndicator /> : null}
        </ProfileImg>
        <input type="file" accept="image/*" style={{ display: 'none' }} ref={uploadBtn} onChange={imgUpload} />
        <ProfileImgBtn onClick={() => uploadBtn.current.click()}>
          <span>프로필 이미지 변경</span>
        </ProfileImgBtn>
        <div className='fields'>
          <div className='form'>
            <div>기존 비밀번호 입력</div>
            <input type={"password"} placeholder="닉네임과 비밀번호 변경을 위해서는 필수입력입니다." onBlur={(e) => { setOldPassword(e.target.value) }} />
          </div>
          <div className='form'>
            <div>새로운 닉네임</div>
            <input type="text" placeholder="변경할 닉네임을 입력합니다." onBlur={nicknameCheckHandler} />
            <NicknameNofication />
          </div>
          <div className='form'>
            <div>새로운 비밀번호 입력</div>
            <input type={"password"} placeholder="변경할 비밀번호를 입력합니다." onBlur={(e) => { setNewPassword(e.target.value) }} />
            <PasswordNofication />
          </div>
          <div className='form'>
            <div>새로운 비밀번호 확인</div>
            <input type={"password"} placeholder="변경할 비밀번호를 다시 입력합니다." onChange={(e) => { setRetypePassword(e.target.value) }} />
            <RetypePasswordNofication />
          </div>
        </div>
        <ConfirmBtnByCondition />
        <SignoutBtnByCondition>
          <span>회원탈퇴</span>
        </SignoutBtnByCondition>
      </Forms>
    </Container>
  );
};
