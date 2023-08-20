import styled from "styled-components";
import { BiCalendarCheck, BiInfoCircle, BiWon} from "react-icons/bi";
import { GroupScheduleType } from "./DetailInfo";
import {
    flex_column_justify_cneter,
    flex_column,
    SpanFlexAlign,
    SpanFlex,
} from "@components/AllComponent";

type DetailmeetimgProps = {
  item: GroupScheduleType;
};

const Layout = styled.div`
    .group-info-meet-info {
        display:flex;
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

        .group-info-meet-info-right {
            flex:1;
        }
    }

    
  

`;

export const Detailmeetimg = ({ item }: DetailmeetimgProps) => {
  return (
    <Layout>
      <div className="group-info-meet-info">
        <div className="group-info-meet-info-left">
          <SpanFlex>2일</SpanFlex>
          <SpanFlex>남았어요</SpanFlex>
        </div>
        <div className="group-info-meet-info-center">
          <SpanFlexAlign>
            {`날짜: ${item.detailMeetDay}`}
          </SpanFlexAlign>
          <SpanFlexAlign>
            {`시간: ${item.detailMeetTime} `}
          </SpanFlexAlign>
          <SpanFlexAlign>
            {`장소: ${item.detailMeetArea}`}
          </SpanFlexAlign>
          <SpanFlexAlign>
            {`금액: ${item.detailMeetMoney}`}
          </SpanFlexAlign>
          <SpanFlexAlign>
            {`참여: 3/20 (17자리남음)`}
          </SpanFlexAlign>
        </div>
        <div className="group-info-meet-info-right">
          <p>이미지자리</p>
        </div>
        <div className="group-info-meet-info-right">
          <p>참여</p>
        </div>
      </div>
    </Layout>
  );
};
