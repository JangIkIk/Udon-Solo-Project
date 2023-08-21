import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Detailmeetimg } from "./Detailmeeting";
import {
  ImgBase,
  flex_row_justify_center,
  flex_column,
} from "@components/AllComponent";
import { GroupListType } from "@components/GroupList";
import { refreshToken, isToken } from "@components/Customhooks";
import { AiFillHeart } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "@store/store.ts";
import {
  userGroupAdd,
  userGroupDelete,
} from "@slice/userSimple-slice";

const Layout = styled.div<{ keepText: boolean, joinListCheck: boolean }>`
  height: 100%;
  padding-bottom: 4.5rem;

  .detailinfo-photo {
    ${flex_row_justify_center}
    margin: 0 auto;
    width: 100%;
  }

  .detailinfo-content {
    & > h3 {
      padding-top: 1rem;
    }

    & > p {
      padding-top: 1rem;
      white-space: pre;
    }

    .detailinfo-time {
      padding-top: 1rem;
      .detailinfo-groupschedule {
        ${flex_column}
        gap: 1rem;
      }
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

    .group-info-keep {
      display:flex;
      justify-content:center;
      align-items:center;
      & > p {
        padding: 1rem;
        font-size: 1.2rem;
        position: absolute;
        background-color: coral;
        top: -3.5rem;
        left: 0;
        border-radius: 3px;
        color: cornsilk;
        opacity: ${(props) => (props.keepText ? "1" : "0")};
        animation: fadeOut 5s forwards;
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    }

    .group-info-footer-join {
      background-color: ${(props) => (props.joinListCheck ? "red" : "blue")};
      color: white;
      border-radius: 10px;
      flex: 1;
      cursor: pointer;
    }
  }
`;

export type UserType = {
  id: number;
  meetUserImg: string | null;
  meetUserName: string;
};

export interface GroupScheduleType {
  id: number;
  detailMeetDay: string;
  detailMeetTime: string;
  detailMeetArea: string;
  detailMeetMoney: string;
  detailMeetUser: UserType[];
}

type groupDetailMeetType = {
  id: number;
  groupId: number;
  detailMeetDay: string;
  detailMeetTime: string;
  detailMeetArea: string;
  detailMeetMoney: string;
  detailMeetUser: string | null
}

interface groubDetailInfoType extends GroupListType {
  groupDetailMeet?: groupDetailMeetType[] | null;
}


export const DetailInfo = () => {
  const [groubDetailInfo, setGroubDetailInfo] = useState<groubDetailInfoType | null>(null);
  const [keepText, setKeepText] = useState<boolean>(false);
  const location = useLocation();
  const selector = useAppSelector((state) => state.userInfo);
  const keepListCheck = selector.user.userKeepGroup.includes(location.state.id);
  const joinListCheck = selector.user.userJoinGroup.includes(location.state.id);
  const navite = useNavigate();
  const dispatch = useAppDispatch();



  
  useEffect(() => {
    axios
      .get<GroupListType>(`/api/group/list/${location.state.id}`)
      .then((res) => setGroubDetailInfo(res.data))
      .catch((err) => console.log("데이터를불러오지못함:" + err));
  }, []);

  const userKeepList = () => {
    if(isToken()){
      setKeepText(true);
    axios
      .post<boolean>(
        '/api/group/keep',
        {
          id: location.state.id,
          groupImg: location.state.groupImg,
          groupTitle: location.state.groupTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${isToken()}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          dispatch(
            userGroupAdd({
              groupType: "userKeepGroup",
              groupId: location.state.id,
            })
          );
        } else {
          dispatch(
            userGroupDelete({
              groupType: "userKeepGroup",
              groupId: location.state.id,
            })
          );
        }
        setTimeout(() => {
          setKeepText(false);
        }, 5000);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          return refreshToken();
        } else {
          console.log("찜하기 오류")
        }
      });
    }else{
      const confirmReload = window.confirm("회원만 가능합니다. 로그인창으로 이동하시겠습니까?");
        if(confirmReload){
          navite("/login");
        }
    }
    
  };

  const userJoinListDelete = () => {

    axios
      .delete<boolean>(`/api/group/join/${location.state.id}`, {
        headers: {
          Authorization: `Bearer ${isToken()}`,
        },
      })
      .then(() => {
        dispatch(
          userGroupDelete({
            groupType: "userJoinGroup",
            groupId: location.state.id,
          })
        );
      });
  };

  const userJoinListAdd = () => {

    if(isToken()){
      axios
      .post<boolean>(
        'api/group/join',
        {
          id: location.state.id,
          groupImg: location.state.groupImg,
          groupTitle: location.state.groupTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${isToken()}`,
          },
        }
      )
      .then(() =>
        dispatch(
          userGroupAdd({
            groupType: "userJoinGroup",
            groupId: location.state.id,
          })
        )
      )
      .catch((err) => {
        if (err.response.status === 401) {
          return refreshToken();
        } else if (err.response.status === 409) {
          console.log(err);
        } else {
          navite("/login");
        }
      });
    } else{
      const confirmReload = window.confirm("회원만 가능합니다. 로그인창으로 이동하시겠습니까?");
        if(confirmReload){
          navite("/login");
        }
    }
    
  };


  return (
    <Layout keepText={keepText} joinListCheck={joinListCheck}>
      <div className="detailinfo-photo">
        <ImgBase src={groubDetailInfo?.groupImg} alt="그룹사진" />
      </div>
      <div className="detailinfo-content">
        <h3>{groubDetailInfo?.groupTitle}</h3>
        <p>{groubDetailInfo?.groupContent}</p>
        <div className="detailinfo-time">
          <h5>모임 정모</h5>
          <ul className="detailinfo-groupschedule">
            {groubDetailInfo?.groupDetailMeet ? (
              groubDetailInfo.groupDetailMeet.map((item: any) => {
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
          <div className="group-info-keep">
            <AiFillHeart
              size={"40px"}
              onClick={userKeepList}
              color={keepListCheck ? "red" : "gray"}
            />
            {keepText === true ? (
              keepListCheck ? (
                <p>찜목록 추가</p>
              ) : (
                <p>찜목록 삭제</p>
              )
            ) : null}
          </div>
          {joinListCheck ? (
            <span className="group-info-footer-join" onClick={userJoinListDelete}>
              탈퇴하기
            </span>
          ) : (
            <span className="group-info-footer-join" onClick={userJoinListAdd}>
              가입하기
            </span>
          )}
        </div>
      </div>
    </Layout>
  );
};
