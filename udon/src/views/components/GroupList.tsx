import { useNavigate } from "react-router-dom";
import styled from "styled-components"; 
import "@styles/index.css"
import { BiInfoCircle, BiStreetView, BiBeenHere} from "react-icons/bi";
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
  groupRegion: string,
  groupImg: string,
  groupTitle: string,
  groupPeople: string,
  groupDetailedArea: string,
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
      {item.groupImg === undefined ? null :
       <div className="group-list-img">
        <ImgBase src={item.groupImg} alt="그룹사진"/>
      </div>}
      
      <div className="group-list-content">
        <DivFlexAlign>
            <SpanFlex><BiInfoCircle /></SpanFlex>
          <span>{item.groupRegion}</span>
        </DivFlexAlign>
        <div className="group-list-title">
          <span>{item.groupTitle}</span>
        </div>
        <div className="group-list-info">
          <div>
            <span>
              <BiStreetView />
            </span>
            <span>{`${item.groupPeople}명`}</span>
          </div>

          <div>
            <span>
              <BiBeenHere />
            </span>
            <span>{item.groupDetailedArea}</span>
          </div>          
        </div>
      </div>
    </Layout>
  );
};
