import styled from "styled-components";
import { BiSearch, BiRightIndent, BiMoon, BiWorld } from "react-icons/bi";
import { GroupList } from "../components/GroupList"

const Layout = styled.div`
  main {
    text-align: center;
    background-color: blue;

    ul{
        display:flex;
        flex-direction: column;
        gap:10px;
        .group-list{
            margin: 0 auto;
            width:80%;
            border: 1px solid black;
        }
    }
  }
`;

const HomePage = () => {
    const test = [1,2,3,4,5,6,7,8,9,10,11,12,13]
  return (
    <Layout>
      <main>
        <ul>
            {test.map((items)=>{
                return(
                    <li className="group-list"><GroupList/></li>
                );
            })}
          <li>
          </li>
        </ul>
      </main>
    </Layout>
  );
};

export default HomePage;
