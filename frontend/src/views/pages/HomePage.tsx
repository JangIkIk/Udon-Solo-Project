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
            let tagsStr;
            let region:GroupListType[] = [];
            let regionStr;      
            let title:GroupListType[] = [];
            
            for(let i = 0 ; i < groupList.length ; i++){
              regionStr = selector.searchFilter.includes(groupList[i].groupRegion);
              tagsStr = selector.searchFilter.includes(groupList[i].groupTag);
              
              if(groupList[i].groupTitle.includes(selector.searchText)){
                title.push(groupList[i]);
                  if(tagsStr){
                    tags.push(groupList[i]);
                        if(regionStr){
                          result.push(groupList[i]);
                        }
                  } else if(regionStr){
                        region.push(groupList[i]);
                        if(tagsStr){
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

  },[selector.searchText, selector.searchFilter, groupList])

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
