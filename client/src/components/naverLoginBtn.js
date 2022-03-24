// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const NaverLoginBtn = () => {
//   window.onload = function naver() {
//     const naverLogin = new window.naver.LoginWithNaver({
//       clientId: "클라이언트ID",
//       loginButton: {
//         color: "green",
//         type: 3,
//         height: 60,
//       },
//     });

//     naverLogin.init();
//     naverLogin.logout();
//     naverLogin.getLoginStatus((status) => {
//       if (status) {
//         console.log(naverLogin.user, "로그인 상태");
//         const { id, email, gender } = naverLogin.user;

//         if (gender === undefined) {
//           alert("성별은 필수 동의 입니다.");
//           naverLogin.repromt();
//           return;
//         }
//       } else {
//         console.log("로그인 상태가 아닙니다");
//       }
//     });
//   };
//   return <div id="naverIdLogin">NaverLoginBtn1!!!</div>;
// };
