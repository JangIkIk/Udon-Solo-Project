import styled from "styled-components";
import { BiCalendarCheck, BiInfoCircle, BiWon } from "react-icons/bi";
import { useState } from "react";
import { GroupPeople } from "./GroupPeople";

type stylesProps ={
    profile: number
}

const Layout = styled.div<stylesProps>`
    padding-bottom: 4.5rem;

    .group-info-photo {
      display: flex;
      justify-content: center;
      background-color: red;
      max-height: 25rem;
      img {
        width: 100%;
      }
    }

    .group-info-content {
        padding: 1rem;
        .group-info-subtitle {
        }

        .group-info-subcontent {
          white-space: pre;
          padding-top: 1rem;
        }
        .group-info-meet {
          padding: 1rem;
        }

        .group-info-meet-info {
          display: flex;
          gap: 1rem;
        }

        .group-info-meet-list {
          padding: 0.5rem;
        }

        .group-info-meet-info-left {
            flex-basis: 4rem;
            align-self: center;
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 0.2rem;
        }

        .group-info-meet-info-center {
            flex-basis: 14rem;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;

            & > div {
                display: flex;
                align-items: center;

                & > span:first-child {
                  display: flex;
                  gap: 0.5rem;
                }
            }
        }

        .group-info-meet-info-right {
            flex: 1;
            flex-basis: 8.5rem;
        }
    }

    .group-info-join{
        margin: 0 auto;
        width: 100%;
        text-align: center;
        background-color:white;
        position: fixed;
        max-width: 1080px;
        min-width: 320px;
        bottom:0;
        left: 0px;
        height: 4.5rem;
        display:flex;
        justify-content:center;
        align-items:center;
    }
`;

export const GroupInfo = () => {
  const [profile, setProfile] = useState<number[]>([1, 2, 3, 4]);
  const text = `
    안녕하세요 정자역 클라이밍입니다.
    클라이밍을 재밌게하실분들을 모집합니다!!

    since 22.10.16
    ♈️가입조건
    > 활발한 활동 가능!!
    > 나이 : 민증만있으면가능!!
    > 왕초보 모두가능!!
    since 22.10.16
    ♈️가입조건
    > 활발한 활동 가능!!
    > 나이 : 민증만있으면가능!!
    > 왕초보 모두가능!!
    since 22.10.16
    ♈️가입조건
    > 활발한 활동 가능!!
    > 나이 : 민증만있으면가능!!
    > 왕초보 모두가능!!
    since 22.10.16
    ♈️가입조건
    > 활발한 활동 가능!!
    > 나이 : 민증만있으면가능!!
    > 왕초보 모두가능!!
    since 22.10.16
    ♈️가입조건
    > 활발한 활동 가능!!
    > 나이 : 민증만있으면가능!!
    > 왕초보 모두가능!!
    since 22.10.16
    ♈️가입조건
    > 활발한 활동 가능!!
    > 나이 : 민증만있으면가능!!
    > 왕초보 모두가능!!
    `;

  return (
    <Layout profile={profile.length}>
      <div className="group-info-photo">
        <img
          src="https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjhfMjAz/MDAxNTg4MDQwOTA5MjE0.i6ARBaBdi_HYODiTR0f1ma8OvblzSh01bJGL8U5gDZUg.1oPlzYogIg8H_TAk5iZvUMYOLsZkZM1ITTVrfUsIHHog.JPEG.mijung011040/20200424_192926.jpg?type=w800"
          alt="클라이밍사진"
        />
      </div>
      <div className="group-info-content">
        <div className="group-info-subtitle">
          <h3>{"[정자역] 클라이밍 초자분들 환영 나이제한없음X"}</h3>
        </div>

        <p className="group-info-subcontent">{text}</p>

        <div className="group-info-meet">
          <h5>모임 정모</h5>
          <div className="group-info-meet-list">
            <div className="group-info-meet-info">
              <div className="group-info-meet-info-left">
                <span>일요일</span>
                <span>내일</span>
              </div>

              <div className="group-info-meet-info-center">
                <div>
                  <span>
                    <BiCalendarCheck /> {"10월 4일 (일) 오후 1:30분"}
                  </span>
                </div>
                <div>
                  <span>
                    <BiInfoCircle /> {"안국역 원서레인즈"}
                  </span>
                </div>
                <div>
                  <span>
                    <BiWon /> {"18.000원"}
                  </span>
                </div>
              </div>
              <div className="group-info-meet-info-right">
                <GroupPeople personnel={profile}/>
              </div>
            </div>
          </div>
        </div>
        <div className="group-info-join">
            <span>가입하기</span>
        </div>
      </div>
    </Layout>
  );
};
