import styled from "styled-components";
import { UserType } from "./DetailInfo";
import { flex_column, ImgBase} from "@components/AllComponent";

interface GroupPeopleProps{
    personnel: UserType[];
}



const Layout = styled.div<{profile : number}>`
  ${flex_column}
    gap: 0.5rem;
    font-size: 1.5rem;

    .group-people-profile {
        display: flex;
        gap: 0.5rem;
          .group-people-profile-li {
              border: 1px solid black;
              width: 3rem;
              height: 3rem;
              overflow: hidden;
              border-radius: 50%;
              position: relative;

              ${ ( props ) => props.profile > 3 ?
              ` &:last-child::after{
                position: absolute;
                top:0;
                right:0;
                bottom:0;
                left:0;
                font-size: 2rem;
                display:flex;
                justify-content: center;
                align-items: center;
                content:"...";
                background-color: rgba(128, 128, 128, 0.7);
                border-radius: 50%;
                cursor: pointer;
              }` : ""}
          }
`

export const DetailPeople = ( {personnel} : GroupPeopleProps )=>{
  
  const test = (e : number)=>{
  
    if(personnel.length <= 3){
      return
    } else{
      console.log("3번째요소클릭Index", e);
    }
  }

    return(
        <Layout profile={personnel.length}>
                <h6>참여멤버 {`16 / ${personnel.length} 명`}</h6>
                <ul className="group-people-profile">
                  {personnel.slice(0, 3).map(( item, idx)=>{
                    return (
                      <li key={item.id} className="group-people-profile-li" onClick={ () => test(idx)}>
                        <ImgBase src={item.img} alt="프로필"/>
                      </li>
                    );
                  })}
                </ul>
        </Layout>
    );
}