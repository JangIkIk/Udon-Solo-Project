const { db } = require('./table-Queries');

// 그룹 전체 조회
const simpleGroupList = () =>{
    return new Promise ( (resolve, reject) => {
      db.all('SELECT * FROM groupInfo', [], (err, row)=>{
        if(err){
          reject(err);
        }else{
          resolve(row);
        }
      })
    })
  }

  // 그룹별 상세정보조회
const groupDetailInfo = ( groupId )=>{
  return new Promise( (resolve, reject)=>{
    db.get('SELECT * FROM groupInfo WHERE id = ?', [groupId], (err, row) => {
      if(err){
        reject(err);
      }else{
        resolve(row);
      }
    })
  })
}

// 그룹 모임 전체조회
const groupDetailMeetAll = ()=>{
  return new Promise ((resolve, reject)=>{
    db.all('SELECT * FROM groupDetailMeet', [], (err,rows)=>{
      if(err){
        reject(err);
      } else{
        resolve(rows);
      }
    })
  })
}

// 그룹 모임정보 그룹별 조회
const groupDetaiMeet = ( groupId )=>{
  return new Promise ((resolve, reject)=>{
    db.all('SELECT * FROM groupDetailMeet WHERE groupInfoId =?', [groupId], (err, row)=>{
      if(err){
        reject(err);
      }else{
        resolve(row);
      }
    })
  })
}

// 가입리스트 조회
const myJoinList = (userId) => {

  return new Promise( (resolve, reject) => {
    db.get('SELECT userJoinList FROM users WHERE userId = ?',[userId], (err, row)=>{
      if(err){
        reject(err);
      }else{
        resolve(row);
      }
    })
  })

}

// 가입리스트 추가
const myJoinListAdd = (list, userId) =>{

  return new Promise ( (resolve, reject) => {
    db.run('UPDATE users SET userJoinList = ? WHERE userId = ?', [list, userId], (err) => {
      if(err){
        reject(err);
      } else{
        resolve();
      }
    })
  })

}

// 그룹 찜리스트 조회
const myKeepList = ( userId) => {

  return new Promise( (resolve, reject) => {
    db.get('SELECT userKeepList FROM users WHERE userId = ?',[userId], (err, row)=>{
      if(err){
        reject(err);
      }else{
        resolve(row);
      }
    })
  })
  
}

// 찜리스트 추가
const myKeepListAdd = ( list, userId) => {
  return new Promise ( (resolve, reject) => {
    db.run('UPDATE users SET userKeepList = ? WHERE userId = ?', [list, userId], (err) => {
      if(err){
        reject(err);
      } else{
        resolve(true);
      }
    })
  })
}

// 그룹모임참여
const DetaiMeetAttendAdd = ( detailMeetId, userName, userImage, userId )=>{
  return new Promise( (resolve, reject)=>{
    db.run('INSERT INTO detailMeetUser ( groupDetailMeetId, meetUserName, meetUserImg, meetUserId ) VALUES (?, ?, ?, ?)', [detailMeetId, userName, userImage, userId], (err)=>{
      if(err){
        reject(err);
      }else{      
        resolve();
      }
    })
  })
}

// 유저 그룹모임 참여 조회
const userGroupDetaiMeetAttend = ( userId ) => {
  return new Promise( (resolve, reject) => {
    db.get('SELECT userDayGroup FROM users WHERE userId = ?',[userId], (err, row)=>{
      if(err){
        reject(err);
      }else{
        resolve(row);
      }
    })
  })
  
}

// 그룹모임참여 ID (users)
const MeetAttendAddIdAdd = (listId, userId)=>{
  return new Promise ( (resolve, reject) => {
    db.run('UPDATE users SET userDayGroup = ? WHERE userId = ?', [listId, userId], (err) => {
      if(err){
        reject(err);
      } else{
        resolve(true);
      }
    })
  })
}



// 그룹모임 선택 삭제
const DetaiMeetAttendCancel = (userId, groupDetailMeetId)=>{
  return new Promise( (resolve, reject) => {
    db.run('DELETE FROM detailMeetUser WHERE meetUserId = ? AND  groupDetailMeetId = ?', [userId, groupDetailMeetId], (err)=>{
      if(err){
        reject(err)
      }else{
        resolve(true)
      }
    })
  })
}

// 그룹모임 탈퇴 삭제
const DetaiMeetAttendDelete = (userId, groupMeetId) => {
  const groupMeetIdLength = groupMeetId.map(()=> '?').join(', ')
  return new Promise( (resolve, reject) => {
    db.run(`DELETE FROM detailMeetUser WHERE meetUserId = ? AND groupDetailMeetId IN (${groupMeetIdLength})`,[userId,...groupMeetId], (err)=>{
      if(err){
        reject(err);
      }else{
        resolve(true);
      }
    })
  })
}


// 그룹모임 유저 조회
const groupDetaiMeetAttend = ()=>{
    return new Promise( (resolve, reject) => {
      db.all('SELECT * FROM detailMeetUser',[],(err, rows)=>{
        if(err){
          reject(err);
        }else{
          resolve(rows);
        }
      })
    })
}

  module.exports = {
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
    DetaiMeetAttendDelete,
    MeetAttendAddIdAdd,
    userGroupDetaiMeetAttend,
    groupDetailMeetAll
  };