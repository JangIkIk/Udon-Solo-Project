import styled from "styled-components";
import { BiSearch, BiRightIndent, BiMoon, BiWorld } from "react-icons/bi";
import {
  flex_column_align_cneter,
  flex_row_align_center,
  baseHover,
  baseBorder,
  fixedBase
} from "@components/AllComponent"

const Layout = styled.div`
display: flex;
${fixedBase}
top:0;
height:8rem;

header {
  flex:1;
  ${flex_column_align_cneter}
  padding: 10px;
  gap: 0.8rem;

  .title-search {
      width:100%;
      text-align:center;
      ${flex_row_align_center}
      gap:1rem;

    .title {
      font-size:2rem;
      flex: 1;
    }

    .searach {
      flex: 5;
      ${flex_row_align_center}
      gap: 10px;

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
        ${baseHover}
      }
    }
  }
  .filter{
      display:flex;
      gap: 2rem;
      font-size:1rem;
      span{
          padding:0.2rem;
          border-radius: 5px;
          ${baseBorder}
      }
  }
}

`;

function Header() {
  return (
    <Layout>
      <header>
        <div className="title-search">
          <a href="/" className="title">우 동</a>
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
