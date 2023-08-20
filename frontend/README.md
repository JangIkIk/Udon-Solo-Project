> 설치한 패키지
```
npm i @reduxjs/toolkit
npm i axios
npm i react
npm i react-dom
npm i react-icons
npm i react-redux
npm i react-router-dom
npm i redux-persist
npm i styled-components
npm i typescript
npm i @types/react -D
npm i @types/react-dom -D
npm i @types/styled-components -D
npm install @craco/craco --save-dev --legacy-peer-deps ?? -> 어떤역할?
```

구조변경후 확인
```
-> SignUpPage.tsx (엔드포인트 변경)
-> LoginPage.tsx (엔드포인트 변경)
-> users-API.js (모듈 재배치)
-> HomePage.tsx (엔드포인트 변경)



현재 파일의 구분

-backend
|controllers
|    |group-API.js
|    |mypage-API.js
|    |users-API.js
|models
|    |group-Queries.js
|    |mypage-Queries.js
|    |users-Queries.js
|    |table-Queries.js
|index.js




```


///// 임시

[설치한패키지]
```
npx i create-react-app udon --template typescript
npm i axios
npm i styled-components
npm i express
npm i nodemon   
npm i sqlite3
npm i @reduxjs/toolkit
npm i react-router-dom
npm i react-icons

npm i @craco/craco --save-dev
npm i @types/styled-components--save-dev
```

[역할구분]
- Client : React(TypeScript)
- ApiServer : Express
- DB : sqlite3
- 상태관리 : Redux-toolkit

[반응형]
최소 320 X 568
최대 1080 X 2400


[보완 및 추가 해야할부분]
- [로그인]
    - css보완(전체적인)
- [회원가입]
    - css - (비밀번호 확인부분 체크빠짐)
    - css - (필수항목 입력안되었을시 가입하기 버튼 비활성화)
    - 휴대폰 인증시 이메일 or 카톡인증으로?
    - 휴대폰 유효성검사 017제외하기
- [홈]
    - css보완(전체적인)
- [마이페이지]
    - 
    

    


[완료한기능]

[문서]
- JWT : https://github.com/auth0/node-jsonwebtoken
- sqlite3 Github : https://github.com/TryGhost/node-sqlite3
- sqlite 쿼리문 : https://www.sqlite.org/lang.html
- express: https://expressjs.com/
- typeScript: https://www.typescriptlang.org/
- 정규표현식 테스트: https://regex101.com/ 
- React: https://ko.legacy.reactjs.org/
- axios: https://axios-http.com/kr/

----



