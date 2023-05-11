import styled from "styled-components";
import { BiMaleFemale, BiBeenHere, BiHeart } from "react-icons/bi";
import { GroupList } from "@components/GroupList";

const Layout = styled.div`
  height: 100%;
  background-color:red;
  padding: 1rem;
  font-size: 1.2rem;

  .mypage-info {
    display: flex;
    gap: 1rem;

    .mypage-photo {
      width: 5rem;

      & > img {
        width: 100%;
      }
    }

    .mypage-content {
      flex: 1;
      display: flex;
      gap: 1rem;

      & > div{
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        & > span{
          display: flex;
        }
      }
    }

    .mypage-modify {
      display: flex;
      flex-basis: 5rem;
      justify-content: center;
      align-items: center;

      & > button {
        color: blue;
        font-size: 1.2rem;
      }
    }
  }






  .mypage-keep {
    padding-top: 1rem;
    // background-color:blue;


    .mypage-keep-content {
      // background-color:red;
      

    }
  }
`;

function MyPage() {
  return (
    <Layout>
      <div className="mypage-info">
        <div className="mypage-photo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="#"
          />
        </div>
        <div className="mypage-content">
          <div>
            <span>홍길동</span>
            <span>
              <BiMaleFemale /> 남
            </span>
          </div>
          <div>
            <span>2000. 11. 09</span>
            <span>
              <BiBeenHere /> 경기도
            </span>
          </div>
        </div>
        <div className="mypage-modify">
          <button>수정</button>
        </div>
      </div>

      <div className="mypage-keep">
        <h3>
          <BiHeart />
          찜한모임
        </h3>
        <div className="mypage-keep-content">
          <GroupList/>
          <GroupList/>
          <GroupList/>
        </div>
      </div>
    </Layout>
  );
}

export default MyPage;
