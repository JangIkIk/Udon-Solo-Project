const express = require('express');
const router = express.Router();
// JWT 모듈
const jwt = require(`jsonwebtoken`);
// 토큰서명키
const access = "access";
const refresh = "refres";
// 쿠키로 받은값을 파싱하기위한 미들웨어
const cookieParser = require("cookie-parser");
// cookie 인식을 위한 미들웨어
router.use(cookieParser());

// 아이디 중복확인
router.get(`/signup/:userid`, (req, res) => {
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
  router.get("/token", (req, res) => {
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
  router.post(`/login`, (req, res) => {
    const { userId, userPassword } = req.body;

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
router.post(`/signup`, (req, res) => {
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



module.exports = router;
const { 
    idCheck,
    login,
    signupAdd,
 } = require('../models/users-Queries')