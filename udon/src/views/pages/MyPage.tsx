import styled from "styled-components";
import { useEffect, useState } from "react";
import { BiMaleFemale, BiBeenHere, BiHeart } from "react-icons/bi";
import axios from "axios";
import { GroupList, GroupListType} from "@components/GroupList";
import { 
  BaseLayout, 
  ImgBase, 
  flex_column, 
  SpanFlex,
  flex_row_all_cneter,
} from "@components/AllComponent";
import { refreshToken, isToken } from "@components/Customhooks";
import { ProfileSettingModal } from "@components/ProfileSettingModal";

interface userDataType{
  userName: string,
  userYears: string,
  userGender: string,
  userActivity: string,
  userKeepList: GroupListType[],
  userImage: string | null,
  userIntroduce: string
}


export type OptionUserDataType = Partial<userDataType>

const Layout = styled(BaseLayout)`
    .mypage-info {
      display: flex;
      gap: 1rem;

      .mypage-photo {
        width: 5rem;
      }

      .mypage-content {
        flex: 1;
        display: flex;
        gap: 1rem;

        & > div{
          ${flex_column}        
          justify-content: space-around;
        }
      }

      .mypage-modify {
        ${flex_row_all_cneter}
        flex-basis: 5rem;
        border-radius: 10px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
        & > button {
          color: blue;
          font-size: 1.2rem;
          cursor:pointer;
        }
      }
    }

  .mypage-keep {
    padding-top: 1rem;
    .mypage-keep-content {

      & > ul{
          ${flex_column}
           gap:10px;
      }
    }
  }
`;
function MyPage() {
  const [userData, setUserData] = useState<OptionUserDataType>({});
  const [isModal, setIsModal] = useState<boolean>(false);
  let a ;
  // console.log(a)
  useEffect(() => {
      axios.get<OptionUserDataType>(`/mypage`,{
          headers:{
              Authorization: `Bearer ${isToken()}`
          }
      })
      .then( res => setUserData(res.data))
      .catch( err => {
        console.log("오류")
        if(err.response.status === 401){
          return refreshToken();
        } else{
          console.log(err);
        }
      })
  },[]);

  return (
    <Layout>
      {isModal ? <ProfileSettingModal userData={userData} setUserData={setUserData} setState={setIsModal}/> : null}
      <div className="mypage-info">
        <div className="mypage-photo">
          <ImgBase src={ userData.userImage && userData.userImage !== null ? `http://localhost:4000/${userData.userImage}`: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="#" fit="contain" borderRadius={"50%"}/>
        </div>
        <div className="mypage-content">
          <div>
            <SpanFlex>{userData.userName}</SpanFlex>
            <SpanFlex><BiMaleFemale />{userData.userGender}</SpanFlex>
          </div>
          <div>
          <SpanFlex>{userData.userYears?.replaceAll("-", ".")}</SpanFlex>
          <SpanFlex><BiBeenHere /> {userData.userActivity ?? "활동지역 없음"}</SpanFlex>
          </div>
        </div>
        <div className="mypage-modify" onClick={() => setIsModal((prev) => !prev)}>
          <button>수정</button>
        </div>
      </div>

      <div className="mypage-keep">
        <h3>
          <BiHeart />
          찜한모임
        </h3>
        <div className="mypage-keep-content">
        <ul>
          {userData.userKeepList !== null ? userData.userKeepList?.map((item)=>{
                return(
                  <li key={item.id}><GroupList item={item}/></li> 
                );
            }) : <li>현재 찜한 그룹이 없습니다.</li>}
        </ul>
        </div>
      </div>
    </Layout>
  );
}

export default MyPage;
