import styled from "styled-components";

const LayoutOthers = styled.div`
    display: flex;

  .others-message {
    max-width: 80%;
    display: flex;
    gap: 0.5rem;
    padding-bottom: 2rem;
    .others-photo {
      width: 3rem;
      & > img {
        width: 100%;
      }
    }

    .others-info {
      flex: 1;
      & > p {
        border-radius: 0.5rem;
        margin-top: 0.2rem;
        padding: 0.5rem;
        background-color: white;
        white-space: pre-wrap;
        word-break: break-all;
        word-wrap: break-word;
      }
    }

    .others-time {
        align-self: flex-end;
    }
  }
`;

export const GroupMessageOthers = () => {
  const text = `
안녕하세요.
그룹채팅입니다.
오늘 늦지마세요~
    `.trim();

  return (
    <LayoutOthers>
      <div className="others-message">
        <div className="others-photo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="#"
          />
        </div>
        <div className="others-info">
          <span>닉네임</span>
          <p>{text}</p>
        </div>
        <div className="others-time">
          <span>오후 2:24</span>
        </div>
      </div>
    </LayoutOthers>
  );
};

const LayoutMe = styled.div`
    display:flex;
    justify-content: flex-end;
  
  .me-message{
    max-width: 80%;
    display: flex;
    gap: 0.5rem;
    padding-bottom: 2rem;

    .me-time{
        align-self: flex-end;
    }

    .me-content{
        flex: 1;
      & > p {
        border-radius: 0.5rem;
        padding: 0.5rem;
        background-color: yellow;
        white-space: pre-wrap;
        word-break: break-all;
        word-wrap: break-word;
      }
    }

  }
`;

export const GroupMessageMe = () => {
    const text = `
안녕하세요.
그런데 어디로가나요?
장소는 알려주세요~
        `.trim();

  return (
    <LayoutMe>
      <div className="me-message">
        <div className="me-time">
          <span>오후 2:25</span>
        </div>
        <div className="me-content">
          <p>{text}</p>
        </div>
      </div>
    </LayoutMe>
  );
};
