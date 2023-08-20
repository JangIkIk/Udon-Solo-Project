import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { GroupList, GroupListType } from "@components/GroupList";
import { BaseLayout, flex_column } from '@components/AllComponent';
import { useAppSelector } from "@store/store.ts"


const Layout = styled(BaseLayout)`
    ul{
       ${flex_column};
        gap:10px;
    }
`;

const HomePage = () => {
  const [groupList, setGroupList] = useState<GroupListType[]>([]);
  const selector = useAppSelector( state => state.userInfo.user)

  useEffect(()=>{
    axios.get<GroupListType[]>('/api/group/list')
    .then( res => setGroupList(res.data))

  },[])

  

  return (
    <Layout>
      <main>
        <ul>
            {groupList.map((item)=>{
                return(
                    <li key={item.id}>
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
