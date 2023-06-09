## 페이지구분
>[하단고정바(페이지공통)]
>- 비로그인시 (로그인/회원가입)
>- 로그인시 (홈 / 프로필 / 그룹관리 / 알림)

> [로딩화면]
> - 이미지 및 문구

> [홈화면]
> 1. 검색창 (필터 : 지역, 유료/무료)
> 2. 그룹리스트
>>- 그룹지역(구단위 표기)
>>- 그룹이름
>>- 그룹전체인원
>>- 그룹금액 유무


> [각모임페이지]-> 비회원/그룹회원
> 1. 정보페이지
>>- 그룹이름
>>- 그룹찜
>>- 그룹지역(구단위, 시단위 표기)
>>- 그룹전체인원
>>- 그룹소개
>>- 그룹만남일정
>>>- 날짜/요일/시간
>>>- 지역
>>>- 금액
>>>- 참여인원
> 2. 게시판페이지(그룹회원기능)
>> - 그룹장* 글쓰기 기능
>> - 그룹회원 댓글기능
> 3. 사진첩페이지(그룹회원기능)
>> - 그룹회원 누구나 사진업로드
> 4. 채팅페이지(그룹회원기능)
>> - 그룹회원 누구나 채팅가능


> [마이페이지] -> 회원
> 1. 편집기능
>> - 이름설정 *
>> - 성별설정 *
>> - 나이설정 *
>> - 활동지역설정 * 
>> - 간단소개
> 2. 찜한그룹

> [그룹관리페이지] -> 회원
> 1. 가입한그룹 (탈퇴 및 바로가기)
> 2. 관리하는 그룹(삭제, 생성, 관리하기)

> [알림페이지] -> 가입한그룹만
> 1. 새로운 게시판공지
> 2. 새로운 모임일정


> [로그인페이지]
> 1. 아이디
> 2. 비밀번호
> 3. 로그인유지?

> [회원가입페이지]
> 1. 아이디
> 2. 비밀번호
> 3. 이름
> 4. 성별
> 5. 생년월일
> 6. 활동지역
> 7. 간단소개
> 8. 휴대폰인증



[설치한패키지]
```
npx i create-react-app udon --template typescript
npm i axios
npm i styled-components
npm i express
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


[css구조]

html
body
└──root
    └──App
        └──


├
├── Package.resolved
├── Package.swift
├── Sources
│   ├── App
│   │   ├── Controllers
│   │   ├── configure.swift
│   │   └── routes.swift
│   └── Run
│       └── main.swift
├── Tests
│   └── AppTests
│       └── AppTests.swift
└── docker-compose.yml



[파일구조]



    