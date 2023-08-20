import styled from "styled-components";

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

export const DetailMessageMe = () => {
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