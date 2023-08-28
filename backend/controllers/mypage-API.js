// env.파일 읽기위함
require('dotenv').config();
const express = require('express');
const router = express.Router();
const fs = require('fs');
// JWT 모듈
const jwt = require('jsonwebtoken');
// 토큰서명키
const access = process.env.SECRET_ACCESSTOKEN;
// 이미지 파일업로드 하기위한 미들웨어
const multer = require('multer');
// 파일이 저장될 디렉토리, 파일이 저장될 형식을 or 이름을 설정
// 디렉토리가생성되는 기준은 해당코드가 작성된 경로가 기준이아닌 실행되는 기준으로 인식
const storage = multer.diskStorage({
  destination: (req, file, cd)=>{

    const directory = process.env.UPLOAD_DIR;

    if(!fs.existsSync(directory)){
      fs.mkdirSync(directory);
    }
    cd(null, directory);
  },
  filename: (req, file, cd)=>{
    let originalFile = file.originalname;
    cd(null, originalFile);
  }
});

// storage객체에서 설정한 내용을 토대로 파일업로드 할때 처리된다.
const upload = multer({ storage: storage });


const { 
  myProfileSetting,
  myProfile
} = require('../models/mypage-Queries');

// 마이페이지
router.get('/', (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, access, (err, decode) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          res.status(401).send('TokenExpiredError');
        } else {
          res.status(400).send(err);
        }
      } else {
        myProfile(decode.userId)
          .then((data) => {
            data.userKeepList = JSON.parse(data.userKeepList) ?? null;
            data.userJoinList = JSON.parse(data.userJoinList) ?? null;
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(400).send('마이페이지 조회오류:' + err);
          });
      }
    });
  });

// 마이페이지 정보수정 (해당 엔드포인트로 요청이 들어올때 userImage에 담긴 파일을 업로드하도록 설정)
router.patch('/', upload.single('userImage'), async(req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {
      userName,
      userGender,
      userYears,
      userActivity,
      userIntroduce,
    } = req.body;
    let imageFile = req.file ?  req.file : req.body.userImage;
    let isNull = userActivity
  
    if(!imageFile){
      imageFile = null;
    } else if(imageFile.filename){
      imageFile = `${process.env.IMAGE_FILEPATCH}/${imageFile.filename}`
    }

    if(isNull === ""){
      isNull = null;
    }

    try{
      const decode = jwt.verify(token,access);
      await myProfileSetting([imageFile, userName,userGender,userYears,isNull,userIntroduce],decode.userId);
      const userdata = await myProfile(decode.userId);
      userdata.userJoinList = JSON.parse(userdata.userJoinList) ?? null;
      userdata.userKeepList = JSON.parse(userdata.userKeepList) ?? null;
      res.status(200).send(userdata);
    }
    catch(err){
      if(err instanceof jwt.TokenExpiredError){
        res.status(401).send('TokenExpiredError')
      }else{
        res.status(400).send(err)
      }
    }
  });

module.exports = router;

