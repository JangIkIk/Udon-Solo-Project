import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GroupList, GroupListType } from "@components/GroupList";
import { BaseLayout, flex_column } from '@components/AllComponent'
import { useEffect, useState } from "react";
import axios from "axios";

const Layout = styled(BaseLayout)`
  
    ul{
       ${flex_column}
        gap:10px;
    }
`;



const HomePage = () => {
  const [groupList, setGroupList] = useState<GroupListType[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get<GroupListType[]>(`${process.env.REACT_APP_API_ROOT}/groupList`)
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
