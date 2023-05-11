import styled from "styled-components";
import { DetailMessageMe, DetailMessageOthers } from "@groupdetail";

const Layout = styled.div`
    padding: 1rem;

    .groupchat-message{

      .groupchat-others {
          // background-color: white;
        }
      
        .groupchat-me {
          // background-color: blue;
        }
    }

  .groupchat-input {
        background-color: rgb(113, 107, 107);
        width: 100%;
        height: 4rem;
        padding: 0 1rem;
        max-width: 1080px;
        min-width: 320px;
        position: fixed;
        left: 0;
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
      <div  className="groupchat-message">
        <div className="groupchat-others">
            <DetailMessageOthers/>
        </div>
        <div className="groupchat-me">
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
