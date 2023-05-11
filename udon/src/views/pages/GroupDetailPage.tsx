import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { DetailChat, DetailInfo, DetailNotice, DetailPhoto } from "@groupdetail";


type styleProps = {
    groupTap: number,
}

const Layout = styled.div<styleProps>`
    height:100%;
    background-color: red;
    display: flex;
    // flex-direction: column;

    .grouppage-header{
        position: fixed;
        width: 100%;
        top:0;
        max-width: 1080px;
        min-width: 320px;
        background-color: white;

            header {
                height: 4rem;
                padding: 1rem 0.1rem;
                display: flex;
                align-items: center;
                text-align: center;
            
                .group-page-icon {
                  font-size: 1.5rem;
                  display: flex;
                  align-items: center;
                  cursor: pointer;
                }
            
                & > h2 {
                  flex: 1;
                }
              }
          
              main {
                display:flex;
                height: 3rem;

                .group-tap {
                    flex:1;
                    font-size: 1.2rem;
                    display: flex;
                    text-align: center;

                    & > li {   
                        flex: 1;
                        display:flex;
                        justify-content:center;
                        align-items:center;   
                        
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
    padding-top: 7rem;
  }
`;

function GroupDetailPage() {
  const [groupTap, setGroupTap] = useState<number>(0);
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

  return (
    <Layout groupTap={groupTap}>
      <div className="grouppage-header">
        <header>
          <div onClick={() => navigate(-1)} className="group-page-icon">
            <BiLeftArrowAlt />
          </div>
          <h2>{"[정자역] 클라이밍 초자분들 환영 나이제한없음X"}</h2>
        </header>
        <main>
          <ul className="group-tap">
            {tapText.map((item, idx) => {
              return (
                <li
                    key={idx}
                    onClick={() => setGroupTap(idx)
                }
                >
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
