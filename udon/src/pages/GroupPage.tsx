import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styled from "styled-components";
import { GroupInfo } from "../components/GroupInfo"
import { GroupNews } from "../components/GroupNews";
import { GroupPhoto } from "../components/GroupPhoto";
import { GroupChat } from "../components/GroupChat"
import { BiLeftArrowAlt } from "react-icons/bi";



const Layout = styled.div`
    header{
        padding: 1rem 0.1rem;
        display:flex;
        align-items:center;
        text-align:center;
        margin-bottom: 2px;

        .group-page-icon{
            font-size:1.5rem;
            display:flex;
            align-items:center;
            cursor: pointer;
        }

        & > h2{
            flex:1;
        }
    }

    main{
        .group-tap{
            font-size: 1.2rem;
            display:flex;
            text-align: center;
            & > li{
                flex:1;
            }
        }
    }
   
`

function GroupPage(){
    const [groupTap, setGroupTap] = useState<number>(0);
    const navigate = useNavigate()
    const tapText = ["정보","게시판","사진첩","채팅"];

     const tapcontent = ()=>{
        
        switch(groupTap){
            case 0 :
                return <GroupInfo/>;
            case 1 :
                return <GroupNews/>;
            case 2 :
                return <GroupPhoto/>;
            case 3 :
                return <GroupChat/>;
            default :
                return null;
        }
     }
     

    return(
        <Layout>
            <header>
                <div onClick={() => navigate(-1)} className="group-page-icon"><BiLeftArrowAlt/></div>
                <h2>{"[정자역] 클라이밍 초자분들 환영 나이제한없음X"}</h2>
            </header>
            <main>
                <ul className="group-tap">
                    {tapText.map((item, idx)=>{
                        return(
                            <li key={idx} onClick={()=> setGroupTap(idx)} style={{ borderBottom: groupTap === idx ? "1px solid black" : "none"}}>{item}</li>
                        );
                    })}
                </ul>
            </main>
            <section>
                {tapcontent()}
            </section>
        </Layout>
    );
}

export default GroupPage;