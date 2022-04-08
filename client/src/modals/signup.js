import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsXCircleFill } from "react-icons/bs";
import { BtnComponent as Btn } from "../components/BtnComponent";


const ModalContainer = styled.div`
  position : fixed;
  display: grid;
  place-items: center;

  top:0; left: 0; bottom: 0; right: 0;

  width: 100vw;
  height: 100vh;

  z-index: 998;
`;


const Backdrop = styled.div`
  position : fixed;
  top:0; left: 0; bottom: 0; right: 0;

  background-color: rgba(0,0,0,0.3);

  z-index: 998;
`

const Modal = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  background-color: white;
  width: 400px;
  height: 700px;
  border-radius: 15px;
  z-index: 999;
  
  h3 {
    margin-bottom: 6px;
  } 

  .fields {
    display: grid;
    justify-content: center;
    width: 305px;
    margin-bottom: 20px;
  }

  .fields input {
    width: 305px;
    height: 40px;
    margin-bottom: 15px;
    padding-left: 5px;
    box-sizing: border-box;
    border: 1px solid #aaa;
    border-radius: 3px;
    &:focus {
      outline: 3px solid #ffd600;
      border: transparent;
    }
  }
  .form {
    position: relative;
  }
`;

const InnerContainer = styled.div`
  position: relative;
  top: 15px;
  height: max-content;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;

  color: #ff796b;

  transition: 0.1s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
`

const Nofication = styled.div`
  position: absolute;
  top: 2px;
  right: 0;
  font-size: 0.8rem; ;
`;

const Hline = styled.div`
  margin-top : 15px;
  margin-bottom : 15px;

  width: 100%;
  height: 1px;

  background-color: #ddd;
`

export const Signup = ({ closeFn, setOpenLoginModal, setOpenSignupModal }) => {

  // 최초에는 중복확인 버튼만 활성화 상태로 보여야함
  // 중복확인 버튼을 누르고 중복이 아닌 경우 인증 버튼을 활성화 함.



  //! -------------------------------------- 1. 상태선언 ------------------------------------

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  //------ 이메일입력, 이메일 중복 상태 --------
  const [email, setEmail] = useState("");
  //1.상태(변수)  2.상태갱신함수
  const [isNotUsingEmail, setIsNotUsingEmail] = useState(false);
  // 이메일 중복여부 관련 상태
  // 우용숙제 : useState false,true 정확히 어떻게 작동하는지 파고들기.

  //-------- 이메일 코드관련 상태 --------
  const [isValidEmailCode, setIsValidEmailCode] = useState(false);
  const [isChecked, setIsChecked] = useState(false)
  const [emailCode, setEmailCode] = useState("");
  // email 코드 6자리
  const [codeInputValue, setCodeInputValue] = useState("");

  //---------닉네임입력, 닉네임 중복 상태 -------
  const [nickname, setNickname] = useState("");
  const [isValidNickname, setIsValidNickname] = useState(true);

  //---------패스워드입력, 패스워드 확인 상태-------
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState('')

  const [passwordCheck, setPasswordCheck] = useState(false)

  //---------회원가입 버튼 누를시 어디로 가는지 경로지정------
  const naviagate = useNavigate()

  //! -------------------------------------- 2.함수 (유효성검사, 유즈이펙트, 통신) ------------------------------------

  const validateEmail = (value) => {
    // 이메일 유효성 검사
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailRegex.test(value);
  };

  const emailInputHandler = (e) => {
    setEmail(e.target.value)
    setIsChecked(false)
    setIsNotUsingEmail(false)
    setEmailCode('')
  }

  //todo 이메일 입력창 이벤트를 사용하기위해서 만든 함수 _ com,co 요청 손 봐야함  (리펙토링해야함!!!!!)
  const emailCheckHandler = (e) => {
    // input에 입력된 값을 원하는 상태에 저장합니다.
    (async () => {
      setIsChecked(true)
      if (email && validateEmail(email)) {
        // 이메일 필드에 값이 있고, 유효한 경우에만 요청전송
        // 두 조건이 일치하는 요청에서 200이 아닌 경우 중복으로 볼 수 있음.
        try {
          const res = await axios.post(`${serverPath}/api/users/email`, {
            email: email,
          });
          if (res.status === 200) {
            setIsNotUsingEmail(true);
          }
        } catch (err) {
          setIsNotUsingEmail(false);
        }
      }
    })()
  };
  //todo -------------------------------------------------------------

  // useEffect 를 이용하여, email 상태가 바뀌면 email 요청을 보낸다.
  // 위의 문법은 즉시실행함수로, 호출하지 않고 1회성으로 함수를 실행 시킬 수 있다.
  // 이후 응답에 따라 분기하여 상태를 변경한다.

  //-------- 이메일 코드관련 ----------
  // 회원가입 전 이메일인증 -> 코드6자리 발급받는 요청
  const sendEmailCode = async () => {
    const res = await axios.post(`${serverPath}/api/users/mail`, {
      email: email,
    });
    if (res.status === 200) {
      setEmailCode(res.data.authNum);
      //200 일때 무엇을 저장 ? -> console.log로 찍어봐서 내가 원하는게 어디에 있는지 보고 저장! 
    }
  };

  // console.log(emailCode) 


  // 이메일 코드 핸들러
  const emailCodeHandler = (e) => {
    // input에 입력된 값을 원하는 상태에 저장합니다.
    setCodeInputValue(e.target.value)

    if (emailCode === e.target.value) {
      setIsValidEmailCode(true);
    } else {
      setIsValidEmailCode(false);
    }
  };

  //--------- 닉네임 코드관련 ---------
  const validateNickname = (value) => {
    const nicknameRegex = /^[가-힣|a-z|A-Z|0-9|_]{2,12}$/;
    return nicknameRegex.test(value);
  };

  const nicknameCheckHandler = (e) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    (async () => {
      if (nickname && validateNickname(nickname)) {
        // 새로운 닉네임 필드에 값이 있고, 유효한 경우에만 요청전송
        // 두 조건이 일치하는 요청에서 200이 아닌 경우 중복으로 볼 수 있음.
        try {
          const res = await axios.post(`${serverPath}/api/users/nickname`, {
            nickname: nickname,
          });
          if (res.status === 200) {
            setIsValidNickname(true);
          }
        } catch (err) {
          setIsValidNickname(false);
        }
      }
    })();
  }, [nickname, serverPath]);

  // 비밀번호 , 비밀번호확인
  useEffect(() => {
    if (password === retypePassword) {
      setPasswordCheck(true)
    } else {
      setPasswordCheck(false)
    }
  }, [password, retypePassword])

  // 회원가입
  const SignupHandler = async () => {
    const res = await axios.post(`${serverPath}/api/users`, {
      email: email,
      nickname: nickname,
      password: password,
    });
    if (res.status === 201) {
      setOpenLoginModal(true)
      setOpenSignupModal(false)
    }
  };


  //! -------------------------------------- 3.컴포넌트------------------------------------
  // 이메일 유효성검사
  const EmailNotification = () => {
    if (isChecked && !isNotUsingEmail && email && validateEmail(email)) {
      return <Nofication>중복된 이메일입니다.</Nofication>;
    }
    if (isChecked && isNotUsingEmail && email.length > 0 && validateEmail(email)) {
      return <Nofication>사용 가능한 이메일입니다.</Nofication>;
    }
    if (email && !validateEmail(email)) {
      return <Nofication>올바른 이메일을 입력하세요.</Nofication>;
    }
    return null;
  };

  // 이메일 인증 보내기 버튼
  const EmailCodeBtn = () => {
    return isNotUsingEmail ? <Btn action={sendEmailCode}>인증</Btn> : <Btn action={emailCheckHandler}>중복확인</Btn>;
  };


  // 이메일 코드 6자리 검사
  const EmailCodeNotification = () => {
    if (emailCode && !isValidEmailCode && codeInputValue) {
      return <Nofication>코드가 서로 다릅니다.</Nofication>;
    }
    if (emailCode && isValidEmailCode && codeInputValue) {
      return <Nofication>코드가 일치합니다.</Nofication>;
    }
    if (!emailCode && codeInputValue) {
      return <Nofication>인증코드 전송이 필요합니다.</Nofication>;
    }
    if(emailCode) {
      return <Nofication>메일에 전송된 코드를 입력해주세요.</Nofication>;
    }
    return null;
  };


  // 닉네임 유효성검사
  const NicknameNofication = () => {
    if (!validateNickname(nickname) && nickname.length > 12 && nickname) {
      return <Nofication>닉네임은 12글자를 넘길 수 없습니다!</Nofication>;
    }
    if (!validateNickname(nickname) && nickname.length < 2 && nickname) {
      return <Nofication>닉네임은 2글자 이상이여야 합니다!</Nofication>;
    }
    if (!validateNickname(nickname) && nickname) {
      return <Nofication>한글, 영문, 숫자, _ ,- 만 입력 가능합니다!</Nofication>;
    }
    if (!isValidNickname && nickname && validateNickname(nickname)) {
      return <Nofication>이미 사용중인 닉네임입니다!</Nofication>;
    }
    if (nickname && isValidNickname) {
      return <Nofication>사용가능한 닉네임입니다.</Nofication>;
    }
    return null;
  };

  // 패스워드 유효성검사
  const PasswordNofication = () => {
    if (password && password.length < 8) {
      return <Nofication>8자 이상이여야 합니다.</Nofication>;
    }
    return null;
  };


  // 패스워드 확인
  const RetypePasswordNofication = () => {
    if (!passwordCheck && retypePassword) {
      // 두 값이 다르고, 확인 필드에 값이 있는 경우
      return <Nofication>비밀번호가 서로 다릅니다!</Nofication>;
    }
    if (!passwordCheck && !retypePassword) {
      return <Nofication>비밀번호를 재입력하세요!</Nofication>;
    }
    return null;
  };

  // 회원가입
  const ConfirmBtnByCondition = () => {
    if (email && isNotUsingEmail && nickname && isValidNickname && password && retypePassword && passwordCheck && password.length >= 8) {
      // 모든 값이 입력되어 았고, 유효성 및 중복검사, 일치여부를 충족한 경우
      return (
        <Btn action={SignupHandler}>
          <span>회원가입</span>
        </Btn>
      );
    } else {
      return (
        <Btn disabled={true}>
          <span>회원가입</span>
        </Btn>
      );
    }
  };

  return (
    <div>
      <ModalContainer>
        <Backdrop onClick={closeFn} />
        <Modal>
          <CloseBtn onClick={closeFn}><BsXCircleFill size={'2rem'} /></CloseBtn>
          <InnerContainer>

            {/* 이메일 입력 */}
            <div className="fields">
              <div className="form">
                <h3>이메일</h3>
                <EmailNotification />
                <input autoFocus type="email" placeholder="이메일 입력" onChange={emailInputHandler} />
                <EmailCodeBtn />
              </div>
            </div>

            {/* 이메일 코드 6자리 입력 */}
            <div className="fields">
              <div className="form">
                <h3>인증코드</h3>
                <EmailCodeNotification />
                <input type="text" placeholder="6자리 인증코드 입력" onChange={emailCodeHandler} />
              </div>
            </div>

            {/* 닉네임 입력 */}
            <Hline />
            <div className="fields">
              <div className="form">
                <h3>닉네임</h3>
                <NicknameNofication />
                <input type="text" placeholder="닉네임을 입력합니다." onBlur={nicknameCheckHandler} />
              </div>

              {/* 비밀번호 및 비밀번호 확인 */}
              <div className="form">
                <h3>비밀번호 입력</h3>
                <PasswordNofication />
                <input
                  type={"password"}
                  placeholder="비밀번호를 입력합니다."
                  onBlur={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="form">
                <h3>비밀번호 입력 확인</h3>
                <RetypePasswordNofication />
                <input
                  type={"password"}
                  placeholder="다시 한 번 비밀번호를 입력합니다."
                  onChange={(e) => {
                    setRetypePassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <ConfirmBtnByCondition />
          </InnerContainer>
        </Modal>
      </ModalContainer>
    </div>
  );
};