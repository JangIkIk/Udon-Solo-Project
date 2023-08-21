import styled from "styled-components";
import { refreshToken, isToken } from "@components/Customhooks";
import { GroupScheduleType } from "./DetailInfo";
import {
  flex_column_justify_cneter,
  flex_column,
  SpanFlexAlign,
  SpanFlex,
} from "@components/AllComponent";
import axios from "axios";
import { useAppSelector } from "@store/store.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@store/store";
import { userGroup, userGroupAdd } from "@slice/userSimple-slice";

interface DetailmeetimgPropsType extends GroupScheduleType {
  groupInfoId: number;
}

type DetailmeetimgProps = {
  item: DetailmeetimgPropsType;
};

const Layout = styled.div`
  .group-info-meet-info {
    display: flex;
    padding: 1rem;
    gap: 1rem;

    .group-info-meet-info-left {
      flex-basis: 4rem;
      ${flex_column_justify_cneter}
      gap: 0.2rem;
    }

    .group-info-meet-info-center {
      ${flex_column}
      justify-content: space-around;
      gap: 0.2rem;
      flex-basis: 13rem;
    }

    .group-info-meet-info-img {
      flex: 1;
      background-color: yellow;
    }
    .group-info-meet-info-button {
      display: flex;
      justify-content: center;
      align-items: cetner;
      & > button {
        border-radius: 10px;
        padding: 1rem;
        background-color: blue;
        color: white;
        cursor: pointer;
      }
    }
  }
`;

export const Detailmeetimg = ({ item }: DetailmeetimgProps) => {
  const navite = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.userInfo.user);
  const isJoin = selector.userJoinGroup.includes(item.groupInfoId);

  const attend = (id: number) => {
    if (!isJoin) {
      return alert("가입되어있지 않은 그룹입니다.");
    }

    if (isToken()) {
      const confirmReload = window.confirm("모임에 참여하시겠습니까?");
      if (confirmReload) {
        axios
          .post<boolean>(
            "/api/group/attend",
            {
              detailMeetId: item.id,
            },
            {
              headers: {
                Authorization: `Bearer ${isToken()}`,
              },
            }
          )
          .then(() => {
            dispatch(userGroupAdd({ groupType: "userDayGroup", groupId: id }));
            window.location.reload();
          })
          .catch((err) => {
            if (err.response.status === 401) {
              return refreshToken();
            } else {
              console.log("오류");
            }
          });
      }
    } else {
      const confirmReload = window.confirm(
        "회원만 가능합니다. 로그인창으로 이동하시겠습니까?"
      );
      if (confirmReload) {
        navite("/login");
      }
    }
  };

  const noAttending = (id: number)=>{
    console.log(id)

  }

  return (
    <Layout>
      <div className="group-info-meet-info">
        <div className="group-info-meet-info-left">
          <SpanFlex>2일</SpanFlex>
          <SpanFlex>남았어요</SpanFlex>
        </div>
        <div className="group-info-meet-info-center">
          <SpanFlexAlign>{`날짜: ${item.detailMeetDay}`}</SpanFlexAlign>
          <SpanFlexAlign>{`시간: ${item.detailMeetTime} `}</SpanFlexAlign>
          <SpanFlexAlign>{`장소: ${item.detailMeetArea}`}</SpanFlexAlign>
          <SpanFlexAlign>{`금액: ${item.detailMeetMoney}`}</SpanFlexAlign>
          <SpanFlexAlign>{`참여: 3/20 (17자리남음)`}</SpanFlexAlign>
        </div>
        <div className="group-info-meet-info-img">
          <ul>
            {item.detailMeetUser &&
              item.detailMeetUser.map((data) => {
                return (
                  <li key={data.id}>
                    <img src="#" />
                    <span>{data.meetUserName}</span>
                  </li>
                );
              })}
          </ul>
          <img src=""></img>
        </div>
        <div className="group-info-meet-info-button">
          {selector.userDayGroup.includes(item.id) ? (
            <button onClick={() => noAttending(item.id)}>취소</button>
          ) : (
            <button onClick={() => attend(item.id)}>참여</button>
          )}
        </div>
      </div>
    </Layout>
  );
};
