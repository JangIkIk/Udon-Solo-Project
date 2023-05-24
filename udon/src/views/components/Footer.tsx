import styled from "styled-components";
import { BiHomeAlt, BiUser, BiConversation, BiBell, BiPencil, BiKey } from "react-icons/bi";
import { 
  flex_column, 
  SpanFlex,
  baseHover,
  fixedBase,

 } from "@components/AllComponent"

const Layout = styled.div`
  display: flex;
  ${fixedBase}
  font-size: 1.5rem;
  bottom: 0;
  height: 4.5rem;

  .in-box {
    padding: 0.5rem;
    flex: 1;
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    
    .icons {
      flex: 1;
      ${flex_column}
      border-radius:0.5rem;

      ${baseHover}
      &> span{
        flex:1;
      }
    }
  }
`;

function Footer() {
  return (
    <Layout>
      <div className="in-box">
        <a href="/" className="icons">
            <SpanFlex><BiHomeAlt/></SpanFlex>
            <SpanFlex>홈</SpanFlex>
        </a> 
        <a href="/mypage" className="icons">
            <SpanFlex><BiUser/></SpanFlex>
            <SpanFlex>프로필</SpanFlex>
        </a>
        <a href="/groupsetting" className="icons">
            <SpanFlex><BiConversation/></SpanFlex>
            <SpanFlex>그룹</SpanFlex>
        </a>
        <a href="/news" className="icons">
            <SpanFlex><BiBell/></SpanFlex>
            <SpanFlex>알림</SpanFlex>
        </a>
      </div>
      <div className="in-box">
        <a href="/login" className="icons">
          <SpanFlex><BiKey /></SpanFlex>
          <SpanFlex>로그인</SpanFlex>
        </a>
        <a href="/signup" className="icons">
          <SpanFlex><BiPencil /></SpanFlex>
          <SpanFlex>회원가입</SpanFlex>
        </a>
      </div>
    </Layout>
  );
}

export default Footer;
