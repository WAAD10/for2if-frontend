import React, { useEffect, useState } from 'react';
import './layout.css';
import { RingLoader } from 'react-spinners';
import javaLogo from '../../image/java-logo-2.png';
import axios from 'axios';
import Cookies from 'js-cookie';

const AttendPage = () => {
  const [isVisibleMentorPop, setIsVisibleMentorPop] = useState(false);
  const [isVisibleMenteePop, setIsVisibleMenteePop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [data, setData] = useState([]);

  // {
  //   study: [
  //     {
  //       study_id: 1,
  //       study_date: "화요일 16:00 ~ 18:00",
  //       study_name: "자바를 자바자바",
  //       study_image: "http://image.url.com",
  //     }
  //   ]
  // }

  const getStudy = () => {
    axios.get('https://for2if-backend.onrender.com/study').then((res) => {
      console.log(res.data['study']);
      setData(res.data['study']);
    });
  };

  //230705
  //로그인 확인, 안 되어 있으면 alert창
  useEffect(() => {
    checkLoginStatus();
    getStudy();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const uid = Cookies.get('userId');
      if (uid) {
        console.log('로그인 상태');
      } else {
        console.log('로그인 아닌 상태');
      }
    } catch (error) {
      console.log('로그인 상태 확인 중 오류 발생:', error);
    }
    setIsLoading(false);
    //necessary?
    return (
      <div>
        {isLoading ? (
          <div className="loading-spinner">
            <RingLoader size={150} color={'#123abc'} loading={isLoading} />
          </div>
        ) : (
          <div>
            {isLoggedIn ? (
              <p>사용자가 로그인되어 있습니다.</p>
            ) : (
              <p>사용자가 로그인되어 있지 않습니다.</p>
            )}
            {/* 나머지 컴포넌트 코드 */}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <RingLoader color="#123abc" size={80} />
      </div>
    );
  }
  //230705

  function StudyInfo({ study_id, study_date, study_name, study_image }) {
    return (
      <div class="study_list_item">
        <div class="study_info">
          <img src={study_image} alt="Java" class="java-image" />
          <span class="study_text">{study_name}</span>
          <span class="study_text2">정규스터디</span>
          <div class="border_rectangle"></div>
          <span class="study_schedule">{study_date}</span>
        </div>

        <div class="button-container">
          <button class="button1">
            <div class="button1-rectangle"></div>
            <div
              onClick={() => {
                setIsVisibleMenteePop(true);
              }}
              class="button1-text"
            >
              출석하기
            </div>
          </button>
          <button class="button2">
            <div class="button2-rectangle"></div>
            <div
              onClick={() => {
                setIsVisibleMentorPop(true);
              }}
              class="button2-text"
            >
              코드생성
            </div>
          </button>
        </div>
      </div>
    );
  }

  const Popup = () => {
    const [timer, setTimer] = useState(300); // 초기 타이머 값 (초 단위)
    useEffect(() => {
      let intervalId;

      if (timer > 0) {
        intervalId = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      }

      return () => {
        clearInterval(intervalId);
      };
    }, [timer]);

    // 타이머 값 변환 함수 (초를 분:초 형식으로 변환)
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    };
    return (
      <div class="popup">
        <div class="Message">
          출석코드가 생성되었습니다. <br /> 멘티들에게 출석 코드를 알려주세요
        </div>
        <div class="attend-code">1234</div>
        <div class="countdown">{formatTime(timer)} 후에 자동 마감됩니다. </div>
        <div class="button-container2">
          <button class="button3">
            <div class="button3-rectangle">
              <div class="button3-text">마감하기</div>
            </div>
          </button>
          <button class="button4">
            <div class="button4-rectangle">
              <div
                onClick={() => {
                  setIsVisibleMentorPop(false);
                }}
                class="button4-text"
              >
                닫기
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  };

  const Popup2 = () => {
    return (
      <div class="popup">
        <div class="Message">
          멘토에게 받은 <br /> 출석 코드를 입력해주세요
        </div>
        <div class="attend-code2">5678</div>
        <div class="warning">코드가 일치하지 않습니다. </div>
        <div class="button-container2">
          <button class="button3">
            <div class="button3-rectangle">
              <div class="button3-text">출석하기</div>
            </div>
          </button>
          <button class="button4">
            <div class="button4-rectangle">
              <div
                onClick={() => {
                  setIsVisibleMenteePop(false);
                }}
                class="button4-text"
              >
                취소하기
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  };
  // export default Popup;

  // export default StudyInfo;

  return (
    <div id="container">
      {isVisibleMentorPop ? <Popup /> : null}
      {isVisibleMenteePop ? <Popup2 /> : null}

      <br />
      <div class="study_box">
        <div class="study_list_cover">
          <div class="study_list">스터디 목록</div>
        </div>
        {data.map((study) => (
          <StudyInfo
            study_id={study.study_id}
            study_date={study.study_date}
            study_name={study.study_name}
            study_image={study.study_image}
          />
        ))}
      </div>
    </div>
  );
};

export default AttendPage;
