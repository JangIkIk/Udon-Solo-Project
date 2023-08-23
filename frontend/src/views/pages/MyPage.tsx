import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiMaleFemale, BiBeenHere } from "react-icons/bi";
import axios from "axios";
import { GroupListType } from "@components/GroupList";
import {
  BaseLayout,
  ImgBase,
  flex_column,
  SpanFlex,
  flex_row_all_cneter,
} from "@components/AllComponent";
import { refreshToken, isToken } from "@components/Customhooks";
import { ProfileSettingModal } from "@components/ProfileSettingModal";

export interface userDataType {
  userName: string;
  userYears: string;
  userGender: string;
  userActivity: string;
  userKeepList: GroupListType[];
  userJoinList: GroupListType[];
  userImage: string | null;
  userIntroduce: string;
}
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

      & > div {
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
        cursor: pointer;
      }
    }
  }

  .mypage-group {
    padding-top: 1rem;

    .my-list {
        display:flex;
        gap: 10px;
        flex-wrap: wrap;
        padding: 0 5px;

        & > p{
          padding: 10px;
        }

        & > li{
          padding: 1rem;
          max-width: 90px;
          min-width: 90px;
          display:flex;
          flex-direction: column;
          align-items:center;
          gap: 10px;
          cursor: pointer;

          img{
            border: 1px solid gray;
            width: 5rem;
            height: 5rem;
            border-radius:50%;
          }
          span{
            font-size:8px;
            max-width: 90px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        
      }
    }
  }
`;
function MyPage() {
  const [userData, setUserData] = useState<userDataType | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const navigate = useNavigate();

  

  useEffect(() => {
    axios.get<userDataType>('/api/mypage', {
        headers: {
          Authorization: `Bearer ${isToken()}`,
        },
      })
      .then((res) => setUserData(res.data))
      .catch((err) => {
        if (err.response.status === 401) {
          return refreshToken();
        } else {
          console.log(err);
        }
      });
  }, []);

  return (
    <Layout>
      {userData !== null && isModal? (
        <ProfileSettingModal
          userData={userData}
          setUserData={setUserData}
          setIsModal={setIsModal}
        />
      ) : null}
      <div className="mypage-info">
        <div className="mypage-photo">
          <ImgBase
            src={
              userData && userData.userImage !== null
                ? userData.userImage
                : `${process.env.PUBLIC_URL}/images/simple.png`
            }
            alt="#"
            fit="contain"
            borderRadius={"50%"}
          />
        </div>
        <div className="mypage-content">
          <div>
            <SpanFlex>{userData && userData.userName}</SpanFlex>
            <SpanFlex>
              <BiMaleFemale />
              {userData && userData.userGender}
            </SpanFlex>
          </div>
          <div>
            <SpanFlex>
              {userData && userData.userYears?.replaceAll("-", ".")}
            </SpanFlex>
            <SpanFlex>
              <BiBeenHere />{" "}
              {userData && userData.userActivity !== ""
                ? userData.userActivity
                : "지역없음"}
            </SpanFlex>
          </div>
        </div>
        <div
          className="mypage-modify"
          onClick={() => setIsModal((prev) => !prev)}
        >
          <button>수정</button>
        </div>
      </div>

      <div className="mypage-group">
        <h3>{`찜한모임`}</h3>
        <div>
          <ul className="my-list">
            {userData && Array.isArray(userData.userKeepList) ? (
              userData.userKeepList?.map((item ) => {
                return (
                  <li key={item.id} onClick={() => navigate("/group", {state: item})}>
                    <img src={item.groupImg} alt="#" />
                    <span>{item.groupTitle}</span>
                  </li>
                );
              })
            ) : (
              <p>현재 찜한 그룹이 없습니다.</p>
            )}
          </ul>
        </div>
      </div>
      <div className="mypage-group">
        <h3>{`가입한모임`}</h3>
        <div>
          <ul className="my-list">
          {userData && Array.isArray(userData.userJoinList)? (
              userData.userJoinList?.map((item ) => {
                return (
                  <li key={item.id} onClick={() => navigate("/group", {state: item})}>
                    <img src={item.groupImg} alt="#" />
                    <span>{item.groupTitle}</span>
                  </li>
                );
              })
            ) : (
              <p>현재 가입한 그룹이 없습니다.</p>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default MyPage;
