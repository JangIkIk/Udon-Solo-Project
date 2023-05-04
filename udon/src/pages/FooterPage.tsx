import styled from "styled-components";
import { BiHomeAlt, BiUser, BiConversation, BiBell, BiPencil, BiKey } from "react-icons/bi";

const Layout = styled.div`
  width: 100%;
  max-width: 1080px;
  min-width: 320px;
  position: fixed;
  background-color: white;
  bottom: 0;
  height: 70px;
  display: flex;

  .in-box {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    padding: 10px;
    

    .icons {
      display: flex;
      padding: 5px;
      flex-direction: column;
      align-items: center;
      flex: 1;
      font-size: 20px;
      border-radius:10px;

      &:hover{
        background-color:gray;
      }
    }
  }
`;

function FooterPage() {
  return (
    <Layout>
      <div className="in-box">
        <a href="/" className="icons">
            <span><BiHomeAlt/></span>
            <span>홈</span>
        </a> 
        <a href="/mypage" className="icons">
            <span><BiUser/></span>
            <span>프로필</span>
        </a>
        <a href="/group" className="icons">
            <span><BiConversation/></span>
            <span>그룹</span>
        </a>
        <a href="/news" className="icons">
            <span><BiBell/></span>
            <span>알림</span>
        </a>
      </div>
      <div className="in-box">
        <a href="/login" className="icons">
          <span>
            <BiKey />
          </span>
          <span>로그인</span>
        </a>
        <a href="/signup" className="icons">
          <span>
            <BiPencil />
          </span>
          <span>회원가입</span>
        </a>
      </div>
    </Layout>
  );
}

export default FooterPage;
