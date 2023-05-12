import styled from "styled-components";
import "@styles/index.css"
import { BiInfoCircle, BiStreetView, BiBeenHere} from "react-icons/bi";
import { GroupListInfo } from "@pages/HomePage";
import { AiFillHeart } from "react-icons/ai";
import { 
  flex_row_all_cneter, 
  ImgCover, 
  SpanFlex, 
  DivFlexAlign,
  flex_column,
  flex_row_align_center,
  baseHover,
  baseBorder,
} from "@components/AllComponent";


type GroupListInfoProps = {
  item: GroupListInfo;
}

const Layout = styled.div`
  display: flex;
  ${baseBorder}
  border-radius: 10px;
  padding: 1rem;
  gap:10px;
  
  ${baseHover}
  
  .group-list-img {
    width: 8rem;
    height: 8rem;
    overflow: hidden;
    border-radius: 50%;
  }

  .group-list-content {
    font-size:1.1rem;
    flex: 1;
    ${flex_column}
    overflow: hidden;

    .group-list-title{
        font-size: 1.2rem;
        ${flex_row_align_center}
        flex:1;
        span{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .group-list-info{
        ${flex_row_all_cneter}
        gap: 1rem;
        font-size: 0.9rem;
        & > div{
          display:flex;
        }
        
    }
  }
  
`;



export const GroupList = ( { item } : GroupListInfoProps ) => {
  
  return (
    <Layout>
      <div className="group-list-img">
        <ImgCover src={item.img} alt="그룹사진"/>
      </div>
      <div className="group-list-content">
        <DivFlexAlign>
            <SpanFlex><BiInfoCircle /></SpanFlex>
          <span>{item.region}</span>
        </DivFlexAlign>
        <div className="group-list-title">
          <span>{item.title}</span>
        </div>
        <div className="group-list-info">
          <div>
            <span>
              <BiStreetView />
            </span>
            <span>{`${item.people}명`}</span>
          </div>

          <div>
            <span>
              <BiBeenHere />
            </span>
            <span>{item.detailedArea}</span>
          </div>
          <div>
            <span >
              <AiFillHeart color={item.iskeep ? "red" : "black"}/>
            </span>
            <span>{"찜하기"}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
