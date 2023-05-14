import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiMaleFemale, BiBeenHere, BiHeart } from "react-icons/bi";
import { GroupList } from "@components/GroupList";
import { useState, useEffect } from "react";
import { GroupListInfo } from "@pages/HomePage"
import { 
  BaseLayout, 
  ImgBase, 
  flex_column, 
  SpanFlex,
  flex_row_all_cneter,
 } from "@components/AllComponent";

const Layout = styled(BaseLayout)`
    .mypage-info {
      display: flex;
      gap: 1rem;

      .mypage-photo {
        width: 5rem;
      }

      .mypage-content {
        flex: 1;
        display: flex;
        gap: 1rem;

        & > div{
          ${flex_column}        
          justify-content: space-around;
        }
      }

      .mypage-modify {
        ${flex_row_all_cneter}
        flex-basis: 5rem;
        & > button {
          color: blue;
          font-size: 1.2rem;
        }
      }
    }

  .mypage-keep {
    padding-top: 1rem;
    .mypage-keep-content {

      & > ul{
          ${flex_column}
           gap:10px;
      }
    }
  }
`;

function MyPage() {
  const [groupList, setGroupList] = useState<GroupListInfo[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get<any>(`${process.env.REACT_APP_API_ROOT}/groupList`)
    .then( res => setGroupList(res.data));
  },[])

  const clickGroup = ()=>{
    navigate("/group")
}

  return (
    <Layout>
      <div className="mypage-info">
        <div className="mypage-photo">
          <ImgBase src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="#" fit="contain"/>
        </div>
        <div className="mypage-content">
          <div>
            <SpanFlex>홍길동</SpanFlex>
            <SpanFlex><BiMaleFemale /> 남</SpanFlex>
          </div>
          <div>
          <SpanFlex>2000. 11. 09</SpanFlex>
          <SpanFlex><BiBeenHere /> 경기도</SpanFlex>
          </div>
        </div>
        <div className="mypage-modify">
          <button>수정</button>
        </div>
      </div>

      <div className="mypage-keep">
        <h3>
          <BiHeart />
          찜한모임
        </h3>
        <div className="mypage-keep-content">
        <ul>
            {groupList.map((item)=>{
                return(
                  <li key={item.id} onClick={clickGroup} className="group-list"><GroupList item={item}/></li> 
                );
            })}
        </ul>
        </div>
      </div>
    </Layout>
  );
}

export default MyPage;
