import styled from "styled-components";
import "@styles/index.css";
import { useNavigate } from "react-router-dom";

export interface GroupListType {
  id: number,
  groupRegion: string,
  groupImg: string,
  groupTitle: string,
  groupPeople: string,
  groupContent: string,
}

type GroupListTypeProps = {
  item: GroupListType,
};

const Layout = styled.div`
  &:hover{
    background-color: rgba(128, 128, 128, 0.497);
    cursor:pointer;
  }
  display: flex;
  border-radius: 10px;
  padding: 1rem;
  gap: 10px;
  height: 10rem;

  .list-img {
    overflow: hidden;
    width: 30%;
    display:flex;
    align-items:center;
    justify-content:center;

    & > img{
      object-fit: cover;
      width: 80%;
      height: 80%;
      border-radius: 35px;
    }
  }

  .list-info {
    flex:1;
    width: 70%;
    display: flex;
    align-self: center;
    flex-direction: column;
    gap: 10px;

    & > div{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .list-title {
      font-size: 1.2rem;
    }

    .list-content1 {
      padding: 0 1rem;
      & > span{
        font-size: 1rem;
        color: gray;
     }
    }

    .list-content2{
      font-size: 1rem;
      text-align: right;
    }
    
  }
`;

export const GroupList = ({ item }: GroupListTypeProps) => {
  const navigate = useNavigate();
  const clickGroup = () => {
    navigate("/group", { state: item });
  };

  return (
    <Layout onClick={clickGroup}>
      <div className="list-img">
        <img src={item.groupImg} alt="#"/>
      </div>
      <div className="list-info">
        <div className="list-title">
          <span>{item.groupTitle}</span>
        </div>
        <div className="list-content1">
          <span>{item.groupContent}</span>
        </div>
        <div className="list-content2">
          <span>{item.groupRegion}</span>
          <span> | </span>
          <span>{`인원 ${item.groupPeople}`}</span>
        </div>
      </div>
    </Layout>
  );
};
