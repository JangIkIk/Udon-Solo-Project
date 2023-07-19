const express = require("express");
const app = express();
const port = 4000;
//  cors 모듈
const cors = require("cors");
// JWT 모듈
const jwt = require(`jsonwebtoken`);
// 쿠키로 받은값을 파싱하기위한 미들웨어
const cookieParser = require("cookie-parser");
// 토큰서명키
const access = "access";
const refresh = "refres";
// 이미지 파일데이터를 읽기위한 미들웨어
const multer = require("multer");
// 이미지 파일 저장경로
const upload = multer({ dest: "uploads/" });
const path = require("path");
const uploadsDir = path.join(__dirname, "uploads");
app.use(express.static(uploadsDir));

// json타입 파싱을위한 미들웨어
app.use(express.json());

//  CORS 설정
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

// DB탐색 함수
const {
  idCheck,
  signupAdd,
  login,
  myProfile,
  myProfileSetting,
  myKeepList,
  myKeepListAdd,
  simpleGroupList,
  groupDetailInfo,
} = require("../models/sqlite");

const GroupNews = [
  {
    id: 1,
    img: "https://www.hanbit.co.kr/data/editor/20191015091554_afbeoaea.png",
    title: "[부산역] 서핑 초자분들 환영 나이제한없음 그냥다들어오세요!",
    day: "5월 11일",
    time: "오후 8:18",
  },
];

//알림 - 대기
app.get(`/news`, (req, res) => {
  res.status(200).send(GroupNews);
});


// 그룹가입
app.get("/groupJoin", (req, res)=>{
  const token = req.headers.authorization.split(" ")[1];

  

})


// 그룹 상세정보 조회
app.get("/groupInfo/:id", (req, res) => {
  const groupId = req.params.id;
  // const token = req.headers.authorization.split(" ")[1];
  // if (token) {
  //   try {
  //     const decodeToken = jwt.verify(token, access);
  //     const userId = decodeToken.userId;
  //     console.log("로그인상태");
  //     groupDetailInfo(groupId)
  //       .then((data) => {
  //         myKeepList(userId)
  //         .then( list => {
  //           const myKeepList = list.userKeepList ? JSON.parse(list.userKeepList) : [];
  //           console.log(myKeepList);
            
  //           res.status(200).send(data);
  //         })
  //       })
  //       .catch((err) => {
  //         res.status(400).send("상세정보 조회오류" + err);
  //       });
  //   } catch {
  //     console.log("비로그인상태");
  //     groupDetailInfo(groupId)
  //       .then((data) => {
  //         res.status(200).send(data);
  //       })
  //       .catch((err) => {
  //         res.status(400).send("상세정보 조회오류" + err);
  //       });
  //   }
  // }

  groupDetailInfo(groupId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send("상세정보 조회오류" + err);
    });
});

// 그룹 게시판 조회
// 그룹 사진첩 조회
// 그룹 채팅조회

// 전체그룹리스트 조회
app.get(`/groupList`, (req, res) => {
  simpleGroupList()
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send("그룹조회오류:" + err));
});

// 리스트 찜
app.post("/groupkeep", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, access, (err, decode) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        res.status(401).send("TokenExpiredError");
      } else {
        res.status(400).send(err);
      }
    } else {
      myKeepList(decode.userId)
        .then((data) => {
          let currentList = data.userKeepList ? JSON.parse(data.userKeepList) : [] ;
          const listCheck = currentList.some( list => list.id === req.body.id);

          if (listCheck) {
            let deleteList = currentList.filter(
              (list) => list.id !== req.body.id
              );
              
            if(deleteList.length === 0){
              deleteList = null;
            } else{
              deleteList = JSON.stringify(deleteList)
            }

              myKeepListAdd(deleteList, decode.userId)
              .then(() => res.status(200).send("삭제성공"))
              .catch(() => res.status(400).send("삭제오류"));
          } else {
            currentList.push(req.body);
            myKeepListAdd(JSON.stringify(currentList), decode.userId)
              .then(() => res.status(200).send("추가성공"))
              .catch(() => res.status(400).send("추가오류"));
          }
        })
        .catch((err) => res.status(400).send("찜리스트조회 오류:" + err));
    }
  });
});

// 마이페이지 정보수정
app.patch(`/mypage`, upload.single("userImage"), (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const {
    userName,
    userGender,
    userYears,
    userActivity,
    userIntroduce,
    userImage,
  } = req.body;
  let imageFile = req.file;

  jwt.verify(token, access, (err, decode) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        res.status(401).send("TokenExpiredError");
      } else {
        res.status(400).send(err);
      }
    } else {
      let imageName;
      if (imageFile) {
        imageName = `http://localhost:4000/${imageFile.filename}`;
      } else if (imageFile === undefined) {
        imageName = userImage;
      }
      const data = [
        imageName,
        userName,
        userGender,
        userYears,
        userActivity,
        userIntroduce,
        decode.userId,
      ];
      myProfileSetting(data)
        .then(() => {
          myProfile(decode.userId).then((data) => {
            const userData = {
              userName: data.userName,
              userYears: data.userYears,
              userGender: data.userGender,
              userActivity: data.userActivity,
              userKeepList: data.userKeepList,
              userImage: data.userImage,
              userIntroduce: data.userIntroduce,
            };
            res.status(200).send(userData);
          });
        })
        .catch((err) => {
          res.status(400).send("마이페이지정보 수정오류" + err);
        });
    }
  });
});

// 마이페이지
app.get(`/mypage`, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, access, (err, decode) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        res.status(401).send("TokenExpiredError");
      } else {
        res.status(400).send(err);
      }
    } else {
      myProfile(decode.userId)
        .then((data) => {
          const userData = {
            userName: data.userName,
            userYears: data.userYears,
            userGender: data.userGender,
            userActivity: data.userActivity,
            userKeepList: JSON.parse(data.userKeepList),
            userJoinList: JSON.parse(data.userJoinList),
            userImage: data.userImage,
            userIntroduce: data.userIntroduce,
          };
          res.status(200).send(userData);
        })
        .catch((err) => {
          res.status(400).send("마이페이지 정보 오류:" + err);
        });
    }
  });
});

// 아이디 중복확인
app.get(`/signup/:userid`, (req, res) => {
  const userid = req.params.userid;
  idCheck(userid)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send("아이디중복확인오류:" + err);
    });
});

// 액세스토큰 재발급
app.get("/token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  jwt.verify(refreshToken, refresh, (err, decode) => {
    const userId = decode.userId;
    if (err) {
      res.status(401).send("유효하지 않은 리프레시토큰");
    } else {
      const accessToken = jwt.sign({ userId }, access, { expiresIn: "1h" });
      res.set("Access-Control-Expose-Headers", "Authorization");
      res.set("Authorization", accessToken);
      res.status(200).send("토큰재발급");
    }
  });
});

// 로그인
app.post(`/login`, (req, res) => {
  const { userId, userPassword } = req.body;
  console.log(req.body)

  login(userId, userPassword)
    .then((data) => {
      if (data) {
        const accessToken = jwt.sign({ userId }, access, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ userId }, refresh, {
          expiresIn: "24h",
        });
        res.set("Access-Control-Expose-Headers", "Authorization");
        res.set("Authorization", accessToken);
        res.cookie("refreshToken", refreshToken, {
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).send(data);
      }
    })
    .catch(() => {
      res.status(400).send();
    });
});

//회원가입
app.post(`/signup`, (req, res) => {
  const {
    userId,
    userPassword,
    userPasswordCheck,
    userName,
    userPhone,
    userYears,
    userGender,
    userActivity,
    userIntroduce,
    userKeepList,
    userImage,
  } = req.body;
  const idRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{6,12}$/;
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const nameRegex = /^[가-힣]{2,6}$/;
  const phoneRegex = /^01[01679][0-9]{3,4}[0-9]{4,4}$/;
  const yearsRegex = /^[0-9]{4,4}[-][0-9]{2,2}[-][0-9]{2,2}$/;
  const genderRegex = /^[남|여]{1,1}$/;

  idCheck(userId)
    .then((idCheck) => {
      if (!idRegex.test(userId)) {
        res.status(400).json("아이디 형식오류");
      } else if (!passwordRegex.test(userPassword)) {
        res.status(400).json("비밀번호 형식오류");
      } else if (userPassword !== userPasswordCheck) {
        res.status(400).json("비밀번호가 일치하지않음");
      } else if (!nameRegex.test(userName)) {
        res.status(400).json("이름 형식오류");
      } else if (!phoneRegex.test(userPhone)) {
        res.status(400).json("핸드폰 형식오류");
      } else if (!yearsRegex.test(userYears)) {
        res.status(400).json("생년월일 형식오류");
      } else if (!genderRegex.test(userGender)) {
        res.status(400).json("성별 형식오류");
      } else if (idCheck) {
        res.status(400).send("중복된 아이디");
      } else {
        const userActivityValue =
          userActivity.trim() !== "" ? userActivity : null;
        const userIntroduceValue =
          userIntroduce.trim() !== "" ? userIntroduce : null;

        signupAdd({
          userId,
          userPassword,
          userName,
          userPhone,
          userYears,
          userGender,
          userActivity: userActivityValue,
          userIntroduce: userIntroduceValue,
          userKeepList,
          userImage,
        })
          .then((data) => res.status(200).send(data))
          .catch((err) => res.status(500).send("Error:" + err));
      }
    })
    .catch((err) => {
      res.status(500).send("회원가입 오류:" + err);
    });
});

// 서버실행
app.listen(port, () => {
  console.log(`server port${port}`);
});
