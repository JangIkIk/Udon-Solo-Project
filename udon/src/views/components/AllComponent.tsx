import styled, { css } from "styled-components";
import { SetStateAction, useState } from "react";

// 색상모음
export const colors = {
  hoverColor: "#C0FFFF",
  borderColor: "gray",
  buttonCreateColor: "#1478FF",
  buttonDeleteColor: "#FF607F",
  buttonPatchColor: "#7878FF",
};

// css 기본속성
export const baseBorder = css`
  border: 1px solid ${colors.borderColor};
`;

// 이벤트

export const baseHover = css`
  &:hover {
    cursor: pointer;
    background-color: ${colors.hoverColor};
  }
`;

// 레이아웃 css - 가로세로기준

export const flex_row_all_cneter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const flex_row_align_center = css`
  display: flex;
  align-items: center;
`;
export const flex_row_justify_center = css`
  display: flex;
  justify-content: center;
`;
export const flex_column = css`
  display: flex;
  flex-direction: column;
`;
export const flex_column_all_cneter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const flex_column_align_cneter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const flex_column_justify_cneter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const fixedBase = css`
  background-color: white;
  position: fixed;
  transform: translate(-50%, 0);
  left: 50%;
  width: 100%;
  max-width: 1080px;
  min-width: 320px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const CommonInputLayout = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  & > p {
    font-size: 0.9rem;
    color: red;
    white-space: nowrap;
  }

  label {
    padding: 0.7rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & > span {
      text-align: left;
      font-size: 1.1rem;
      flex-basis: 10rem;
    }

    & > input {
      flex: 1 1 80%;
      padding: 0.5rem;
      border-radius: 10px;
      border: 3px solid black;
    }
    & > div {
      align-self: stretch;
      display: flex;
      justify-content: center;
      flex-basis: 10rem;
      font-size: 1rem;
      width: 8rem;

      & > button {
        font-size: 1.2rem;
        background-color: ${colors.buttonCreateColor};
        flex: 1;
        border-radius: 10px;
        color: white;
        cursor: pointer;
      }
    }
  }
`;

// 스타일 태그

export const ImgBase = styled.img<{ fit?: string }>`
  width: 100%;
  height: 100%;
  object-fit: ${(props) => props.fit ?? "cover"};
`;

export const SpanFlex = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SpanFlexAlign = styled.span`
  display: flex;
  align-items: center;
`;

export const DivFlexAlign = styled.div`
  display: flex;
  align-items: center;
`;

export const BaseLayout = styled.div`
  font-size: 1.2rem;
  padding: 1rem;
  height: 100%;
`;

// 커스텀 컴포넌트

export type RegexInputDataType = {
  userId: string;
  userPhone: string;
  userName: string;
};

export type PasswordInputDataType = {
  userPassword: string;
  userPasswordCheck: string;
};

interface PasswordInputType {
  formPassword: PasswordInputDataType;
  setFormPassword: React.Dispatch<React.SetStateAction<PasswordInputDataType>>;
}

interface RegexInputType {
  children: string;
  name: keyof RegexInputDataType;
  type: string;
  regex: RegExp;
  state: RegexInputDataType;
  setState: React.Dispatch<SetStateAction<RegexInputDataType>>;
  text: string;
  buttons?: string;
  placeholder?:string;
  dataHandler?: ( parameter :string) => void;
}

/********* 비밀번호 컴포넌트 시작 라인 *********/

const PasswordInputLayout = styled(CommonInputLayout)<{
  styles: { original: boolean; check: boolean };
}>`
  .passwordinput-original {
    & > input {
      border-color: ${(props) => (props.styles.original ? "black" : "red")};
    }
  }

  .passwordinput-check {
    & > input {
        border-color: ${(props) => (props.styles.check ? "black" : "red")};
  }
`;

export const PasswordInput = ({
  formPassword,
  setFormPassword,
}: PasswordInputType): JSX.Element => {
  const [passwordRegex, setPasswordRegex] = useState<{
    original: boolean;
    check: boolean;
  }>({
    original: true,
    check: true,
  });

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const regexMatch = regex.test(value);
    setPasswordRegex((prev) => ({ ...prev, original: regexMatch }));
    setFormPassword((prev) => ({ ...prev, [name]: value }));
  };

  const checkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const passwordsMatch = formPassword.userPassword === value;
    setPasswordRegex((prev) => ({ ...prev, check: passwordsMatch }));
    setFormPassword((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <PasswordInputLayout styles={passwordRegex}>
      <label className="passwordinput-original">
        <span>비밀번호 *</span>
        <input
          type="password"
          name="userPassword"
          value={formPassword.userPassword}
          onChange={passwordHandler}
          placeholder="비밀번호를 입력해주세요"
        />
        <div></div>
      </label>
      {passwordRegex.original ? null : (
        <p>영어,숫자,[!@#$%^&*] 가 포함된 8자이상 16글자 이하</p>
      )}

      <label className="passwordinput-check">
        <span>비밀번호확인</span>
        <input
          type="password"
          name="userPasswordCheck"
          value={formPassword.userPasswordCheck}
          onChange={checkHandler}
          placeholder="비밀번호를 확인해주세요"
        />
        <div></div>
      </label>
      {passwordRegex.check ? null : <p>비밀번호가 일치하지않습니다.</p>}
    </PasswordInputLayout>
  );
};

/********* 비밀번호 컴포넌트 마지막 라인 *********/

/********* regex input 시작 라인 *********/

const RegexInputLayout = styled(CommonInputLayout)<{ styles: boolean, exist: string}>`
  label {
    input {
      border-color: ${(props) => (props.exist === "" ? "black" : props.styles ? "black" : "red")};
    }
    & > div {
      & > button {
        background-color: ${(props) =>
          props.styles ? colors.buttonCreateColor : "gray"};
      }
    }
  }
`;

export const RegexInput = ({
  children,
  name,
  type,
  text,
  regex,
  state,
  setState,
  buttons,
  placeholder,
  dataHandler,
}: RegexInputType) => {
  const [isRegex, setIsRegex] = useState<boolean>(false);
  const exist = state[name];

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));

    if (regex.test(value)) {
      setIsRegex(true);
    } else {
      setIsRegex(false);
    }
  };

  return (
    <RegexInputLayout styles={isRegex} exist={exist} >
      <label>
        <span>{children}</span>
        <input
          type={type}
          name={name}
          value={state[name]}
          onChange={inputChangeHandler}
          placeholder={placeholder}
        />
        <div>
          {buttons !== undefined ? (
            <button
            type="button"
            disabled={!isRegex}
            onClick={()=> {
              if (dataHandler) {
                dataHandler(state[name]);
              }
            }}
            >{buttons}</button>
          ) : null}
        </div>
      </label>
      {state[name] === "" ? null : isRegex ? null :<p>{text}</p>}
    </RegexInputLayout>
  );
};

/********* regex input 마지막 라인 *********/

/********* 기본 input 시작 라인 *********/

export type SimpleInputDataType = {
  userGender: string;
  userYears: string;
  userActivity: string;
  userIntroduce: string;
};

interface SimpleInputType {
  placeholder?: string
  children: string;
  type: string;
  name: keyof SimpleInputDataType;
  state: SimpleInputDataType;
  setState: React.Dispatch<SetStateAction<SimpleInputDataType>>;
}

const SimpleInputLayout = styled(CommonInputLayout)`

`;

export const SimpleInput = ({
  children,
  type,
  name,
  state,
  setState,
  placeholder
}: SimpleInputType) => {


  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SimpleInputLayout>
      <label>
        <span>{children}</span>
        <input
          type={type}
          name={name}
          value={state[name]}
          onChange={inputChangeHandler}
          placeholder={placeholder}
        />
        <div>
        </div>
      </label>
    </SimpleInputLayout>
  );
};

/********* 기본 input 마지막 라인 *********/
