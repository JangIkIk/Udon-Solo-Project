import styled from "styled-components";
import { BiCalendarCheck, BiInfoCircle, BiWon, BiHeart } from "react-icons/bi";
import { GroupScheduleType } from "./DetailInfo";
import { DetailPeople } from "./DetailPeople";
import {
    flex_column_justify_cneter,
    flex_column,
    SpanFlexAlign,
    SpanFlex,
    flex_column_all_cneter
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
        }

        .group-info-meet-info-right {
            background-color: green; 
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
            <BiCalendarCheck /> {`${item.day} ${item.time} `}
          </SpanFlexAlign>
          <SpanFlexAlign>
            <BiInfoCircle /> {`${item.detailedArea}`}
          </SpanFlexAlign>
          <SpanFlexAlign>
            <BiWon /> {`${item.money}`}
          </SpanFlexAlign>
        </div>
        <div className="group-info-meet-info-right">
          <DetailPeople personnel={item.user} />
        </div>
      </div>
    </Layout>
  );
};
