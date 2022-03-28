import axios from "axios";
import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";

const clientId = "353069671930-smkb2729kl0ebt25o2bmkqjj4hbkjvvv.apps.googleusercontent.com";

export const GoogleLoginBtn = () => {
  const localStorage = window.localStorage
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const navigate = useNavigate();

  const onSuccess = async (e) => {
    const googleTokenId = e.tokenId;

    const postGoogleId = await axios.post(`${serverPath}/api/users/oauth/google`, {
      idToken: googleTokenId,
    });
    if (postGoogleId.status === 200) {
      localStorage.setItem("loginToken", postGoogleId.data.accessToken);
      localStorage.setItem("userId", postGoogleId.data._id)
      window.location.reload()
    }
  };

  useEffect(() => { }, []);
  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div>
      <GoogleLogin clienId={clientId} responseType={"id_token"} onSuccess={onSuccess} onFailure={onFailure} />
    </div>
  );
};
