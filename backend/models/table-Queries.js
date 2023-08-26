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

// 테이블 column
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
  groupContent TEXT,
  groupTag TEXT
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


module.exports = { db };