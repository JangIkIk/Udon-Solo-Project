import styled from "styled-components";
import { BiSearch, BiRightIndent, BiMoon, BiWorld } from "react-icons/bi";
import { GroupList } from "../components/GroupList";
import { useNavigate } from "react-router-dom";

const Layout = styled.div`
padding:10px;
  main {
    text-align: center;
    background-color: gray;

    ul{
        display:flex;
        flex-direction: column;
        gap:10px;
        .group-list{
            margin: 0 auto;
            width:80%;
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
