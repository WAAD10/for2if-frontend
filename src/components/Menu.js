import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "../styles/Menu.module.css";
import axios from "axios";

export function Menu({ login, logout }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signIn = async () => {
    const result = await login();
    console.log(result.user.wallets.ethereum.walletId);

    if (result.method !== "cancel") {
      axios
        .post("//localhost:3000/auth/login", {
          uid: result.user.UID,
          wallet: result.user.wallets.ethereum.walletId,
        })
        .then((response) => {
          Cookies.set("userId", result.user.UID);
          Cookies.set("accessToken", response.accessToken);
          setIsLoggedIn(true);
          alert("로그인되었습니다.");
        })
        .catch((e) => {
          console.log(e);
          alert("로그인실패.");
        });
    }
  };

  const signOut = () => {
    logout();
    Cookies.remove("userId");
    setIsLoggedIn(false);
    alert("로그아웃되었습니다.");
  };

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <div>
          <svg
            width="40"
            height="46"
            viewBox="0 0 40 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.2987 3.2121C25.3568 0.943945 25.1291 0.134581 25.0079 0.0134189C24.5426 -0.219213 19.8706 2.63052 17.5928 4.08447C15.4409 4.78237 13.6429 6.31386 13.0128 6.99237C10.0468 10.0166 8.91754 13.9713 8.72368 15.5707C7.85132 18.0133 8.11787 26.8145 8.3602 30.9098C9.17441 30.6772 11.9466 30.8129 13.2309 30.9098C13.2891 30.2119 13.4975 28.8258 13.5944 28.22L9.30526 26.548C9.47974 23.7564 11.365 20.7806 12.2859 19.6417H10.6865C12.6639 14.9891 18.1986 13.8259 20.7187 13.8259H28.4247C30.1694 13.8259 31.0902 13.5351 31.3326 13.3897C31.3326 15.1926 29.394 16.128 28.4247 16.3703H21.9546C16.7786 17.4753 15.6784 26.8145 15.7753 31.346C16.6477 31.346 18.9498 32.1214 19.9918 32.5091V32.291C20.1081 31.5156 20.2384 30.864 20.3676 30.3282C20.6261 29.2566 20.953 28.7208 21.0822 28.5108C21.4893 27.871 22.1 27.5415 22.3908 27.493C21.5911 28.0746 21.0095 32.7272 21.1549 32.7272C21.3003 32.7272 23.5539 33.3815 27.9158 35.5624C31.4053 37.3072 34.8947 37.7434 36.2033 37.7434C35.549 38.6157 28.4247 36.9437 24.1355 34.6901C20.7042 32.8872 16.4054 32.3395 14.6849 32.291H11.1954C3.46039 32.7563 0.508882 38.9792 0 42.0325C10.0032 46.4525 20.9853 46.2974 25.226 45.6674C29.3552 45.3766 33.7316 43.7045 35.4036 42.9049C37.2647 42.0325 38.4569 40.6997 38.8204 40.1424C39.9254 38.8629 40.0562 35.8775 39.9836 34.5447C39.9254 30.997 36.7122 27.6869 35.1128 26.4753C34.7057 25.9518 28.5943 21.9438 25.5895 20.0052C23.3213 18.9002 23.0451 17.9939 23.1905 17.6789H28.8608C30.2566 17.5044 31.0902 17.0246 31.3326 16.8065C32.9028 15.2944 33.0531 12.7355 32.9319 11.645H31.3326C30.751 11.645 28.5701 10.9907 28.0612 10.191C27.6541 9.55131 25.6622 7.59818 24.7171 6.70158C25.1242 5.18947 25.2744 3.74522 25.2987 3.2121Z"
              fill="#1E4CF4"
            />
          </svg>
        </div>
        <div className={styles.frame}>
          <NavLink
            to="/attend"
            className={styles.text}
            style={({ isActive }) => {
              return {
                color: isActive ? "#1073ff" : "#000000",
              };
            }}
          >
            전자 출결
          </NavLink>
          <NavLink
            to="/board"
            className={styles.text}
            style={({ isActive }) => {
              return {
                color: isActive ? "#1073ff" : "#000000",
              };
            }}
          >
            게시판
          </NavLink>
          <NavLink
            to="/mypage"
            className={styles.text}
            style={({ isActive }) => {
              return {
                color: isActive ? "#1073ff" : "#000000",
              };
            }}
          >
            마이 페이지
          </NavLink>
          <div
            className={styles.text}
            onClick={() => {
              isLoggedIn ? signOut() : signIn();
            }}
          >
            {isLoggedIn ? "로그아웃" : "로그인"}
          </div>
        </div>
      </div>
    </div>
  );
}
