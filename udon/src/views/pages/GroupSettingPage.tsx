import styled from "styled-components";
import {
  BaseLayout,
  flex_column, 
  colors,
} from "@components/AllComponent";
import { GroupList, GroupListType } from "@components/GroupList";
import { useEffect, useState } from "react";
import axios from "axios";

type GroupSettingPageProps = {
  myJoinGroup: GroupListType[];
  myGroup: GroupListType[];
};

const Layout = styled(BaseLayout)`
  ${flex_column}
  gap: 10px;

  ul {
    padding: 1rem;
    flex: 1;
    ${flex_column}
    gap:10px;

    & > li{
      display:flex;
      gap: 10px;    
    }
  }

  .group{
    .group-info{
      width: 150px;
      flex-grow: 1;
    }
    .group-info-button{
      display:flex;
      gap: 5px;

      .group-info-button-patch{
        background-color: ${colors.buttonPatchColor};
      }

      & > button{
        border-radius: 10px;
        padding: 0.5rem;
        font-size: 0.5rem;
        background-color: ${colors.buttonDeleteColor};
        white-space: nowrap;
      }
    }
  }

  .my-group-create{
    font-size: 2rem;
    display:flex;
    justify-content:center;
    background-color: ${colors.buttonCreateColor};
    color: white;
    padding: 1rem;
    border-radius: 10px;
  }
 
`;

function GroupSettingPage() {
  const [joinGroup, setJoinGroup] = useState<GroupListType[]>([]);
  const [myGroup, setMyGroup] = useState<GroupListType[]>([]);

  useEffect(() => {
    axios
      .get<GroupSettingPageProps>(
        `${process.env.REACT_APP_API_ROOT}/mypage/${1}`
      )
      .then((res) => {
        setJoinGroup(res.data.myJoinGroup);
        setMyGroup(res.data.myGroup);
      });
  }, []);

  return (
    <Layout>
      <div>
        <h3>가입한그룹</h3>
        <ul className="group">
          {joinGroup.map((item) => {
            return (
              <li key={item.id}>
                <div className="group-info">
                  <GroupList item={item} />
                </div>
                <div className="group-info-button">
                  <button>그룹탈퇴</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>내그룹</h3>
        <ul className="my-group group">
        {myGroup.map((item)=>{
          return(
            <li key={item.id}>
              <div className="group-info">
                <GroupList item={item}/>
              </div>
              <div className="group-info-button">
                <button className="group-info-button-patch">그룹수정</button>
                <button>그룹삭제</button>
              </div>
            </li>
          );
        })}
        </ul>
        <div className="my-group-create">+</div>
      </div>
    </Layout>
  );
}

export default GroupSettingPage;
