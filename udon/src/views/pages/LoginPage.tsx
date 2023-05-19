import styled from "styled-components";
import { BaseLayout, colors } from "@components/AllComponent";

const Layout = styled(BaseLayout)`
background-color: slategrey;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  text-align: center;

  .loginpage-info{
    display:flex;
    flex-direction: column;
    gap: 1rem;
    
    & > input{
        padding: 0.5rem 2rem;;
    }

    .loginpage-button{
        flex-direction: column;
        display:flex;
        gap: 1rem;
        

        & > a,button{
            border-radius: 10px;
            padding: 1rem;
            background-color: white;
            font-size: 1.5rem;
        }

        & > button{
            color: white;
            background-color: ${ colors.buttonCreateColor};
        }
  }


`;

function LoginPage() {
  return (
    <Layout>
        <h1>로그인</h1>
        <div className="loginpage-info">
          <input placeholder="아이디를 입력해주세요" />
          <input placeholder="비밀번호를 입력해주세요" />
          <label>
            <input type="checkBox"/>
            로그인 유지하기
          </label>
          <div  className="loginpage-button">
            <button>로그인하기</button>
            <a href="/signup">회원가입</a>
            <a href="/">홈으로 가기</a>
          </div>
        </div>
    </Layout>
  );
}

export default LoginPage;
