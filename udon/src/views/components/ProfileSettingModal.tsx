import styled from "styled-components";
import { flex_row_all_cneter, ImgBase, colors } from "@components/AllComponent"
import React, { SetStateAction, useState } from "react";
import axios from "axios";
import { userDataType } from "@pages/MyPage"

const Layout = styled.div`
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
                background-color:yellow;
                cursor: pointer;
                flex:1;

                &:hover{
                    background-color:blue;
                }
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
    userData: userDataType | null,
    setUserData: React.Dispatch<React.SetStateAction<userDataType | null>>,
    setState: React.Dispatch<SetStateAction<boolean>>,
}

type SN = string | null

export const ProfileSettingModal = ({ setState, userData, setUserData } : ProfileSettingModalType)=>{
    const [userName, setUserName] = useState<SN>(userData && userData.userName);
    const [userYears, setUserYears] = useState<SN>( userData && userData.userYears);
    const [userGender, setUserGender] = useState<SN>( userData && userData.userGender);
    const [userActivity, setUserActivity] = useState<SN>( userData && userData.userActivity);
    const [userIntroduce, setUserIntroduce] = useState<SN>( userData && userData.userIntroduce);
    const [userImage, setUserImage] = useState<File | undefined >(undefined);
    const [userImagePreview, setUserImagePreview] = useState<string | null >(null);

    // 사진 미리보기
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setUserImage(file);
        //  input 태그의 type = "file" 에입력된 파일정보를 files객체에 접근하여 이미지데이터를가지고온다
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUserImagePreview(imageUrl);
          }
      };

    //  유저프로필 수정
      const profileChangeHandler = ()=>{
        /*
            FromData는 key: value 쌍세트를 구성하는방법을 제공한다
            mdn : https://developer.mozilla.org/en-US/docs/Web/API/FormData
        */
        const formData = new FormData();
        
        // 해당 수정사항에도 유효성검사를 진행해야함
        formData.set("userName",userName || `${userData && userData.userName}`);
        formData.set("userYears",userYears || `${userData && userData.userYears}`);
        formData.set("userGender",userGender || `${userData && userData.userGender}`);
        formData.set("userActivity",userActivity || `${userData && userData.userActivity}`);
        formData.set("userIntroduce",userIntroduce || `${userData && userData.userIntroduce}`);
    
        if (userImage) {
            /*
                파일에 대한정보는 File | Blob 객체를 통하여 서버에 전송하는것이 좋다. 
                그래야 서버에서 클라이언트가 업로드한 파일데이터를 직접 사용할수가 있다.
            */
            formData.set("userImage", userImage);
          } 
          if(userImage === undefined){
            if(typeof userData?.userImage === "string"){
                formData.set("userImage", userData.userImage);
            }
          }
        axios.patch(`${process.env.REACT_APP_API_ROOT}/mypage`,formData,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                "Content-Type": "multipart/form-data"
            }
        })
        .then( ( res ) => {
            setState(false);
            setUserData(res.data);
        })
        .catch( err => {
            alert("이미지가없어요");
            console.log("수정에러:",err);
        }) 
      }
    
    return(
        <Layout>
            <div className="profile-setting">
                <div className="setting-photo">
                    <ImgBase src={userImagePreview !== null ? userImagePreview : userData?.userImage ? userData.userImage : `${process.env.PUBLIC_URL}/images/simple.png`} alt="#" borderRadius={"50%"}/>
                    <label htmlFor="file">
                        <span>+</span>
                    </label> 
                    <input type="file" id="file" accept=".jpg, .png, .jpeg" onChange={handleImageChange}/>
                </div>
                <div className="setting-first">
                    <div><input value={userName ?? ""} onChange={ ({target}) => setUserName(target.value)} placeholder="이름입력"/></div>
                    <div>
                        <button onClick={ () => setUserGender("남")} >남</button>
                        <button onClick={ () => setUserGender("여")} >여</button>
                    </div>
                </div>
                <div className="setting-second">
                    <input type="date" value={userYears  ?? ""} onChange={ ({target}) => setUserYears(target.value)} />
                    {/* 새로고침후에 내용이 표시됨 */}
                    <input type="text" value={ userActivity  === null ? "" : userActivity} onChange={ ({target}) => setUserActivity(target.value)} placeholder="활동지역"/>
                </div>
                <div className="setting-last">
                    {/* 새로고침후에 내용이 표시됨 */}
                    <textarea 
                    value={ userIntroduce === null ? "" : userIntroduce} 
                    onChange={ ({target}) => setUserIntroduce(target.value)} 
                    placeholder="간단한 소개를 해주세요!"/>
                </div>
                <div className="setting-submit">
                    <button onClick={profileChangeHandler}>수정</button>
                    <button onClick={()=> setState( prev => !prev)}>취소</button>
                </div>
            </div>
        </Layout>
    );
}