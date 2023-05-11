import styled from "styled-components";
import { BiHomeAlt, BiUser, BiConversation, BiBell, BiPencil, BiKey } from "react-icons/bi";

const Layout = styled.div`
  font-size: 1.5rem;
  width: 100%;
  max-width: 1080px;
  min-width: 320px;
  position: fixed;
  background-color: white;
  bottom: 0;
  height: 4.5rem;
  display: flex;

  .in-box {
    flex: 1;
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    padding: 1rem;
    

    .icons {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content:center;
      flex: 1;
      border-radius:1rem;

      &:hover{
        background-color:gray;
        border:1px solid black;
      }
    }
  }
`;

function Footer() {
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
        <a href="/groupsetting" className="icons">
            <span><BiConversation/></span>
            <span>그룹</span>
        </a>
        <a href="/news" className="icons">
            <span><BiBell/></span>
            <span>알림</span>
        </a>
      </div>
      {/* <div className="in-box">
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
      </div> */}
    </Layout>
  );
}

export default Footer;
