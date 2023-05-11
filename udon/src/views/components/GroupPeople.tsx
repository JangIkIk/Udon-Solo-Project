import styled from "styled-components";

interface GroupPeopleProps{
    personnel: number[];
}

type stylesProps ={
    profile: number,
}

const Layout = styled.div<stylesProps>`
    display:flex;
    flex-direction: column;
    gap: 0.5rem;

    .group-people-personnel {
      font-size: 1.5rem;
    }

    .group-people-profile {
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
        overflow: hidden;

    & > li {
        flex: 0 0 2rem;
        border-radius:50%;

        ${({profile})=> profile > 3 ? `&:nth-child(3){
            cursor: pointer;
            position: relative;

            &::before{
                border-radius:50%;
                position: absolute;
                content: "";
                background-color: rgba(0, 0, 0, 0.5);
                top:0;
                right:0;
                bottom:0;
                left:0;
            }

            &::after{
                border-radius:50%;
                position: absolute;
                display:flex;
                justify-content:center;
                font-size: 2rem;
                color: rgba(0, 0, 0, 0.7);
                align-items:center;
                content: "+";
                top:0;
                right:0;
                bottom:0;
                left:0;
            }
        }` : ``}

            & > img {
                width: 100%;
                height: 100%;
            }
        }
    }

`

export const GroupPeople = ( {personnel} : GroupPeopleProps )=>{

    const clickheandler = ()=>{
        console.log("전체인원모달창 띄움");
    }
    return(
        <Layout profile={personnel.length}>
                <div className="group-people-personnel">
                  <h6>참여멤버 {"16 / 10 명"}</h6>
                </div>
                <ul className="group-people-profile">
                  {personnel.slice(0, 3).map((item, idx) => {
                    if(personnel.length > 3){
                        return (
                            <li key={idx} onClick={clickheandler}>
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                alt="#"
                              />
                            </li>
                          );
                    } 
                    else{
                        return <li key={idx}>
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                alt="#"
                              />
                            </li>
                    }
                    
                  })}
                </ul>
        </Layout>
    );
}