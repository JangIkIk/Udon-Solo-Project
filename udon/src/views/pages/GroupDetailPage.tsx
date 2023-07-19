import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@store/store.ts";
import { DetailChat, DetailInfo, DetailNotice, DetailPhoto } from "@groupdetail";
import { BaseLayout, fixedBase, flex_row_align_center, flex_row_all_cneter} from "@components/AllComponent";
import { refreshToken, isToken } from "@components/Customhooks";
import { BiLeftArrowAlt } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";


type styleProps = {
    groupTap: number,
}

const Layout = styled(BaseLayout)<styleProps>`
    display: flex;
    font-size: 1rem;
    text-align: center;
    
    .grouppage-header{
      ${fixedBase}
        top:0;
              header {
                height: 4rem;
                padding: 1rem 0.1rem;
                ${flex_row_align_center}

                & > h2 {
                  flex: 1;
                }
                .group-page-icon {
                  font-size: 1.5rem;
                  ${flex_row_align_center}
                  cursor: pointer;
                }
               
              }
          
              main {
                display:flex;
                height: 3rem;

                .group-tap {
                    flex:1;
                    font-size: 1.2rem;
                    display: flex;
                    & > li {   
                        flex: 1;
                        ${flex_row_all_cneter}
                        cursor: pointer;  
                        
                        &:nth-child(${( {groupTap} )=> groupTap + 1}){
                            color: blue;
                            border-bottom: 2px solid blue;
                        }
                    }
                }
              }
      }

    .grouppage-main{
      flex:1;
      text-align: left;
      padding-top: 6rem;
    }
`;

function GroupDetailPage() {
  const [groupTap, setGroupTap] = useState<number>(0);
  const selector = useAppSelector( state => state.userGroupKeepList);
  const location = useLocation();
  const navigate = useNavigate();
  const tapText = ["정보", "게시판", "사진첩", "채팅"];

  
  
  

  const tapcontent = () => {
    switch (groupTap) {
      case 0:
        return <DetailInfo />;
      case 1:
        return <DetailNotice />;
      case 2:
        return <DetailPhoto />;
      case 3:
        return <DetailChat />;
      default:
        return null;
    }
  };

  const userKeepList = ()=>{
  
    const keepData = {
      id: location.state.id,
      groupRegion: location.state.groupRegion,
      groupImg: location.state.groupImg,
      groupTitle: location.state.groupTitle,
      groupPeople: location.state.groupPeople,
    }

    
    axios.post("/groupkeep",keepData,{
      headers:{
        Authorization: `Bearer ${isToken()}`
      }
    })
    .then( (res) => console.log(res) )
    .catch( err => {
      if(err.response.status === 401){
        return refreshToken();
      } else{
        console.log(err);
      }
    })
    
  }

  return (
    <Layout groupTap={groupTap}>
      <div className="grouppage-header">
        <header>
          <div onClick={() => navigate(-1)} className="group-page-icon">
            <BiLeftArrowAlt />
          </div>
          <h2>{location.state.groupTitle}</h2>
          <AiFillHeart size={"80px"} onClick={userKeepList} color={ selector.userKeepList?.includes(location.state.id) ? "red" : "black"}/>
        </header>
        <main>
          <ul className="group-tap">
            {tapText.map((item, idx) => {
              return (
                <li
                    key={idx}
                    onClick={() => setGroupTap(idx)}>
                  {item}
                </li>
              );
            })}
          </ul>
        </main>
      </div>
      <section className="grouppage-main">{tapcontent()}</section>
    </Layout>
  );
}

export default GroupDetailPage;
