// DB를 사용하기위한 spqlite3 모듈 과 자세한 디버깅을 위한 verbose();
const sqlite = require('sqlite3').verbose();
// 파일의 존재여부를 확인하기 위한 모듈
const fs = require('fs')
// 경로와 관련된 함수들을 제공하는 모듈
const path = require('path');
// path.join()모듈을 사용하여 현재파일이 위치한 경로와 sqlite.db파일을 결합
const dbPath = path.join(__dirname, 'sqlite.db');

// DB파일이 존재하지 않는다면 생성, 존재한다면 생성하지않음
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "");
  console.log(`${dbPath}생성`);
  
} else {
  console.log(`${dbPath} 존재함`);
}

// DB파일의 경로와 파일의 모드를 설정한후 연결하는 역할
const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error('DB파일 연결불가:', err.message);
  console.log('DB파일 연결');
});

// 테이블 양식
const createTablesQuery = `CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY, 
  userId TEXT,
  userPassword TEXT,
  userName TEXT,
  userPhone TEXT,
  userYears TEXT,
  userGender TEXT,
  userActivity TEXT DEFAULT NULL,
  userIntroduce TEXT DEFAULT NULL,
  userKeepList TEXT DEFAULT NULL,
  userJoinList TEXT DEFAULT NULL,
  userImage TEXT DEFAULT NULL,
  userDayGroup TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS groupInfo(
  id INTEGER PRIMARY KEY,
  groupRegion TEXT,
  groupImg TEXT,
  groupTitle TEXT,
  groupPeople TEXT,
  groupContent TEXT
);

CREATE TABLE IF NOT EXISTS groupDetailMeet(
  id INTEGER PRIMARY KEY,
  groupInfoId INTEGER,
  detailMeetDay TEXT,
  detailMeetTime TEXT,
  detailMeetArea TEXT,
  detailMeetMoney TEXT,
  FOREIGN KEY (groupInfoId) REFERENCES groupInfo(id)
);

CREATE TABLE IF NOT EXISTS detailMeetUser(
  id INTEGER PRIMARY KEY,
  groupDetailMeetId INTEGER,
  meetUserId TEXT,
  meetUserImg TEXT,
  meetUserName TEXT,
  FOREIGN KEY (groupDetailMeetId) REFERENCES groupDetailMeet(id)
  );
`;


// 테이블 생성
db.exec(createTablesQuery, (err) => {
  if (err) return console.log('테이블을 생성못함:', err.message);
  console.log('테이블 생성');
});


// //  모든테이블확인 --- 비기능
db.all(" SELECT name FROM sqlite_master WHERE type='table' ", (err, rows) => {
  if (err) {
    console.error(err);
    return;
  }
  rows.forEach((row) => {
    console.log('현재 테이블:', row.name);
  });
});


module.exports = { db };



/*------------------------------------------------------------------------------*/

// @@@@@@@@@@@@users 테이블 삭제
// db.run(`DROP TABLE users`)

// users 테이블 데이터확인 --- 비기능
db.all('SELECT * FROM users', [], (err, rows) => {
  if (err) return console.error(err.message);
  console.log('users:', rows);
});

// const testUser = ["test123","test123!","테스트","0102333333","2023-08-09","남",null,null,null,null,null]

// db.run(
//   `INSERT INTO users (userId, userPassword, userName, userPhone, userYears, userGender, userActivity, userIntroduce, userKeepList, userImage, userDayGroup) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//   testUser,
//   (err) => {
//     if (err) return console.error(err.message);
//   }
// );

// const testUser = ["test1234","test1234!","홍길동","0102333333","2023-08-09","남",null,null,null,null,null]

// db.run(
//   `INSERT INTO users (userId, userPassword, userName, userPhone, userYears, userGender, userActivity, userIntroduce, userKeepList, userImage, userDayGroup) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//   testUser,
//   (err) => {
//     if (err) return console.error(err.message);
//   }
// );



/*------------------------------------------------------------------------------*/

// @@@@@@@@@@@@ groupInfo 테이블 삭제
// db.run(`DROP TABLE groupInfo`)

// groupInfo 테이블 데이터확인 --- 비기능
db.all('SELECT * FROM groupInfo', [], (err, rows) => {
  if (err) return console.error(err.message);
  console.log('groupInfo:', rows);
});


// const groupInfo = [
//   "성남시",
//   "https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjhfMjAz/MDAxNTg4MDQwOTA5MjE0.i6ARBaBdi_HYODiTR0f1ma8OvblzSh01bJGL8U5gDZUg.1oPlzYogIg8H_TAk5iZvUMYOLsZkZM1ITTVrfUsIHHog.JPEG.mijung011040/20200424_192926.jpg?type=w800",
//   "[정자역] 클라이밍 초자분들 환영 나이제한없음X",
//   "85",
//   "안녕하세요 정자역 클라이밍입니다.",
// ]

// // groupInfo 테이블에 데이터 추가
// db.run(`INSERT INTO groupInfo (groupRegion, groupImg, groupTitle, groupPeople, groupContent) VALUES (?, ?, ?, ?, ?)`, groupInfo, (err) => {
//     if(err) return console.error(err.message);
//     console.log("데이터 추가");
// });



/*------------------------------------------------------------------------------*/
// @@@@@@@@@@@@ groupDetailMeet 테이블 삭제
// db.run(`DROP TABLE groupDetailMeet`)

// groupDetailMeet 테이블 데이터확인 --- 비기능
db.all('SELECT * FROM groupDetailMeet', [], (err, rows) => {
  if (err) return console.error(err.message);
  console.log('groupDetailMeet:', rows);
});

// const groupDetailMeet = [
//   1,
//   "4월 1일 (금)",
//   "오후 4:00",
//   "수내 락트리",
//   "암장비",
// ];
// db.run(`INSERT INTO groupDetailMeet (groupInfoId, detailMeetDay, detailMeetTime, detailMeetArea, detailMeetMoney) VALUES (?, ?, ?, ?, ?)`, groupDetailMeet, (err) => {
//     if(err) return console.error(err.message);
//     console.log("데이터 추가");
// });


// const groupDetailMeet1 = [
//   1,
//   "4월 1일 (금)",
//   "오후 4:00",
//   "강남 손상원",
//   "20,000",
// ]

// db.run(`INSERT INTO groupDetailMeet (groupInfoId, detailMeetDay, detailMeetTime, detailMeetArea, detailMeetMoney) VALUES (?, ?, ?, ?, ?)`, groupDetailMeet1, (err) => {
//     if(err) return console.error(err.message);
//     console.log("데이터 추가");
// });

/*------------------------------------------------------------------------------*/

// @@@@@@@@@@@@ detailMeetUser 테이블 삭제
// db.run(`DROP TABLE detailMeetUser`)

// detailMeetUser 테이블 데이터확인 --- 비기능
db.all('SELECT * FROM detailMeetUser', [], (err, rows) => {
  if (err) return console.error(err.message);
  console.log('detailMeetUser:', rows);
});


// db.run(
//   'INSERT INTO detailMeetUser (groupDetailMeetId, meetUserName, meetUserImg, meetUserId) VALUES (?, ?, ?, ?)',
//   [1, "홍길동", "img", "강제아이디1"],
//   (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log("추가");
//   }
// );

// db.run(
//   'INSERT INTO detailMeetUser (groupDetailMeetId, meetUserName, meetUserImg, meetUserId) VALUES (?, ?, ?, ?)',
//   [1, "세종대왕", "img", "강제아이디2"],
//   (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log("추가");
//   }
// );

// db.run(
//   'INSERT INTO detailMeetUser (groupDetailMeetId, meetUserName, meetUserImg) VALUES (?, ?, ?)',
//   [2, "피카츄", "img"],
//   (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log("추가");
//   }
// );







// db.run(`DELETE FROM users WHERE userId = ?`, [1], (err)=>{
//      if(err) return console.error(err.message);
//  })



// db.run(`DROP TABLE myProfile`);
// db.run(`DROP TABLE myProfile`);

/*
 CREATE TABLE IF NOT EXISTS myProfile(
      id INTEGER PRIMARY KEY,
      userName TEXT,
      userYears TEXT,
      userGender TEXT,
      userActivity TEXT,
      userKeeplList TEXT DEFAULT NUll,
    );
*/

/*
CREATE TABLE IF NOT EXISTS group(
      id INTEGER PRIMARY KEY,
      groupRegion: TEXT,
      groupTitle: TEXT,
      groupPeople: TEXT,
      groupDetailedArea: TEXT,
      groupKeep: TEXT,
    );
*/

// 실행되는 쿼리문 확인
// db.on("trace", (sql) => {
//     console.log("SQL:", sql);
//   });

// 특정 테이블 전체 데이터조회
// db.all(`SELECT * FROM users`, [], (err,rows)=>{
//     if(err) return console.error(err.message);
//     console.log("전체데이터 조회:",rows);
// });

//   console.log("테스트조인:",test.join(', '));

// users 테이블생성
// db.run(`CREATE TABLE ${tablename}(${columns.join(', ')})`);

// 테이블 삭제
// db.run(`DROP TABLE ${userTable}`);

// 테이블에 데이터 추가
// db.run(`INSERT INTO ${tablename} (userID, userPassword, userName, userPhone, userYears, userGender, userActivity, userIntroduce) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, test, (err) => {
//     if(err) return console.error(err.message);
//     console.log("데이터 추가");
// });

// 특정 데이터 수정
// db.run(`UPDATE ${tablename} SET userName = ? WHERE id = ?`, ["jang",2], (err)=>{
//      if(err) return console.erroe(err.message);
//  })

// 전체데이터삭제
// db.run(`DELETE FROM ${tablename}`, [], (err)=>{
//      if(err) return console.error(err.message);
//  })

// 특정조건 데이터 삭제
// db.run(`DELETE FROM ${tablename} WHERE id = ?`, [1], (err)=>{
//      if(err) return console.error(err.message);
//  })

// db.all(`SELECT userID FROM ${tablename} WHERE  userID = ?`, ["testID"], (err,rows)=>{
//      if(err) return console.error(err.message);
//     //  console.log(true)

//  })

// 특정 데이터에 대해서 모든데이터 조회
// db.all(`SELECT DISTINCT userName FROM ${tablename}`,[], (err, rows)=>{
//      if(err) return console.error(err.message);
//      console.log(rows);
//  })

// 특정 데이터들을 각각 처리할수가 있다
// db.each(`SELECT userName, userAge FROM ${tablename}`, (err, row) => {
//      if (err) {
//        console.error(err.message);
//      } else {
//        console.log(row.userName, row.userAge);
//      }
//    });

