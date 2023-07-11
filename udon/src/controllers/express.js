const express = require('express');
const app = express();
const port = 4000;
//  cors 모듈
const cors = require('cors');
// JWT 모듈
const jwt = require(`jsonwebtoken`);
// 쿠키로 받은값을 파싱하기위한 미들웨어
const cookieParser = require('cookie-parser');
// 토큰서명키
const access = "access"
const refresh = "refres"
// 이미지 파일데이터를 읽기위한 미들웨어
const multer = require('multer');
// 이미지 파일 저장경로
const upload = multer({ dest: 'uploads/'})
const path = require('path');
const uploadsDir = path.join(__dirname, 'uploads');
app.use(express.static(uploadsDir));




// json타입 파싱을위한 미들웨어
app.use(express.json());

//  CORS 설정
app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true,
  }
));
// app.use(cors(
//   {
//     origin: "http://192.168.219.103:3000",
//     credentials: true,
//   }
// ));
app.use(cookieParser());


// DB탐색 함수
const { idCheck, signupAdd, login, myProfile, myProfileSetting, myKeepList, myKeepListAdd } = require('../models/sqlite');
  const GroupList = [
      {
        id: 1,
        region: "성남시",
        img:"https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjhfMjAz/MDAxNTg4MDQwOTA5MjE0.i6ARBaBdi_HYODiTR0f1ma8OvblzSh01bJGL8U5gDZUg.1oPlzYogIg8H_TAk5iZvUMYOLsZkZM1ITTVrfUsIHHog.JPEG.mijung011040/20200424_192926.jpg?type=w800",
        title: "[정자역] 클라이밍 초자분들 환영 나이제한없음X",
        people: "85",
        detailedArea: "정자역 5번출구",
        iskeep: false,
        content: `안녕하세요 정자역 클라이밍입니다.
        클라이밍을 재밌게하실분들을 모집합니다!!
    
        since 22.10.16
        ♈️가입조건
        > 활발한 활동 가능!!
        > 나이 : 민증만있으면가능!!
        > 왕초보 모두가능!!
        since 22.10.16
        ♈️가입조건
        since 22.10.16
        ♈️가입조건
        > 활발한 활동 가능!!
        > 나이 : 민증만있으면가능!!
        > 왕초보 모두가능!!
        since 22.10.16
        ♈️가입조건
        since 22.10.16
        아무나아무나 나무나 아무나 들어오세요 ~ 
        테스트중입니다.`,
        groupSchedule:[
          {
            id: 1,
            day: "11월 06일 (일)",
            time: "오전 11:30분",
            detailedArea: "안국역 원서레인즈",
            money: 18000,
            user: [
              {
                id:1,
                img: "https://w7.pngwing.com/pngs/949/863/png-transparent-disney-characters-disney-cartoon-character.png",
                years: "2000-11-09",
                name : "루피"
              },
              {
                id:2,
                img: "https://w7.pngwing.com/pngs/940/463/png-transparent-disney-characters-disney-cartoon-character.png",
                years: "1000-11-09",
                name : "크몽"
              },
              {
                id:3,
                img: "https://e7.pngegg.com/pngimages/604/28/png-clipart-disney-characters-disney-cartoon.png",
                years: "3000-11-09",
                name : "뽀로로"
              },
              {
                id:4,
                img: "https://w7.pngwing.com/pngs/567/205/png-transparent-monster-funny-character-food-leaf-hand-thumbnail.png",
                years: "4000-11-09",
                name : "여우"
              },
              {
                id:5,
                img: "https://w7.pngwing.com/pngs/567/205/png-transparent-monster-funny-character-food-leaf-hand-thumbnail.png",
                years: "4000-11-09",
                name : "여우"
              },
              {
                id:6,
                img: "https://w7.pngwing.com/pngs/567/205/png-transparent-monster-funny-character-food-leaf-hand-thumbnail.png",
                years: "4000-11-09",
                name : "여우"
              },
              {
                id:7,
                img: "https://w7.pngwing.com/pngs/567/205/png-transparent-monster-funny-character-food-leaf-hand-thumbnail.png",
                years: "4000-11-09",
                name : "여우"
              },
              {
                id:8,
                img: "https://w7.pngwing.com/pngs/567/205/png-transparent-monster-funny-character-food-leaf-hand-thumbnail.png",
                years: "4000-11-09",
                name : "여우"
              },
              {
                id:9,
                img: "https://w7.pngwing.com/pngs/567/205/png-transparent-monster-funny-character-food-leaf-hand-thumbnail.png",
                years: "4000-11-09",
                name : "여우"
              },
              {
                id:10,
                img: "https://w7.pngwing.com/pngs/949/863/png-transparent-disney-characters-disney-cartoon-character.png",
                years: "4000-11-09",
                name : "여우"
              },
              {
                id:11,
                img: "https://w7.pngwing.com/pngs/949/863/png-transparent-disney-characters-disney-cartoon-character.png",
                years: "4000-11-09",
                name : "여우"
              },
            ]
          },
          {
            id: 2,
            day: "11월 07일 (수)",
            time: "오후 14:00분",
            detailedArea: "미국",
            money: 10000000,
            user: [
              {
                id:1,
                img: "https://w7.pngwing.com/pngs/949/863/png-transparent-disney-characters-disney-cartoon-character.png",
                years: "2000-11-09",
                name : "루피"
              },
              {
                id:2,
                img: "https://w7.pngwing.com/pngs/940/463/png-transparent-disney-characters-disney-cartoon-character.png",
                years: "1000-11-09",
                name : "크몽"
              },
              {
                id:3,
                img: "https://e7.pngegg.com/pngimages/604/28/png-clipart-disney-characters-disney-cartoon.png",
                years: "3000-11-09",
                name : "뽀로로"
              },
            ]
          },
        ]
      },
  
      {
        id: 2,
        region: "서울시",
        img:"https://img.lovepik.com/free-png/20220127/lovepik-badminton-png-image_401948661_wh1200.png",
        title: "[서울역] 배드민턴 초자분들 환영 나이제한없음X",
        people: "50",
        detailedArea: "서울역 5번출구",
        iskeep: false,
        content: `안녕하세요 서울역 배드민턴모입입니다..
        배드민턴을 재밌게하실분들을 모집합니다!!
        텃세가없어요 ! 아무나와서 이용하시면됩니다
        돈들어가는일없이 그냥 참여하세요!`,
       groupSchedule: [],
      },
      {
        id: 3,
        region: "부산시",
        img:"https://www.hanbit.co.kr/data/editor/20191015091554_afbeoaea.png",
        title: "[부산역] 서핑 초자분들 환영 나이제한없음X",
        people: "100",
        detailedArea: "부산역 5번출구",
        iskeep: true,
        content: `안녕하세요 부산 서핑하실분들 모집합니다.
        서핑하면서 태닝도해요! 재밌게하실분들을 모집합니다!!
        장비가 없으면 빌려드립니다.! 초보자분들 체험도 가능합니다!`,
       groupSchedule: [],
      },
]



const UserGroup = {

  myJoinGroup : [
    {
      id: 1,
      region: "성남시",
      title: "[정자역] 클라이밍 초자분들 환영 나이제한없음X [정자역] 클라이밍 초자분들 환영 나이제한없음X",
      people: "85",
      detailedArea: "정자역 5번출구",
      
    },
    {
      id: 2,
      region: "서울시",
      title: "[서울역] 배드민턴 초자분들 환영 나이제한없음X",
      people: "50",
      detailedArea: "서울역 5번출구",
    }
  ],

  myGroup : [
    {
        id: 1,
        img:"https://www.hanbit.co.kr/data/editor/20191015091554_afbeoaea.png",
        region: "부산시",
        title: "[부산역] 서핑 초자분들 환영 나이제한없음X",
        people: "100",
        detailedArea: "부산역 5번출구",
    },
    {
        id: 2,
        img:"https://www.hanbit.co.kr/data/editor/20191015091554_afbeoaea.png",
        region: "부산시",
        title: "[부산역] 서핑 초자분들 환영 나이제한없음X",
        people: "100",
        detailedArea: "부산역 5번출구",
    }
  ]
}
 

const GroupNews = [
  {
    id:1,
    img:"https://www.hanbit.co.kr/data/editor/20191015091554_afbeoaea.png",
    title: "[부산역] 서핑 초자분들 환영 나이제한없음 그냥다들어오세요!",
    day: "5월 11일",
    time: "오후 8:18"
  }
]

// 그룹리스트정보 - 대기
app.get(`/groupList`, (req, res)=>{
    res.status(200).send(GroupList);
})

//알림 - 대기
app.get(`/news`, (req, res) =>{
  res.status(200).send(GroupNews);
})



// 리스트 찜
app.post('/keep', (req, res)=>{
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, access, (err, decode) =>{
    if(err){
      if(err instanceof jwt.TokenExpiredError){
        res.status(401).send("TokenExpiredError");
      } else{
        res.status(400).send(err);
      }
    }else {
      myKeepList(decode.userId)
      .then( data => {
        const currentList = JSON.parse(data.userKeepList);
        const listCheck = currentList.some( list => list.id === req.body.id);
        if(!listCheck){
          currentList.push(req.body);
          const saveList = JSON.stringify(currentList)
          myKeepListAdd(saveList, decode.userId)
          .then( () => res.status(200).send("추가성공"))
          .catch( () => res.status(400).send("추가오류"))
        }

      })
      .catch( err => res.status(400).send("찜리스트조회 오류:" + err))
    }
  })
  
})

// 마이페이지 정보수정
app.patch(`/mypage`, upload.single('userImage'),(req, res)=>{
  const token = req.headers.authorization.split(" ")[1];
  const {userName, userGender, userYears, userActivity, userIntroduce, userImage} = req.body;
  let imageFile = req.file;

  jwt.verify(token, access, (err, decode) =>{
    if(err){
      if(err instanceof jwt.TokenExpiredError){
        res.status(401).send("TokenExpiredError");
      } else{
        res.status(400).send(err);
      }
    } else{
      let imageName;
      if(imageFile){
        imageName = `http://localhost:4000/${imageFile.filename}`;
      }else if(imageFile === undefined){
          imageName = userImage;
      }
      const data = [
        imageName,
        userName,
        userGender,
        userYears,
        userActivity,
        userIntroduce,
        decode.userId
      ];
      myProfileSetting(data)
      .then( () => {
        myProfile( decode.userId ).then( data => {
          const userData = {
            userName: data.userName,
            userYears: data.userYears,
            userGender: data.userGender,
            userActivity: data.userActivity,
            userKeepList: data.userKeepList,
            userImage: data.userImage,
            userIntroduce: data.userIntroduce
          }
          res.status(200).send(userData);
        })
      })
      .catch( err => {
        res.status(400).send("마이페이지정보 수정오류" + err)
      })
    }
  })
})




// 마이페이지
app.get(`/mypage`, ( req, res)=>{
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, access, (err, decode) => {
    if(err){
      if(err instanceof jwt.TokenExpiredError){
        res.status(401).send("TokenExpiredError");
      } else{
        res.status(400).send(err);
      }
    }
    else{
      myProfile( decode.userId ).then( data => {
        const userData = {
          userName: data.userName,
          userYears: data.userYears,
          userGender: data.userGender,
          userActivity: data.userActivity,
          userKeepList: data.userKeepList,
          userImage: data.userImage,
          userIntroduce: data.userIntroduce
        }
        res.status(200).send(userData);
      })
      .catch( err => {
        res.status(400).send("마이페이지 정보 오류:" + err)
      })
    }
  })
})


// 아이디 중복확인
app.get(`/signup/:userid`, (req, res) =>{
  const userid = req.params.userid;
  idCheck(userid).then( data => {
    res.status(200).send(data);
  }).catch( err => {
    res.status(500).send("아이디중복확인오류:" + err);
  })
  
})


// 액세스토큰 재발급
app.get('/token', (req, res)=>{
  const refreshToken = req.cookies.refreshToken;
  jwt.verify(refreshToken, refresh,  (err, decode) => {
    const userId = decode.userId;
    if(err){
      res.status(401).send("유효하지 않은 리프레시토큰");
    } else{
      const accessToken = jwt.sign( {userId}, access, {expiresIn: "1h"});
      res.set('Access-Control-Expose-Headers', 'Authorization');
      res.set('Authorization', accessToken);
      res.status(200).send("토큰재발급");   
    }

  })  
})

// 로그인
app.post(`/login`, (req, res) => {
  const {userId, userPassword} = req.body;
  
  login( userId, userPassword )
  .then( data => {
    if(data){
    const accessToken = jwt.sign( {userId}, access, {expiresIn: "1h"});
    const refreshToken = jwt.sign( {userId}, refresh, {expiresIn: "24h"});
      res.set('Access-Control-Expose-Headers', 'Authorization');
      res.set('Authorization', accessToken);    
      res.cookie('refreshToken', refreshToken,{
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).send(data);
    }else {
      res.status(200).send(data);
    }
    
  })
  .catch( err => {
    res.status(400).send("로그인오류:" + err);
  })
})



//회원가입
app.post(`/signup`, (req, res) => {
  const {userId, userPassword, userPasswordCheck, userName, userPhone, userYears, userGender, userActivity, userIntroduce, userKeepList, userImage} = req.body;
  const idRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{6,12}$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const nameRegex = /^[가-힣]{2,6}$/;
  const phoneRegex = /^01[01679][0-9]{3,4}[0-9]{4,4}$/;
  const yearsRegex = /^[0-9]{4,4}[-][0-9]{2,2}[-][0-9]{2,2}$/;
  const genderRegex = /^[남|여]{1,1}$/;
  
  idCheck(userId)
  .then( (idCheck) => {
    if(!idRegex.test(userId)){
      res.status(400).json("아이디 형식오류");
    }else if(!passwordRegex.test(userPassword)){
      res.status(400).json("비밀번호 형식오류");
    }else if(userPassword !== userPasswordCheck){
      res.status(400).json("비밀번호가 일치하지않음");
    }else if(!nameRegex.test(userName)){
      res.status(400).json("이름 형식오류");
    }else if(!phoneRegex.test(userPhone)){
      res.status(400).json("핸드폰 형식오류");
    }else if(!yearsRegex.test(userYears)){
      res.status(400).json("생년월일 형식오류");
    }else if(!genderRegex.test(userGender)){
      res.status(400).json("성별 형식오류");
    }else if(idCheck){
      res.status(400).send("중복된 아이디");
    } 
    
    else {      
      const userActivityValue = userActivity.trim() !== "" ? userActivity : null;
      const userIntroduceValue = userIntroduce.trim() !== "" ? userIntroduce : null;

      signupAdd({userId, userPassword, userName, userPhone, userYears, userGender, userActivity: userActivityValue, userIntroduce: userIntroduceValue, userKeepList, userImage})
      .then(( data ) => res.status(200).send(data))
      .catch( (err) => res.status(500).send("Error:" + err))
    }
  })
  .catch( err => {
    res.status(500).send("회원가입 오류:" + err);
  }) 

})



// 서버실행
app.listen(port, ()=>{
    console.log(`server port${port}`);
})