import axios from "axios";
import React from "react";
import GoogleLogin from "react-google-login";
import styled from "styled-components";

import googleIcon from "../img/google_oauth_icon.png"

const Container = styled.section`
  button{
    width: 40px;
    height: 40px;
    background: ${`url(${googleIcon})`};
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    transition: 0.1s;
    
    &:hover{
      transform: translateY(-2px);
    }
}
`

export const GoogleLoginBtn = () => {
  const navigate = useNavigate()
  const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENTID;
  const sessionStorage = window.sessionStorage;
  const serverPath = process.env.REACT_APP_SERVER_PATH;

  const onSuccess = async (e) => {
    const googleTokenId = e.tokenId;

    const postGoogleId = await axios.post(`${serverPath}/api/users/oauth/google`, {
      idToken: googleTokenId,
    });
    if (postGoogleId.status === 200) {
      sessionStorage.setItem("loginToken", postGoogleId.data.accessToken);
      sessionStorage.setItem("userId", postGoogleId.data._id)
      sessionStorage.setItem("loginMethod", "social")
      navigate("/my_pics")
      window.location.reload()
    }
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <Container>
      <GoogleLogin clienId={clientId} buttonText={false} icon={false} responseType={"id_token"} onSuccess={onSuccess} onFailure={onFailure} />
    </Container>
  );
};
