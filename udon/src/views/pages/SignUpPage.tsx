import { useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import axios from "axios";
import {
  BaseLayout,
  RegexInput,
  flex_column_all_cneter,
  PasswordInput,
  RegexInputDataType,
  SimpleInputDataType,
  PasswordInputDataType,
  SimpleInput,
  colors,
} from "@components/AllComponent";
import { Modal } from "@components/Modal"
const Layout = styled(BaseLayout)`
  ${flex_column_all_cneter};
  gap: 1rem;
  & > form {
    display: flex;
    flex-direction: column;

    .signuppage-gender {
      padding: 0.7rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-align: center;

      & > span {
        text-align: left;
        font-size: 1.1rem;
        flex-basis: 6rem;
      }

      .signuppage-gender-input {
        padding: 1rem;
        display: flex;
        justify-content: center;
        gap: 10px;
      }
    }

    .form-submit-button{
        margin-top: 1rem;
        padding: 1rem;
        font-size: 1.5rem;
        background-color: ${colors.buttonCreateColor};
        flex: 1;
        border-radius: 10px;
        color: white;
        cursor: pointer;
    }
  }
`;

function SignUpPage() {
  const navigate = useNavigate();

  const [regexData, setRegexData] = useState<RegexInputDataType>({
    userId: "",
    userName: "",
    userPhone: "",
  });

  const [simpleData, setSimpleData] = useState<SimpleInputDataType>({
    userGender: "",
    userYears: "",
    userActivity: "",
    userIntroduce: "",
  });

  const [formPassword, setFormPassword] = useState<PasswordInputDataType>({
    userPassword: "",
    userPasswordCheck: "",
  });

  const [isModal, setIsModal] = useState<boolean | undefined>(undefined);

  const handleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSimpleData({ ...simpleData, [name]: value });
  };

  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post<boolean>(`${process.env.REACT_APP_API_ROOT}/signup`,{
      userId: regexData.userId,
      userName: regexData.userName,
      userPhone: regexData.userPhone,
      userGender: simpleData.userGender,
      userYears: simpleData.userYears,
      userActivity: simpleData.userActivity,
      userIntroduce: simpleData.userIntroduce,
      userPassword: formPassword.userPassword,
      userPasswordCheck: formPassword.userPasswordCheck,
    })
    .then( () => navigate("/login"))
    .catch( error => console.log(error))
    
  };

  const findId = ( event : string )=>{
    axios.get(`${process.env.REACT_APP_API_ROOT}/signup/${event}`)
    .then( res => setIsModal(res.data))
    .catch( error => console.log("에러" + error))
  }

  

  return (
    <Layout>
      {isModal === undefined ? null : <Modal check={setIsModal} children={isModal ? "사용중인 아이디입니다" : "사용가능한 아이디입니다"}/>}
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <RegexInput
          state={regexData}
          setState={setRegexData}
          name="userId"
          type="text"
          text="하나 이상의 영문, 숫자가 포함된 6자이상 ~ 12글자 이하"
          regex={/^(?=.*[a-zA-Z])[a-zA-Z0-9]{6,12}$/}
          buttons="중복확인"
          placeholder="ex: happy3"
          dataHandler={findId}
        >
          아이디 *
        </RegexInput>

        <PasswordInput
          formPassword={formPassword}
          setFormPassword={setFormPassword}
        />

        <RegexInput
          state={regexData}
          setState={setRegexData}
          name="userName"
          type="text"
          text="2자이상 ~ 6자이하의 한글을 작성해주세요"
          regex={/^[가-힣]{2,6}$/}
          placeholder="ex: 홍길동"
        >
          이름 *
        </RegexInput>

        <RegexInput
          state={regexData}
          setState={setRegexData}
          name="userPhone"
          type="tel"
          text="'-' 를제외한 10자이상 11자이하의 숫자만입력해주세요."
          regex={/^01[01679][0-9]{3,4}[0-9]{4,4}$/}
          buttons="인증하기"
          placeholder="ex: 01034344444"
        >
          휴대폰 *
        </RegexInput>

        <SimpleInput
          type="date"
          name="userYears"
          state={simpleData}
          setState={setSimpleData}
        >
          생년월일 *
        </SimpleInput>

        <div className="signuppage-gender">
          <span>성별 *</span>
          <div className="signuppage-gender-input">
            <span>남</span>
            <input
              type="radio"
              name="userGender"
              value="남"
              onChange={handleGender}
            />
            <span>여</span>
            <input
              type="radio"
              name="userGender"
              value="여"
              onChange={handleGender}
            />
          </div>
        </div>

        <SimpleInput
          type="text"
          name="userActivity"
          state={simpleData}
          setState={setSimpleData}
          placeholder="10자이내로 작성하세요"
          regex={/^[가-힣\s]{0,10}$/}
          text="10자이내 한글로만작성해주세요"
        >
          활동지역
        </SimpleInput>

        <SimpleInput
          type="text"
          name="userIntroduce"
          state={simpleData}
          setState={setSimpleData}
          placeholder="20자이내로 작성하세요"
          regex={/^[가-힣\s]{0,20}$/}
          text="20자이내 한글로만작성해주세요"
        >
          간단소개
        </SimpleInput>
        <button className="form-submit-button" type="submit"> 가입하기</button>
      </form>
    </Layout>
  );
}

export default SignUpPage;
