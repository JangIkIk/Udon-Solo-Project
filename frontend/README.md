### __[구현한 기능구분]__
  - 회원가입(공통)
  - 로그인(회원기능)
  - 마이페이지(회원기능)
    > 프로필이미지변경
    
    > 이름변경

    > 성별변경

    > 생년월일 변경

    > 활동지역 변경

    > 간단한 자기소개글
  - 그룹찜하기(회원기능)
  - 그룹가입하기(회원기능)
  - 그룹탈퇴하기(회원기능)
  - 그룹 모임참여하기(회원기능)
  - 그룹 모임취소하기(회원기능)
  - 검색
    > 조건검색(필터)

[참고문서]
- JWT : https://github.com/auth0/node-jsonwebtoken
- sqlite3 Github : https://github.com/TryGhost/node-sqlite3
- sqlite 쿼리문 : https://www.sqlite.org/lang.html
- express: https://expressjs.com/
- typeScript: https://www.typescriptlang.org/
- 정규표현식 테스트: https://regex101.com/ 
- React: https://ko.legacy.reactjs.org/
- axios: https://axios-http.com/kr/
-----

/*
  현재 배포시에 문제상황
  1. 클라이언트 API URL 문제: AWS의 EC2 퍼블릭 IPv4 주소를 통해 요청해야한다.

  2. 서버측에서도 CORS를 허용하는 도메인은 env파일을 통해서 설정되어 있기때문에 환경변수에 허용할 CORS를 변경해줘야한다.

  서버측에서의 CORS는 S3의 정적 웹호스팅을 CORS_ORIGIN 에 할당 하면 될것같고. 정적 웹호스팅 주소는 변경되지 않는것같다. 이것을 이용해 서버측 CORS를 처리하면될것같고, 클라이언트측에서 요청하는 서버 주소는 EC2의 인스턴스중 퍼블릭 IPv4를 할당하여 요청하면될것같다. 

  env의 파일을 gitignore에 제외후 코드를 올리고,
  인스턴스는 새로시작하면 퍼블릭 IPv4주소가 변하니 주의하자


  AWS 순서 (.env를 gitignore에서 제외시킨다.)

  1. 인스턴스를 실행시켜 퍼블릭 IPv4주소를 클라이언트측의 REACT_APP_API_ROOT 에 적용시킨다.
  2. 인스턴스의 IPv4를 적용시킨 클라이언트의 코드를 빌드한다.
  3. S3에 빌드한 파일,폴더를 업로드한다. 
  4. S3에 정적 웹호스팅을 설정한다.
  5. 서버측의 .env파일에서 정적 웹호스팅한 주소를 CORS_ORIGIN에 적용시켜준다.
  6. 이미지파일경로또한 적용
  7. git code를 업로드한다.
  8. 인스턴스 터미널에서 backend코드를 받은후 패키지 설치 및 실행

  프로토콜과 호스트를 제외하고 IPv4:Port로 적용시켜준다.
  

  gitignore제외
  .env
  backend/imageFile/
*/



