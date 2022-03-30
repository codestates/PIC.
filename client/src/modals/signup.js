import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  display: grid;
  place-items: center;

  width: 100%;
  height: 100%;

  /* z-index: 999; */
`;

const Btn = styled.div`
  display: grid;
  place-items: center;
  width: 305px;
  height: 40px;
  background-color: ${(props) => (props.disabled ? "#DDDDDD" : "#FFD600")};
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  transition: 0.1s;
  &:hover {
    transform: ${(props) => (props.disabled ? "null" : "translateY(-2px)")};
    box-shadow: ${(props) => (props.disabled ? "null" : "0px 5px 4px rgba(0,0,0,0.1)")};
  }
  span {
    position: relative;
    top: 2px;
  }
`;
const Forms = styled.div`
  position: absolute;
  top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 1000px;
  .fields {
    display: grid;
    justify-content: center;
    width: 305px;
    min-height: 50px;
    margin-top: 50px;
  }
  .fields > div {
    margin-bottom: 20px;
  }
  .fields input {
    width: 305px;
    height: 38px;
    margin-top: 6px;
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
const StyledSubmitBtn = styled.button`
  margin-top: 20px;
  width: 100%;
  height: 35px;
  font-size: 1rem;
`;
const ConfirmBtn = styled(Btn)`
  margin-top: 30px;
`;
const Nofication = styled.div`
  position: absolute;
  top: 2px;
  right: 0;
  font-size: 0.8rem; ;
`;

export const Signup = () => {
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

  //todo 이메일 입력창 이벤트를 사용하기위해서 만든 함수 _ com,co 요청 손 봐야함  (리펙토링해야함!!!!!)
  const emailCheckHandler = (e) => {
    const tailCheck = () => {
      const tail = e.tatget.value.split('.')[1]
      console.log(tail);

      if (tail === 'com' || tail === 'co.kr') return true
      else return false
    }

    // input에 입력된 값을 원하는 상태에 저장합니다.
    if (tailCheck && validateEmail(e.target.value)) {
      setEmail(e.target.value)
    }
  };
  //todo -------------------------------------------------------------


  useEffect(() => {
    (async () => {
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
    })();
  }, [email, serverPath]);
  // useEffect 를 이용하여, email 상태가 바뀌면 email 요청을 보낸다.
  // 위의 문법은 즉시실행함수로, 호출하지 않고 1회성으로 함수를 실행 시킬 수 있다.
  // 이후 응답에 따라 분기하여 상태를 변경한다.

  //-------- 이메일 코드관련 ----------
  // 회원가입 전 이메일인증 -> 코드6자리 발급받는 요청
  const sendEmailCode = async () => {
    const res = await axios.post(`${serverPath}/api/users/mail`, {
      email: email,
    });
    console.log(res.data.authNum)
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
      console.log("죠옷습니돠")
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
      naviagate("/");
      // 유즈네비게이트로 200시에 /login 으로 이동하겠다 의미.
    }
  };


  //! -------------------------------------- 3.컴포넌트------------------------------------
  // 이메일 유효성검사
  const EmailNotification = () => {
    if (!isNotUsingEmail && email && validateEmail(email)) {
      return <Nofication>중복된 이메일입니다.</Nofication>;
    }
    if (isNotUsingEmail && email.length > 0 && validateEmail(email)) {
      return <Nofication>사용 가능한 이메일입니다.</Nofication>;
    }
    if (email && !validateEmail(email)) {
      return <Nofication>올바른 이메일을 입력하세요.</Nofication>;
    }
    return null;
  };

  // 이메일 인증 보내기 버튼
  const EmailCodeBtn = () => {
    return isNotUsingEmail ? <StyledSubmitBtn onClick={sendEmailCode}>인증</StyledSubmitBtn> : <StyledSubmitBtn disabled>인증</StyledSubmitBtn>;
  };


  // 이메일 코드 6자리 검사
  const EmailCodeNotification = () => {
    if (!isValidEmailCode && codeInputValue) {
      return <Nofication>코드가 서로 다릅니다.</Nofication>;
    }
    if (isValidEmailCode && codeInputValue) {
      return <Nofication>확인 했습니다.</Nofication>;
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
    if (email && isNotUsingEmail && nickname && isValidNickname && password && retypePassword && password.length >= 8) {
      // 모든 값이 입력되어 았고, 유효성 및 중복검사, 일치여부를 충족한 경우
      return (
        <ConfirmBtn onClick={SignupHandler}>
          <span>회원가입</span>
        </ConfirmBtn>
      );
    } else {
      return (
        <ConfirmBtn disabled={true}>
          <span>회원가입</span>
        </ConfirmBtn>
      );
    }
  };

  return (
    <div>
      <Container>
        <Forms>
          {/* 이메일 입력 */}
          <div className="fields">
            <div className="form">
              <div>이메일</div>
              <EmailNotification />
              <input type="email" placeholder="이메일 입력" onChange={emailCheckHandler} />
              <EmailCodeBtn />
            </div>

            {/* // onChange={() => setIsNotUsingEmail(false)}  */}


            {/* 이메일 코드 6자리 입력 */}
            <div className="fields">
              <div className="form">
                <div>인증코드</div>
                <EmailCodeNotification />
                <input type="text" placeholder="6자리 인증코드 입력" onChange={emailCodeHandler} />
              </div>
            </div>

            {/* 닉네임 입력 */}
            <div className="fields">
              <div className="form">
                <div>닉네임</div>
                <NicknameNofication />
                <input type="text" placeholder="닉네임을 입력합니다." onBlur={nicknameCheckHandler} />
              </div>
            </div>

            {/* 비밀번호 및 비밀번호 확인 */}
            <div className="form">
              <div>비밀번호 입력</div>
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
              <div>비밀번호 입력 확인</div>
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
        </Forms>
      </Container>
    </div>
  );
};