const { db } = require('./table-Queries');

// 내정보수정(마이페이지) --- 기능
const myProfileSetting = (data,userId) => {
  
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE users SET userImage = ?, userName = ?, userGender = ? , userYears = ?, userActivity = ?, userIntroduce = ? WHERE userId = ?`,
        [...data,userId],
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

  // 내정보조회(마이페이지) --- 기능
const myProfile = (userId) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT userName, userYears, userGender, userActivity, userKeepList, userJoinList, userImage, userIntroduce FROM users WHERE userId = ?`, [userId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  };

  // 전체 그룹리스트 조회 --- 기능
const simpleGroupList = () =>{
    return new Promise ( (resolve, reject) => {
      db.all("SELECT * FROM groupInfo", [], (err, row)=>{
        if(err){
          reject(err);
        }else{
          resolve(row);
        }
      })
    })
  }

  module.exports = {
    myProfileSetting,
    myProfile,
    simpleGroupList
  };