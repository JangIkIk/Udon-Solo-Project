import styled from "styled-components";
import { DetailMessageMe, DetailMessageOthers } from "@groupdetail";
import { BaseLayout } from "@components/AllComponent";

const Layout = styled(BaseLayout)`
    background-color:red;
    padding: 1rem;

  .groupchat-input {
        background-color:white;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 4rem;
        padding: 0 1rem;
        max-width: 1080px;
        min-width: 320px;
        transform: translate(-50%,0);
        position: fixed;
        left: 50%;
        bottom: 0;
        display:flex;
        gap: 1rem;
        align-items: center;
        justify-content: space-around;
    
        & > input{
            padding: 1rem;
            height: 3rem;
            flex:1;
        }
     
        & > label{
            background-color:blue;
            display: flex;
            color: white;
            justify-content: center;
            align-items: center;
            height: 3rem;
            flex-basis: 5rem;
        }
    }
`;

export const DetailChat = () => {
  return (
    <Layout>
      <div>
        <div>
            <DetailMessageOthers/>
        </div>
        <div>
            <DetailMessageMe/>
        </div>
      </div>
      <div className="groupchat-input">
        <input id="submit" placeholder="전송하실 메세지를 입력해주세요."/>
        <label htmlFor="submit">전송</label>
      </div>
    </Layout>
  );
};
