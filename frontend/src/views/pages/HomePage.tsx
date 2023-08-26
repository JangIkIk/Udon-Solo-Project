import styled from "styled-components";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { GroupList, GroupListType } from "@components/GroupList";
import { BaseLayout, flex_column } from "@components/AllComponent";
import { useAppSelector } from "@store/store.ts";


const Layout = styled(BaseLayout)`
  ul {
    ${flex_column};
    gap: 10px;
  }
`;

const HomePage = () => {
  const [groupList, setGroupList] = useState<GroupListType[]>([]);
  const selector = useAppSelector((state) => state.search);
  
  
  const filteredList = useMemo(()=>{    
    if (selector.searchText === "") {
      return groupList;
    } else{
            let result:GroupListType[] = [];
            let tags:GroupListType[] = [];
            let region:GroupListType[] = [];
            let title:GroupListType[] = [];

            for(let i = 0 ; i < groupList.length ; i++){
              if(groupList[i].groupTitle.includes(selector.searchText)){
                title.push(groupList[i]);
                  if(selector.searchFilter.includes(groupList[i].groupTag)){
                    tags.push(groupList[i]);
                        if(selector.searchFilter.includes(groupList[i].groupRegion)){
                          result.push(groupList[i]);
                        }
                  } else if(selector.searchFilter.includes(groupList[i].groupRegion)){
                      region.push(groupList[i]);
                        if(selector.searchFilter.includes(groupList[i].groupTag)){
                          result.push(groupList[i]);
                        }
                  }
              }
            }
            if(result.length > 0){
              return result;
            } else if(tags.length > 0){
              return tags;
            } else if(region.length > 0){
              return region;
            } else{
              return title;
            }
    }

  },[selector,groupList])

  useEffect(() => {
    if (selector.searchText === "") {
      axios
        .get<GroupListType[]>("/api/group/list")
        .then((res) => setGroupList(res.data));
    } 
  }, []);

  return (
    <Layout>
      <main>
        <ul>
          {filteredList.length !== 0 ? filteredList.map((list) => {
            return (
              <li key={list.id}>
                <GroupList item={list} />
              </li>
            );
          }) : <p>검색결과가 없습니다.</p>}
        </ul>
      </main>
    </Layout>
  );
};

export default HomePage;
