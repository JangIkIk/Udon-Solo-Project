import styled from "styled-components";
import { GroupList, GroupListType } from "@components/GroupList";
import { BaseLayout, flex_column } from '@components/AllComponent'
import { useEffect, useState } from "react";
import axios from "axios";

// --- 임시보류
// import {useAppDispatch, useAppSelector} from "../store/store";
// import { plus } from "../slice/counter-slice"

// function Test(){
//   const value = useAppSelector((state)=> state.counter.value );
//   const dispatch = useAppDispatch();
  
//   console.log(value)
//   function handleToken(){
//     dispatch(plus())
//   }
  
// }



const Layout = styled(BaseLayout)`
  
    ul{
       ${flex_column}
        gap:10px;
        background-color: gray;
    }
`;



const HomePage = () => {
  const [groupList, setGroupList] = useState<GroupListType[]>([]);


  useEffect(()=>{
    axios.get<GroupListType[]>(`groupList`)
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
