import styled from "styled-components";
import { GroupList } from "../components/GroupList";
import { useNavigate } from "react-router-dom";

const Layout = styled.div`
padding:1rem;
  main {
    text-align: center;

    ul{
        display:flex;
        flex-direction: column;
        gap:10px;
        .group-list{
          background-color: gray;
            margin: 0 auto;
            width:100%;
            border: 1px solid black;
            border-radius: 10px;
            
            &:hover{
                background-color: thistle;
            }
        }
    }
  }
`;

const HomePage = () => {
    const test = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    const navigate = useNavigate();

    const clickGroup = ()=>{
        navigate("/group")
    }

  return (
    <Layout>
      <main>
        <ul>
            {test.map((items, idx)=>{
                return(
                    <li key={idx} onClick={clickGroup} className="group-list"><GroupList/></li>
                );
            })}
        </ul>
      </main>
    </Layout>
  );
};

export default HomePage;
