const sqlite = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.join(__dirname, "sqlite.db");

const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error("DB연결에러:", err.message);
  console.log("DB연결");
});

const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS users(
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
      userImage TEXT DEFAULT NULL
    );

    CREATE TABLE IF NOT EXISTS groupInfo(
      id INTEGER PRIMARY KEY,
      groupRegion TEXT,
      groupImg TEXT,
      groupTitle TEXT,
      groupPeople TEXT,
      groupDetailedArea TEXT,
      groupContent TEXT
    );
`;

// 테이블 생성 --- 비기능
db.exec(createTablesQuery, (err) => {
  if (err) return console.log("테이블을 생성못함:", err.message);
  console.log("테이블 생성");
});

// //  모든테이블확인 --- 비기능
db.all(" SELECT name FROM sqlite_master WHERE type='table' ", (err, rows) => {
  if (err) {
    console.error(err);
    return;
  }
  rows.forEach((row) => {
    console.log("현재 테이블:", row.name);
  });
});

// // user 테이블 데이터확인 --- 비기능
db.all(`SELECT * FROM users`, [], (err, rows) => {
  if (err) return console.error(err.message);
  console.log("users:", rows);
});
// // groupInfo 테이블 데이터확인 --- 비기능
// db.all(`SELECT * FROM groupInfo`, [], (err, rows) => {
//   if (err) return console.error(err.message);
//   console.log("groupInfo:", rows);
// });

// groupSchedule:[
//   {
//     id: 1,
//     day: "11월 06일 (일)",
//     time: "오전 11:30분",
//     detailedArea: "안국역 원서레인즈",
//     money: 18000,
//     user: [
//       {
//         id:1,
//         img: "https://w7.pngwing.com/pngs/949/863/png-transparent-disney-characters-disney-cartoon-character.png",
//         years: "2000-11-09",
//         name : "루피"
//       },]}]

const test1 = [
  "성남시",
  "https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjhfMjAz/MDAxNTg4MDQwOTA5MjE0.i6ARBaBdi_HYODiTR0f1ma8OvblzSh01bJGL8U5gDZUg.1oPlzYogIg8H_TAk5iZvUMYOLsZkZM1ITTVrfUsIHHog.JPEG.mijung011040/20200424_192926.jpg?type=w800",
  "[정자역] 클라이밍 초자분들 환영 나이제한없음X",
  "85",
  "정자역 5번출구",
  `안녕하세요 정자역 클라이밍입니다.
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
]
const test2 = [
  "서울시",
  "https://img.lovepik.com/free-png/20220127/lovepik-badminton-png-image_401948661_wh1200.png",
  "[서울역] 배드민턴 초자분들 환영 나이제한없음X",
  "50",
  "서울역 5번출구",
  `안녕하세요 서울역 배드민턴모입입니다..
        배드민턴을 재밌게하실분들을 모집합니다!!
        텃세가없어요 ! 아무나와서 이용하시면됩니다
        돈들어가는일없이 그냥 참여하세요!`,
]
const test3 = [
  "부산시",
  "https://www.hanbit.co.kr/data/editor/20191015091554_afbeoaea.png",
  "[부산역] 서핑 초자분들 환영 나이제한없음X",
  "100",
  "부산역 5번출구",
  `안녕하세요 부산 서핑하실분들 모집합니다.
        서핑하면서 태닝도해요! 재밌게하실분들을 모집합니다!!
        장비가 없으면 빌려드립니다.! 초보자분들 체험도 가능합니다!`,
  
]

// 테이블에 데이터 추가
// db.run(`INSERT INTO groupInfo (groupRegion, groupImg, groupTitle, groupPeople, groupDetailedArea, groupContent) VALUES (?, ?, ?, ?, ?, ?)`, test3, (err) => {
//     if(err) return console.error(err.message);
//     console.log("데이터 추가");
// });

// 테이블 삭제
// db.run(`DROP TABLE users`);

// token 테이블 데이터확인 --- 비기능
// db.all(`SELECT * FROM token`, [], (err, rows) => {
//   if (err) return console.error(err.message);
//   console.log("token:", rows);
// });

// usersProfile 테이블 데이터 전체 데이터 조회 --- 비기능
// db.all(`SELECT * FROM usersProfile`, [], (err, rows) => {
//   if (err) return console.error(err.message);
//   console.log("usersProfile:", rows);
// });


// 그룹리스트 조회 --- 기능
const simpleGroupList = () =>{
  return new Promise ( (resolve, reject) => {
    db.all("SELECT id, groupRegion, groupImg, groupTitle, groupPeople, groupDetailedArea FROM groupInfo", [], (err, row)=>{
      if(err){
        reject(err);
      }else{
        resolve(row);
      }
    })
  })
}
// 그룹 상세정보조회 --- 기능
const groupDetailInfo = ( groupId )=>{
  return new Promise( (resolve, reject)=>{
    db.get("SELECT * FROM groupInfo WHERE id = ?", [groupId], (err, row) => {
      if(err){
        reject(err)
      }else{
        
        resolve(row)
      }
    })
  })
}

// 찜리스트 조회 --- 비기능
const myKeepList = ( userId) => {

  return new Promise( (resolve, reject) => {
    db.get("SELECT userKeepList FROM users WHERE userId = ?",[userId], (err, row)=>{
      if(err){
        reject(err);
      }else{
        resolve(row);
      }
    })
  })
  
}


// 찜리스트 추가 --- 기능
const myKeepListAdd = ( list, userId) => {
  return new Promise ( (resolve, reject) => {
    db.run("UPDATE users SET userKeepList = ? WHERE userId = ?", [list, userId], (err) => {
      if(err){
        reject(err);
      } else{
        resolve(true);
      }
    })
  })
}

// 내정보수정(마이페이지) --- 기능
const myProfileSetting = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE users SET userImage = ? ,userName = ?, userGender = ? , userYears = ?, userActivity = ?, userIntroduce = ? WHERE userId = ?`,
      data,
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
    db.get(`SELECT * FROM users WHERE userId = ?`, [userId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// 아이디 중복확인 --- 기능
const idCheck = (userid) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT EXISTS (SELECT 1 FROM users WHERE userId = ?) AS data`,
      [userid],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row[0].data === 1);
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
      `INSERT INTO users (userId, userPassword, userName, userPhone, userYears, userGender, userActivity, userIntroduce, userKeepList, userImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      `SELECT * FROM users WHERE userId = ? AND userPassword = ? `,
      [userId, userPassword],
      (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        if (row) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
};

module.exports = {
  idCheck,
  signupAdd,
  login,
  myProfile,
  myProfileSetting,
  myKeepListAdd,
  myKeepList,
  simpleGroupList,
  groupDetailInfo,
};

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

/*
1. 회원가입
2. 로그인
3. 토큰생성 ?
4. 내프로필
5. 내프로필수정
6. 찜기능
7. 그룹가입기능
8. 그룹접근권한 


*/

// 비회원 기능

// 다크모드
// 언어변경
// 검색가능(필터기능)
// 그룹리스트 확인가능
// 그룹디테일 정복확인가능
// 그룹 가입가능

// 공통기능

// 회원기능
// 그룹디테일 게시판접근가능
// 그룹디테일 사진첩접근가능
// 그룹디테일 채팅가능
// 나의프로필
// 나의그룹
// 나의알림
// 그룹 찜가능

// 회원가입시 데이터

// const usersignUp = {
//     id:
// }
