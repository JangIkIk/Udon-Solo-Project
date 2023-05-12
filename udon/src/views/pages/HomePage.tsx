import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GroupList } from "@components";
import { BaseLayout, flex_column } from '@components/AllComponent'
import { useState } from "react";

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
    padding:1rem;
    ul{
       ${flex_column}
        gap:10px;
    }
`;



const HomePage = () => {
  const [groupList, setGroupList] = useState<GroupListInfo[]>([
    {
      id: 1,
      region: "성남시",
      img:"https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjhfMjAz/MDAxNTg4MDQwOTA5MjE0.i6ARBaBdi_HYODiTR0f1ma8OvblzSh01bJGL8U5gDZUg.1oPlzYogIg8H_TAk5iZvUMYOLsZkZM1ITTVrfUsIHHog.JPEG.mijung011040/20200424_192926.jpg?type=w800",
      title: "[정자역] 클라이밍 초자분들 환영 나이제한없음X",
      people: "85",
      detailedArea: "정자역 5번출구",
      iskeep: false,
    },

    {
      id: 2,
      region: "서울시",
      img:"https://img.lovepik.com/free-png/20220127/lovepik-badminton-png-image_401948661_wh1200.png",
      title: "[서울역] 배드민턴 초자분들 환영 나이제한없음X",
      people: "50",
      detailedArea: "서울역 5번출구",
      iskeep: false,
    },
    {
      id: 3,
      region: "부산시",
      img:"https://www.hanbit.co.kr/data/editor/20191015091554_afbeoaea.png",
      title: "[부산역] 서핑 초자분들 환영 나이제한없음X",
      people: "100",
      detailedArea: "부산역 5번출구",
      iskeep: true,
    },
  ]);
    const navigate = useNavigate();

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
