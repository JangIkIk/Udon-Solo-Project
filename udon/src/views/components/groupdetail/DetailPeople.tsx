import styled from "styled-components";
import { UserType } from "./DetailInfo";
import { flex_column, ImgBase} from "@components/AllComponent";

interface GroupPeopleProps{
    personnel: UserType[];
}

const Layout = styled.div`
  ${flex_column}
    gap: 0.5rem;
    font-size: 1.5rem;

    .group-people-profile {
        display: flex;
        gap: 1rem;
          & > li {
              border: 1px solid black;
              width: 3rem;
              height: 3rem;
              overflow: hidden;
              border-radius: 50%;
          }
      }

      @media screen and (max-width: 855px){
        .group-people-profile-li:nth-child(n+10){
          display: none;
        }
      }
      @media screen and (max-width: 740px){
        .group-people-profile-li:nth-child(n+9){
          display: none;
        }
      }
      @media screen and (max-width: 686px){
        .group-people-profile-li:nth-child(n+8){
          display: none;
        }
      }
      @media screen and (max-width: 635px){
        .group-people-profile-li:nth-child(n+7){
          display: none;
        }
      }
      @media screen and (max-width: 538px){
        .group-people-profile-li:nth-child(n+6){
          display: none;
        }
      }
      @media screen and (max-width: 489px){
        .group-people-profile-li:nth-child(n+5){
          display: none;
        }
      }
      @media screen and (max-width: 440px){
        .group-people-profile-li:nth-child(n+4){
          display: none;
        }
      }
      @media screen and (max-width: 340px){
        .group-people-profile-li:nth-child(n+3){
          display: none;
        }
      }

`

export const DetailPeople = ( {personnel} : GroupPeopleProps )=>{
  
    return(
        <Layout>
                <h6>참여멤버 {`16 / ${personnel.length} 명`}</h6>
                <ul className="group-people-profile">
                  {personnel.map(( item )=>{
                    return(
                      <li key={item.id} className="group-people-profile-li">
                        <ImgBase src={item.img} alt="프로필"/>
                      </li>
                    );
                  })}
                </ul>
        </Layout>
    );
}