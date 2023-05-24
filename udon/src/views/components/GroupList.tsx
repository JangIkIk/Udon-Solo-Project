import styled from "styled-components"; 
import { useNavigate } from "react-router-dom";
import "@styles/index.css"
import { BiInfoCircle, BiStreetView, BiBeenHere} from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { 
  ImgBase, 
  SpanFlex, 
  DivFlexAlign,
  flex_column,
  flex_row_align_center,
  baseHover,
  baseBorder,
} from "@components/AllComponent";


export interface GroupListType{
  id: number,
  region: string,
  img: string,
  title: string,
  people: string,
  detailedArea: string,
  iskeep: boolean,
}

type GroupListTypeProps = {
  item: GroupListType;
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
    gap:2px;

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
        ${flex_row_align_center}
        gap: 1rem;
        font-size: 0.9rem;
        & > div{
          display:flex;
        }
        
    }
  }
  
`;

export const GroupList = ( { item } : GroupListTypeProps ) => {
  const navigate = useNavigate();

  const clickGroup = ()=>{
    navigate("/group", {state: item})
  }


  return (
    <Layout onClick={clickGroup}>
      {item.img === undefined ? null :
       <div className="group-list-img">
        <ImgBase src={item.img} alt="그룹사진"/>
      </div>}
      
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
          {item.iskeep === undefined ? null : <div>
            <span >
              <AiFillHeart color={item.iskeep ? "red" : "black"}/>
            </span>
            <span>{"찜하기"}</span>
          </div>}
          
        </div>
      </div>
    </Layout>
  );
};
