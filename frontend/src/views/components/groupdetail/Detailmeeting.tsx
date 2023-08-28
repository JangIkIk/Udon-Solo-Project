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
import { userGroupAdd, userGroupDelete } from "@slice/userSimple-slice";
import { format, parse, parseISO, differenceInDays } from "date-fns";
import koLocale from 'date-fns/locale/ko'; 
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

      & > ul{
          height: 100%;
          min-width: 100px;
          display:flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content:center;
          gap: 0.5rem;
          
        & > li{
            width: 1.5rem;
          
          & > img{
            border-radius: 50%;
            width: 100%;
            height: 100%;
          }
          & > span{

          }
        }
      }
    }
    .group-info-meet-info-button {
      display: flex;
      justify-content: center;
      align-items: cetner;
      & > button {
        border-radius: 10px;
        padding: 0.5rem;
        background-color: blue;
        color: white;
        cursor: pointer;
        min-width: 48px;
      }

      .button-red{
        background-color: red;
      }
      .button-blue{
        background-color: blue;
      }
      .button-gray{
        background-color: gray;
      }
    }
  }
`;

export const Detailmeetimg = ({ item }: DetailmeetimgProps) => {
  const navite = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.userInfo.user);
  const isJoin = selector.userJoinGroup.includes(item.groupInfoId);
  const meetPeople = !isNaN(item.detailMeetUser?.length) ? item.detailMeetUser?.length : 0 ;
  const parseTime = parse(item.detailMeetDay, 'yyyy-MM-dd', new Date());
  const formatTime = format(parseTime, `M월 d일 (E)`, {locale: koLocale});
  const currentDate = new Date();
  const formatDate = format(currentDate, "yyyy-MM-dd");
  const changeDate1 = parseISO(item.detailMeetDay);
  const changeDate2 = parseISO(formatDate);
  const dDay = differenceInDays(changeDate1, changeDate2);

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
              groupInfoId: item.groupInfoId,
              detailMeetId: item.id
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
    
    if(isToken()){
      const confirmReload = window.confirm("참여일정을 취소하시겠습니까?")
        if(confirmReload){
          axios.delete(`/api/group/attend/${id}`,{
            headers: {
              Authorization: `Bearer ${isToken()}`
            }
          })
          .then( () => {
            dispatch(userGroupDelete( {groupType: "userDayGroup", groupId: id}));
            window.location.reload();
          })
          .catch( err => console.log(err))
        }
    }
    
  }
  return (
    <Layout>
      <div className="group-info-meet-info">
        <div className="group-info-meet-info-left">
          <SpanFlex>{dDay !== 0 ? `D - ${dDay}` : "오늘"}</SpanFlex>
        </div>
        <div className="group-info-meet-info-center">
          <SpanFlexAlign>{`날짜: ${formatTime}`}</SpanFlexAlign>
          <SpanFlexAlign>{`시간: ${item.detailMeetTime} `}</SpanFlexAlign>
          <SpanFlexAlign>{`장소: ${item.detailMeetArea}`}</SpanFlexAlign>
          <SpanFlexAlign>{`금액: ${item.detailMeetMoney}`}</SpanFlexAlign>
          <SpanFlexAlign>{`참여: ${meetPeople}/10`}</SpanFlexAlign>
        </div>
        <div className="group-info-meet-info-img">
          <ul>
            {item.detailMeetUser &&
              item.detailMeetUser.map((data) => {
                return (
                  <li key={data.id}>
                    <img src={data.meetUserImg ? data.meetUserImg : `${process.env.PUBLIC_URL}/images/simple.png`} />
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="group-info-meet-info-button">
          {meetPeople === 10 && !selector.userDayGroup.includes(item.id) ? <button onClick={() => alert("인원을 초과하였습니다.")} className="button-gray" >만석</button> : null}
          {meetPeople === 10 && selector.userDayGroup.includes(item.id) ? <button className="button-red" onClick={() => noAttending(item.id)}>취소</button> : null}
          {meetPeople !== 10 && !selector.userDayGroup.includes(item.id) ? <button className="button-blue" onClick={() => attend(item.id)}>참여</button> : null}
          {meetPeople !== 10 && selector.userDayGroup.includes(item.id) ? <button className="button-red" onClick={() => noAttending(item.id)}>취소</button>  : null}
        </div>
      </div>
    </Layout>
  );
};
