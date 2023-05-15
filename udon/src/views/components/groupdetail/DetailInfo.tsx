import { useState } from "react";
import styled from "styled-components";
import { BiCalendarCheck, BiInfoCircle, BiWon, BiHeart } from "react-icons/bi";
import { Detailmeetimg } from "./Detailmeeting";
import { useLocation } from "react-router-dom";
import { ImgBase, flex_row_justify_center, flex_column } from "@components/AllComponent";

const Layout = styled.div`
  height: 100%;
  padding-bottom: 4.5rem;

  .detailinfo-photo {
    ${flex_row_justify_center}
    margin: 0 auto;
    width: 100%;
  }

  .detailinfo-content {
    & > p {
      white-space: pre;
    }

    .detailinfo-groupschedule {
      ${flex_column}
      gap: 1rem;
    }
  }

  .group-info-footer {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    width: 100%;
    text-align: center;
    background-color: white;
    transform: translate(-50%, 0);
    position: fixed;
    max-width: 1080px;
    min-width: 320px;
    bottom: 0;
    left: 50%;
    height: 4.5rem;
    display: flex;
    padding: 0.5rem;

    & > span {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .group-info-footer-keep {
      flex-basis: 10rem;
      color: red;
      font-size: 2rem;
    }

    .group-info-footer-join {
      background-color: blue;
      color: white;
      border-radius: 10px;
      flex: 1;
    }
  }
`;

export type UserType = {
  id: number;
  img: string;
  years: string;
  name: string;
};

export interface GroupScheduleType {
  id: number;
  day: string;
  time: string;
  detailedArea: string;
  money: number;
  user: UserType[];
}

export const DetailInfo = () => {
  const location = useLocation();

  return (
    <Layout>
      <div className="detailinfo-photo">
        <ImgBase src={location.state.img} alt="그룹사진" />
      </div>
      <div className="detailinfo-content">
        <h3>{location.state.title}</h3>
        <p>{location.state.content}</p>
        <div>
          <h5>모임 정모</h5>
          <ul className="detailinfo-groupschedule">
            {location.state.groupSchedule.length !== 0 ? (
              location.state.groupSchedule.map((item: GroupScheduleType) => {
                return (
                  <li key={item.id}>
                    <Detailmeetimg item={item} />
                  </li>
                );
              })
            ) : (
              <li>모임이 없습니다.</li>
            )}
          </ul>
        </div>
        <div className="group-info-footer">
          <span className="group-info-footer-keep">
            <BiHeart />
          </span>
          <span className="group-info-footer-join">가입하기</span>
        </div>
      </div>
    </Layout>
  );
};
