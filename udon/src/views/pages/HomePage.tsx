import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GroupList } from "@components";
import { BaseLayout, flex_column } from '@components/AllComponent'
import { useEffect, useState } from "react";
import axios from "axios";

export interface GroupListInfo{
  id: number,
  region: string,
  img: string,
  title: string,
  people: string,
  detailedArea: string,
  iskeep: boolean,
}

const Layout = styled(BaseLayout)`
    ul{
       ${flex_column}
        gap:10px;
    }
`;



const HomePage = () => {
  const [groupList, setGroupList] = useState<GroupListInfo[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get<GroupListInfo[]>(`${process.env.REACT_APP_API_ROOT}/groupList`)
    .then( res => setGroupList(res.data))
    
  },[])

    const clickGroup = ()=>{
        navigate("/group")
    }

  return (
    <Layout>
      <main>
        <ul>
            {groupList.map((item)=>{
                return(
                    <li key={item.id} onClick={clickGroup}>
                      <GroupList item={item}/>
                    </li>
                );
            })}
        </ul>
      </main>
    </Layout>
  );
};

export default HomePage;
