import styled from "styled-components";
import { BiSearch, BiRightIndent} from "react-icons/bi";
import {
  flex_column_align_cneter,
  flex_row_align_center,
  baseHover,
  baseBorder,
  fixedBase
} from "@components/AllComponent"
import React, { useState } from "react";
import { useAppDispatch } from "@store/store.ts";
import { setSearchText, setSearchFilter } from "@slice/serach-slice";

const Layout = styled.div`
display: flex;
${fixedBase}
top:0;
height:8rem;
background-color: yellow;

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
      // input leftrk 짤리는 이유는 ? 
      font-size:1rem;
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

        .filter{
          display:flex;
          justify-content: center;
          align-items: center;
          right:0;
          left:0;
          top:100%;
          background-color:red;
          position: absolute;
          height: 50%;
        }
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
    const [search, setSearch] = useState<string>("");
    const [modal, setModal] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);
    const [filterText, setFilterText] = useState<string>("");
    const dispatch = useAppDispatch();

    const searchClick = ()=>{
      dispatch(setSearchText(search));
      setModal(false);
    }

    const searchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && search.trim() !== ""){
        dispatch(setSearchText(search));
        setModal(false);
      }
    };

    const tagEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {

      if (event.key === "Enter" && filterText.trim() !== ""){
        setTags( prev => [...prev, filterText]);
        setFilterText("");
        dispatch(setSearchFilter([...tags, filterText]));
      }  
    };
    

    const tagClick = () =>{

        if(filterText.trim() !== ""){
          setTags( prevTags => [...prevTags, filterText]);
          setFilterText("");
          dispatch(setSearchFilter([...tags, filterText]));
        }
    }


    const tagDelete = ( tagDelete: string)=>{
      const newTag = tags.filter(( tag )=> tag !== tagDelete)
      setTags(newTag);
    }
    
  return (
    <Layout>
      <header>
        <div className="title-search">
          <a href="/" className="title">우 동</a>
          <div className="searach">
            <input placeholder="원하는 그룹을 검색하세요" id="searach-value" onKeyUp={searchEnter} onChange={({target})=>setSearch(target.value)}/>
            <label htmlFor="searach-value" onClick={searchClick}>
              <BiSearch />
            </label>
            <label htmlFor="searach-value" onClick={()=> setModal(!modal)}>
              <BiRightIndent />
              {modal ? <div className="filter" onClick={(e) => e.stopPropagation()}>
                <label htmlFor="region">
                  <span>지역 or 키워드:</span>
                  <input id="region" placeholder="지역과 관심모임을 지정하세요!" value={filterText} onKeyUp={tagEnter} onChange={({target})=>setFilterText(target.value)}/>
                  <button onClick={tagClick}>추가</button>
                </label>
              </div> : null}
            </label>
          </div>
        </div>
        <div className="filter">
          {tags.length > 0 ? tags.map( (tag , idx)=>{
            return(
              <span key={idx} onClick={()=>tagDelete(tag)}> #{tag} </span>
            );
          }) : null}
        </div>
      </header>
    </Layout>
  );
}

export default Header;
