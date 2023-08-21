const { db } = require('./table-Queries');

// 아이디 중복확인 --- 기능
const idCheck = (userid) => {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT EXISTS (SELECT 1 FROM users WHERE userId = ?) AS data',
        [userid],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            const isUserIdExists = row[0].data === 1;
            resolve(isUserIdExists);
          }
        }
      );
    });
  };

  // 회원가입 --- 기능
const signupAdd = ({
    userId,
    userPassword,
    userName,
    userPhone,
    userYears,
    userGender,
    userActivity,
    userIntroduce,
    userKeepList,
    userImage,
  }) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (userId, userPassword, userName, userPhone, userYears, userGender, userActivity, userIntroduce, userKeepList, userImage, userDayGroup) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          userId,
          userPassword,
          userName,
          userPhone,
          userYears,
          userGender,
          userActivity,
          userIntroduce,
          userKeepList,
          userImage,
          userDayGroup
        ],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  };

  // 로그인(아이디,패스워드) --- 기능
const login = (userId, userPassword) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT userId, userKeepList, userJoinList, userImage, userDayGroup FROM users WHERE userId = ? AND userPassword = ? ',
        [userId, userPassword],
        (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          if (row) {
            resolve(row);
          } else {
            reject();
          }
        }
      );
    });
  };

  // 유저 이미지 및 이름 조회 (그룹관련)
const groupDetaiMeetUser = ( userId )=>{
  return new Promise((resolve, reject) => {
    db.get('SELECT userName, userImage FROM users WHERE userId =?',userId, (err, row)=>{
      if(err){
        reject(err)
      }else{
        resolve(row)
      }
    })
  })
}


  module.exports = {
    idCheck,
    signupAdd,
    login,
    groupDetaiMeetUser
  };