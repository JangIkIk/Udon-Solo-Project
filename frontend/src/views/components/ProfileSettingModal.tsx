import styled from "styled-components";
import { flex_row_all_cneter, ImgBase, colors } from "@components/AllComponent"
import React, { SetStateAction, useState } from "react";
import axios from "axios";
import { userDataType } from "@pages/MyPage";
import { refreshToken, isToken } from "@components/Customhooks";

const Layout = styled.div<{gender?: string}>`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index: 1;
    ${flex_row_all_cneter};

    .profile-setting{
        background-color: white;
        display:flex;
        flex-direction: column;
        gap: 10px;
    }

    .setting-photo{
        width: 5rem;
        height: 5rem;
        background-color: white;
        position: relative;
        display:flex;

        & > label {
            position: absolute;
            top:0;
            right:0;
            bottom:0;
            left:0;
            cursor: pointer;
            & > span{
                position: absolute;
                background-color:${colors.buttonCreateColor};
                padding:5px;
                border-radius: 40%;
                right:-5px;
                bottom:-5px;
            }
        }

        & > input[type="file"] {
            position: absolute;
            width: 0;
            height: 0;
            padding: 0;
            overflow: hidden;
            border: 0;
        }
    }

    .setting-first{
        display:flex;
        & > div{
            flex:1;
            display:flex;

            & > input{    
                flex:1;
                padding: 1rem;
            }

            & > button{
                border: 1px solid black;
                cursor: pointer;
                flex:1;

                &:hover{
                    background-color:blue;
                }
            }
            .gender-man{
                background-color: ${ props => props.gender === "남" ? "blue" : "none"}       
            }
            .gender-female{
                background-color: ${ props => props.gender === "여" ? "blue" : "none"}       
            }
            
        }

    }

    .setting-second{
        display:flex;

        & > input{
            padding: 1rem;
        }
    }
    
    .setting-last{
        display:flex;

        & > textarea{
            flex:1;
            padding: 1rem;
            height: 10rem;
            resize: none;
        }
    }

    .setting-submit{
        display:flex;

        & > button{
            flex:1;
            padding: 1rem;
            color: white;
            background-color: ${colors.buttonCreateColor};
            cursor: pointer;

            &:hover{
                background-color: gray;
            }
        }
        
    }
`
interface ProfileSettingModalType{
    userData: userDataType,
    setUserData: React.Dispatch<React.SetStateAction<userDataType | null>>,
    setIsModal: React.Dispatch<SetStateAction<boolean>>,
}

export const ProfileSettingModal = ({ setIsModal, userData, setUserData } : ProfileSettingModalType)=>{

    const [userState, setUserState] = useState({
        userName: userData?.userName,
        userYears: userData?.userYears,
        userGender: userData?.userGender,
        userActivity: userData?.userActivity,
        userIntroduce: userData?.userIntroduce,
    })
    const [userImagePreview, setUserImagePreview] = useState<string>(userData?.userImage || `${process.env.PUBLIC_URL}/images/simple.png`);
    const [userNewImage, setUserNewImage] = useState<File | null>(null);
    const nameRegex = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]{0,5}$/;

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUserNewImage(file);
            setUserImagePreview(imageUrl);
          }
      };

    //  유저프로필 수정
    
        const profileChangeHandler = ()=>{
        const formData = new FormData();

        if(userState.userName === ""){
            formData.set("userName", userData.userName);
        } else if(nameRegex.test(userState.userName)){
            formData.set("userName", userState.userName);
        }
        formData.set("userYears",userState.userYears);
        formData.set("userGender",userState.userGender);
    
        if(userState.userActivity === null){
            formData.delete("userActivity");
        } else{
            formData.set("userActivity",userState.userActivity);
        }

        if(userState.userIntroduce === null){
            formData.delete("userIntroduce");
        } else{
            formData.set("userIntroduce",userState.userIntroduce);
        }

        if (userNewImage) {
            formData.set("userImage", userNewImage);
          } else if(userData.userImage){
            formData.set("userImage", userData.userImage);
          } else{
            formData.delete("userImage");
          }
        axios.patch('/api/mypage',formData,{
            headers: {
                Authorization: `Bearer ${isToken()}`,
                "Content-Type": "multipart/form-data"
            }
        })
        .then( ( res ) => {
            setIsModal(false);
            setUserData(res.data);
        })
        .catch( err => {
            if(err.response.status === 401){
              return refreshToken();
            } else{
              console.log(err);
            }
          }) 
      }
    
    

    return(
        <Layout gender={userState.userGender}>
            <div className="profile-setting">
                <div className="setting-photo">
                    <ImgBase src={userImagePreview} alt="#" borderRadius={"50%"}/>
                    <label htmlFor="file">
                        <span>+</span>
                    </label> 
                    <input type="file" id="file" accept=".jpg, .png, .jpeg" onChange={handleImageChange}/>
                </div>
                <div className="setting-first">
                    <div>
                        <input value={userState.userName} onChange={ ( {target} ) => {
                            if(nameRegex.test(target.value)){
                                setUserState( prev => ({
                                    ...prev, userName: target.value
                                }))
                            }
                        }} placeholder="이름입력"/>
                    </div>
                    <div>
                        <button className="gender-man" onClick={ ()=> setUserState( prev => ({
                            ...prev, userGender: "남"
                        }))}>남</button>
                        <button className="gender-female" onClick={ ()=> setUserState( prev => ({
                            ...prev, userGender: "여"
                        }))}>여</button>
                    </div>
                </div>
                <div className="setting-second">
                    <input type="date" value={userState.userYears} onChange={ ({target}) => setUserState( prev => ({
                        ...prev, userYears: target.value
                    }))}/>
                    <input type="text" value={userState.userActivity ?? ""} onChange={ ({target})=> setUserState( prev => ({
                        ...prev, userActivity: target.value
                    }))} placeholder="활동지역"/>
                </div>
                <div className="setting-last">
                    <textarea 
                    value={ userState.userIntroduce ?? ""}
                    onChange={ ({target})=> setUserState( prev => ({
                        ...prev, userIntroduce: target.value
                    }))} 
                    placeholder="간단한 소개를 해주세요!"/>
                </div>
                <div className="setting-submit">
                    <button onClick={profileChangeHandler}>수정</button>
                    <button onClick={()=> setIsModal( prev => !prev)}>취소</button>
                </div>
            </div>
        </Layout>
    );
}