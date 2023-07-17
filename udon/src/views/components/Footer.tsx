import styled from "styled-components";
import {
  BiHomeAlt,
  BiUser,
  BiBell,
  BiPencil,
  BiKey,
} from "react-icons/bi";
import {
  flex_column,
  SpanFlex,
  baseHover,
  fixedBase,
} from "@components/AllComponent";
import { useEffect, useState} from "react";

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
      &> span {
        flex: 1;
      }
    }
  }
`;

function Footer() {
  const [accessToken, setAccessToken] = useState<boolean>(false);
  useEffect(()=>{
    (()=>{
      const storge = !!sessionStorage.getItem("accessToken");
      const cookie = document.cookie.includes("accessToken=");
      setAccessToken(storge || cookie)
    })();
  },[accessToken]);

  return (
    <Layout>
      { accessToken ? (
        <div className="in-box">
          <a href="/" className="icons">
            <SpanFlex>
              <BiHomeAlt />
            </SpanFlex>
            <SpanFlex>홈</SpanFlex>
          </a>
          <a href="/mypage" className="icons">
            <SpanFlex>
              <BiUser />
            </SpanFlex>
            <SpanFlex>마이페이지</SpanFlex>
          </a>
          <a href="/login" className="icons" onClick={()=> {
            sessionStorage.clear();
            document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }}>
            <SpanFlex>
              <BiBell />
            </SpanFlex>
            <SpanFlex>로그아웃</SpanFlex>
          </a>
        </div>
      ) : (
        <div className="in-box">
          <a href="/login" className="icons">
            <SpanFlex>
              <BiKey />
            </SpanFlex>
            <SpanFlex>로그인</SpanFlex>
          </a>
          <a href="/signup" className="icons">
            <SpanFlex>
              <BiPencil />
            </SpanFlex>
            <SpanFlex>회원가입</SpanFlex>
          </a>
        </div>
      )}
    </Layout>
  );
}

export default Footer;
