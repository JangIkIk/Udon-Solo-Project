import React, { SetStateAction } from "react";
import styled from "styled-components";
// import {} from "@components/AllComponent";

const Layout = styled.div`
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;

    & > div{
        background-color: white;
        border: 1px solid black;
        border-radius: 10px;
        padding: 1rem;
        display:flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        .modal-buttons{
            display:flex;
            gap: 10px;
        
            & > button{
                background-color: rgba(128, 128, 128, 0.1);
                padding: 5px;
                border: 1px solid black;
                border-radius: 5px;
                cursor: pointer;
            }
        }
    }
`
interface ModalType{
    children: string;
    check: React.Dispatch<SetStateAction<boolean | undefined>>;
}

export const Modal = ( { children, check} : ModalType)=>{
    return(
       <Layout>
            <div>
                <h3>{children}</h3>
                <div className="modal-buttons">
                    <button onClick={()=>check(undefined)}>확인</button>
                </div>
            </div>
       </Layout>
    );
}