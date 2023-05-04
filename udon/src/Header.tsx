import { BiSearch, BiRightIndent, BiMoon, BiWorld } from "react-icons/bi";
import styled from "styled-components";

const Layout = styled.div`
position: fixed;
width: 100%;
top:0;
max-width: 1080px;
min-width: 320px;
background-color: white;
display: flex;
height:10rem;

header {
  flex:1;
  display: flex;
  flex-direction: column;
  align-items:center;
  padding: 10px;
  gap: 0.8rem;

  .title-search {
      width:100%;
      text-align:center;
      display: flex;
      align-items:center;
      gap:1rem;

    .title {
      font-size:2rem;
      flex: 1;
    }

    .searach {
      flex: 5;
      display: flex;
      gap: 10px;
      align-items: center;

      #searach-value {
        padding: 1rem;
        width: 80%;
        ::placeholder{
          font-size: 1rem;
        }
      }
      label[for="searach-value"] {
        width: 1.7rem;
        height: 1.7rem;
        font-size: 1.7rem;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
          background-color: gray;
        }
      }
    }
  }
  .filter{
      padding:10px;
      margin: 0 auto;
      display:flex;
      gap: 2.5rem;
      font-size:1rem;
      span{
          padding:0.5rem;
          border-radius: 5px;
          border:1px solid red;
      }
  }
}

`;

function Header() {
  return (
    <Layout>
      <header>
        <div className="title-search">
          <h1 className="title">우 동</h1>
          <div className="searach">
            <input placeholder="원하는 그룹을 검색하세요" id="searach-value" />
            <label htmlFor="searach-value">
              <BiSearch />
            </label>
            <label htmlFor="searach-value">
              <BiRightIndent />
            </label>
            <label htmlFor="searach-value">
              <BiMoon />
            </label>
            <label htmlFor="searach-value">
              <BiWorld />
            </label>
          </div>
        </div>
        <div className="filter">
          <span>검색태그</span>
          <span>검색태그</span>
          <span>검색태그</span>
          <span>검색태그</span>
        </div>
      </header>
    </Layout>
  );
}

export default Header;
