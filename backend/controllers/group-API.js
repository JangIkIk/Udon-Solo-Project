// env.파일 읽기위함
require("dotenv").config();
const express = require("express");
const router = express.Router();
// JWT 모듈
const jwt = require("jsonwebtoken");
const access = process.env.SECRET_ACCESSTOKEN;

const {
  simpleGroupList,
  groupDetailInfo,
  groupDetaiMeet,
  myJoinList,
  myJoinListAdd,
  myKeepList,
  myKeepListAdd,
  DetaiMeetAttendAdd,
  groupDetaiMeetAttend,
  DetaiMeetAttendCancel,
  MeetAttendAddIdAdd,
  userGroupDetaiMeetAttend,
  DetaiMeetAttendDelete
} = require("../models/group-Queries");

const { groupDetaiMeetUser } = require("../models/users-Queries");

// 그룹 전체 조회
router.get("/list", (req, res) => {
  simpleGroupList()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send("그룹조회오류:" + err));
});

// 그룹 상세정보 조회
router.get("/list/:id", async (req, res) => {
  const groupId = req.params.id;

  try {
    const groupInfo = await groupDetailInfo(groupId);
    const groupMeet = await groupDetaiMeet(groupId);
    const groupMeetUser = await groupDetaiMeetAttend();

    if (groupMeet.length > 0) {
      const meetDataMap = {};
      groupMeet.forEach((meet) => {
        meet.detailMeetUser = null;
        meetDataMap[meet.id] = meet;
      });

      groupMeetUser.forEach((user) => {
        if (meetDataMap[user.groupDetailMeetId]) {
          if (meetDataMap[user.groupDetailMeetId].detailMeetUser === null) {
            meetDataMap[user.groupDetailMeetId].detailMeetUser = [];
          }
          meetDataMap[user.groupDetailMeetId].detailMeetUser.push(user);
        }
      });
      groupInfo.groupDetailMeet = Object.values(meetDataMap);
    } else {
      groupInfo.groupDetailMeet = null;
    }

    res.status(200).send(groupInfo);
  } catch (err) {
    res.status(400).send("그룹 상세정보 조회오류:" + err);
  }
});

// 그룹탈퇴
router.delete("/join/:id", async (req, res) => {
  const groupId = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decode = jwt.verify(token, access);
    const joinList = await myJoinList(decode.userId);
    let currentList = joinList.userJoinList? JSON.parse(joinList.userJoinList): [];
    const checkList = currentList.some((list) => list.id === Number(groupId));
    const deleteJoinList = currentList.filter(
      (list) => list.id !== Number(groupId)
    );


      // 해당그룹에 진행중인 일정 ID
      const groupMeetIdArr = await groupDetaiMeet(groupId);
      const groupMeetId = groupMeetIdArr.map( list => list.id);
      

      
      if(groupMeetIdArr.length > 0){
        //    // 그룹에 상관없이 유저가 가지고있는 모임 ID
        console.log("groupMeetId:",groupMeetId);
        console.log("decode.userId:",decode.userId);
        await DetaiMeetAttendDelete(decode.userId, groupMeetId);
        const cueerntUserDayGroup = await userGroupDetaiMeetAttend(decode.userId);
        const parse = JSON.parse(cueerntUserDayGroup.userDayGroup);
        const uniqueValues = parse.filter(value => !groupMeetId.includes(value));
        await MeetAttendAddIdAdd(JSON.stringify(uniqueValues), decode.userId)
      }



    const newJoinList =
      deleteJoinList.length === 0 ? null : JSON.stringify(deleteJoinList);

    if (checkList) {
      await myJoinListAdd(newJoinList, decode.userId);
      res.status(200).send("그룹가입 탈퇴완료");
    } else {
      throw new Error("409");
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).send("TokenExpiredError");
    } else if (err.message === "409") {
      res.status(409).send("탈퇴할 그룹이 존재하지않음");
    } else {
      res.status(400).send(err);
    }
  }
});

// 그룹가입
router.post("/join", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decode = jwt.verify(token, access);
    const joinList = await myJoinList(decode.userId);
    let currentList = joinList.userJoinList
      ? JSON.parse(joinList.userJoinList)
      : [];
    const checkList = currentList.some((list) => list.id === req.body.id);

    if (checkList) {
      throw new Error("409");
    } else {
      currentList.push(req.body);
      const newJoinList = JSON.stringify(currentList);
      await myJoinListAdd(newJoinList, decode.userId);
      res.status(200).send("그룹가입 완료");
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).send("TokenExpiredError");
    } else if (err.message === "409") {
      res.status(409).send("중복된 데이터");
    } else {
      res.status(400).send(err);
    }
  }
});

// 그룹 찜하기
router.post("/keep", (req, res) => {
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
          let currentList = data.userKeepList
            ? JSON.parse(data.userKeepList)
            : [];
          const listCheck = currentList.some((list) => list.id === req.body.id);

          if (listCheck) {
            let deleteList = currentList.filter(
              (list) => list.id !== req.body.id
            );

            if (deleteList.length === 0) {
              deleteList = null;
            } else {
              deleteList = JSON.stringify(deleteList);
            }

            myKeepListAdd(deleteList, decode.userId)
              .then(() => res.status(200).send(false))
              .catch(() => res.status(400).send("삭제오류"));
          } else {
            currentList.push(req.body);
            myKeepListAdd(JSON.stringify(currentList), decode.userId)
              .then(() => res.status(200).send(true))
              .catch(() => res.status(400).send("추가오류"));
          }
        })
        .catch((err) => res.status(400).send("찜리스트조회 오류:" + err));
    }
  });
});

// 그룹 모임일정 참여
router.post("/attend", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { detailMeetId } = req.body;

  try {
    const decode = jwt.verify(token, process.env.SECRET_ACCESSTOKEN);
    const userMeetData = await groupDetaiMeetUser(decode.userId);
    await DetaiMeetAttendAdd(
      detailMeetId,
      userMeetData.userName,
      userMeetData.userImage,
      decode.userId
    );
    const currentDayGroup = await userGroupDetaiMeetAttend(decode.userId);
    let parseDayGroup = currentDayGroup.userDayGroup ? currentDayGroup.userDayGroup = JSON.parse(currentDayGroup.userDayGroup): [];
    parseDayGroup.push(detailMeetId);
    

    await MeetAttendAddIdAdd(JSON.stringify(parseDayGroup), decode.userId);


    res.status(200).send(true);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).send("TokenExpiredError");
    } else {
      res.status(400).send(err);
    }
  }
});

// 그룹 모임일정 취소
router.delete("/attend/:id", async ( req, res)=>{
  const token = req.headers.authorization.split(" ")[1];
  const groupDetailMeetId = req.params.id;


  try{
    const decode = jwt.verify(token, process.env.SECRET_ACCESSTOKEN);
    await DetaiMeetAttendCancel(decode.userId, groupDetailMeetId);
    const currentDayGroup = await userGroupDetaiMeetAttend(decode.userId);
    let parseDayGroup = currentDayGroup.userDayGroup ? currentDayGroup.userDayGroup = JSON.parse(currentDayGroup.userDayGroup): [];
    if(parseDayGroup.length === 0){
      parseDayGroup = null;
    }{
      parseDayGroup = parseDayGroup.filter( id => id !== Number(groupDetailMeetId));
    }
    await MeetAttendAddIdAdd(JSON.stringify(parseDayGroup), decode.userId)
    res.status(200).send("성공");

  }catch(err){
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).send("TokenExpiredError");
    } else {
      res.status(400).send(err);
    }
  }
});

module.exports = router;
