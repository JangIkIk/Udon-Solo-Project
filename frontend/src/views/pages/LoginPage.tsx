import styled from "styled-components";
import axios from "axios";
import { BaseLayout, colors } from "@components/AllComponent";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Modal } from "@components/Modal";
import { useAppDispatch } from "@store/store";
import { userId, userGroup } from "@slice/groupKeepList-slice";

const Layout = styled(BaseLayout)`

  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  text-align: center;

  .loginpage-info{
    padding: 5rem;
    background-color: slategrey;
    border-radius: 10px;
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

interface LoginPageType{
  loginId: string,
  loginPassword: string,
  keepCheck: boolean,
}

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [isModal, setIsModal]= useState<boolean | undefined>(undefined);
  
  

  



  const [loginData, setLoginData] = useState<LoginPageType>({
    loginId: "",
    loginPassword: "",
    keepCheck: false
  });

  const handleLogin = ()=> {
    axios.post(`/api/users/login`,{
      userId: loginData.loginId,
      userPassword: loginData.loginPassword,
      keepCheck: loginData.keepCheck
    },{withCredentials: true})
    .then( res => {

      if(res.data.userKeepList){
        const parse = JSON.parse(res.data.userKeepList);
        const listId = parse.map( (list: { id: number }) => list.id);
        dispatch(userGroup( {groupType: "userKeepGroup", groupId: listId} ));
      }

      if(res.data.userJoinList){
        const parse = JSON.parse(res.data.userJoinList);
        const listId = parse.map( (list: { id: number }) => list.id);
        dispatch(userGroup( {groupType: "userJoinGroup", groupId: listId} ));
      }
      
      if(res.data){
        if(loginData.keepCheck){
          const expires = new Date();
          expires.setTime(expires.getTime() + (3600 * 1000));
          document.cookie = `accessToken=${res.headers.authorization}; expires=${expires.toUTCString()}; path=/;`;
        } else{
          sessionStorage.setItem("accessToken",res.headers.authorization);
        }
        dispatch(userId(res.data.userId))
        navigate("/");
      }
    })
    .catch( () => setIsModal(false));
  }
  
  return (
    <Layout>
      {isModal === undefined ? null : <Modal check={setIsModal} children="아이디와 비밀번호를 확인해주세요"/>}
        <div className="loginpage-info">
          <h1>로그인</h1>
          <input onChange={ (text) => setLoginData( (prev) => ({...prev, loginId: text.target.value}))} value={loginData.loginId} type="text" placeholder="아이디를 입력해주세요" />
          <input onChange={ (text) => setLoginData( (prev) => ({...prev, loginPassword: text.target.value}))} value={loginData.loginPassword} type="password" placeholder="비밀번호를 입력해주세요" />
          <label>
            <input onClick={ () => setLoginData( (prev) => ({...prev, keepCheck: !prev.keepCheck}))} type="checkBox"/>
            로그인 유지하기
          </label>
          <div  className="loginpage-button">
            <button onClick={handleLogin} >로그인하기</button>
            <a href="/signup">회원가입</a>
            <a href="/">홈으로 가기</a>
          </div>
        </div>
    </Layout>
  );
}

export default LoginPage;
