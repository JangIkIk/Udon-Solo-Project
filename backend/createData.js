const { db } = require('./models/table-Queries');
const { format, addDays } = require('date-fns');
const { simpleGroupList, groupDetailMeetAll} = require('./models/group-Queries')


// db.run(`DROP TABLE groupInfo`);
// db.run(`DROP TABLE groupDetailMeet`);
// db.run(`DROP TABLE detailMeetUser`);
// db.run(`DROP TABLE users`);

/*-------------------------------TestID-----------------------------------------------*/
const testUser = ["test123","test123!","홍길동","01000000000","2000-01-01","남",null,null,null,null,null]

db.run(
  `INSERT INTO users (userId, userPassword, userName, userPhone, userYears, userGender, userActivity, userIntroduce, userKeepList, userImage, userDayGroup) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  testUser,
  (err) => {
    if (err) return console.error(err.message);
  }
);
/*-------------------------------TestID-----------------------------------------------*/



/*-------------------------------groupUser-----------------------------------------------*/

const createUser = async()=>{

  try{
    const insertQuery = 'INSERT INTO detailMeetUser (groupDetailMeetId, meetUserName, meetUserImg, meetUserId) VALUES (?, ?, ?, ?)';
    const groupDetailMeet = await groupDetailMeetAll();
    const detailMeetId = groupDetailMeet.map( meetList => meetList.id);
    const meetingUser = [];
    let meetingUserCount = 10;
    let result = []
    
    for(let i = 0 ; i < detailMeetId.length ; i++){ 
      if(meetingUserCount === 7){
        meetingUserCount = 10;
      }
      for(let j = 0 ; j < meetingUserCount ; j++){
        result.push(detailMeetId[i]);
        result.push("testMeetName");
        result.push("https://blog.kakaocdn.net/dn/bj4oa7/btqLJWFLMgd/wu4GV8PKbXdICuyW0me0zk/img.jpg");
        result.push("testMeetId");
        meetingUser.push(result);
        result = [];
      }
      meetingUserCount = meetingUserCount - 1;
    }

    db.serialize(()=>{
      let stmt = db.prepare(insertQuery);
  
      for (const group of meetingUser) {
        stmt.run(group, (err) => {
          if (err) return console.error(err.message);
          console.log("데이터 추가");
        });
      }
      stmt.finalize();
    });
  }catch(err){
    console.log(err);
  }
}

/*-------------------------------groupMeet-----------------------------------------------*/
  const selectedDate = (day)=>{
    const meetingDay = new Date();
    const meetomgAddDay = addDays(meetingDay, day);
    const meetingFormat = format(meetomgAddDay, "yyyy-MM-dd");
    return meetingFormat;
  }
 
  const selectedTime = (day)=>{
    const meetingTime1 = "오전 11:30";
    const meetingTime2 = "오후 7:00";
    const meetingTime3 = "오후 4:00";

    if(day === 0){
      return meetingTime1;
    } else if(day === 1){
      return meetingTime2;
    } else{
      return meetingTime3;
    }
  }

  const createGroupMeetDay = async()=>{
    const meetingPlace = "카톡방 공지";
    const meetingMoney = "이용료 + @";

   
    try{
      const insertQuery = `INSERT INTO groupDetailMeet (groupInfoId, detailMeetDay, detailMeetTime, detailMeetArea, detailMeetMoney) VALUES (?, ?, ?, ?, ?)`
      const groupList = await simpleGroupList();
      const groupId = groupList.map( group => group.id);
      const meetingData = []
      let result = [];

        for(let i = 0 ; i < groupId.length ; i++){
          for(let j = 0 ; j < 3 ; j++){
            result.push(groupId[i]);
            result.push(selectedDate(j));
            result.push(selectedTime(j));
            result.push(meetingPlace);
            result.push(meetingMoney);
            meetingData.push(result);
            result = [];
          }
        }

        db.serialize(()=>{
          let stmt = db.prepare(insertQuery);
      
          for (const group of meetingData) {
            stmt.run(group, (err) => {
              if (err) return console.error(err.message);
              console.log("데이터 추가");
            });
          }
          stmt.finalize();
          createUser();
        });

    }catch(err){
      console.log(err)
    }
   
  }
/*-------------------------------groupMeet-----------------------------------------------*/




/*-------------------------------group-----------------------------------------------*/
  const group1 = [
    "서초구",
    "https://san.chosun.com/news/photo/202007/14048_58997_254.jpg",
    "동네락 클라이밍",
    "48",
    `즐거운 클라이밍! 생활을 위해서 모인 클린이들🧗‍♂️
    주암장은 동네 클라이밍 강남점! 원정도 좋아해서 암장추천도 받아요! 
    클라이밍을 접하고 싶은분 초보, 고수 상관없이 다환영합니다~! 
    자주 안와도 괜찮고 한달에 한번 이상 참여부탁드립니다. 
    즐클 안클 행클😁 카카오톡 오픈채팅 -> https://open.kakao.com/o/gOFGHMDf`,
    "클라이밍"
  ]
  const group2 = [
    "성남시",
    "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5894720839/B.jpg?49000000",
    "동네1동 배드민턴 정기운동 모임",
    "32",
    `동네 1동에 있는 동네국민체육센터 실내배드민턴장에서 배드민턴칩니다~! 
    같이치시죠😎 #since 2023.02.22 ~ #
    
    🏸 활동시간
    👉월/수/금 오후 4시10분 ~ 6시👈
    가끔 출근 전(AM 07:00) 운동합니다..!
    어느 쪽이든 늦참가능해요 환영합니다👋
    ⚠️ 모임참석 후 취소할경우 사유 말씀해주세요~
    
    🏸 준비물
    1. 입장료 1,500원
    2. 운동복(반팔 반바지가 좋아요~)
    3. 실내운동화
    4. 배드민턴 라켓
    5. 셔틀콕 남3개 여2개 삼화 이외 셔틀콕X
    *삼화블랙 셔틀콕 1타 18,500원
    모임에서도 개당 3,000원으로 구매 가능합니다.
    6. 마실 물 및 땀 닦을 수건
    7. 그리고 즐겁게 치고 싶다는 마음...🕶️
    
    🏸 가입조건
    나이 성별 배드민턴 경력 상관없이 배드민턴에 관심이 있고 치고 싶은 분이면 됩니다~!!
    하지만!! 한달에 모임 1번이상 참석해주세요.
    미활동이신 분들은 관리하여 내보냅니다.😂
    
    저희 모임은 초보나 아마추어가 대부분이니 맘편히 참석해주시기 바랍니다~🤤
    카카오톡 오픈채팅 -> https://open.kakao.com/o/gOFGHMDf`,
    "배드민턴"
  ]

  const group3 = [
    "강남구",
    "https://www.unipress.co.kr/news/photo/202307/8830_34517_4952.jpg",
    "🧡K-POP스튜디오🧡",
    "114",
    `여름 맞이 다이어트도 즐거운 취미 생활도
    저희 K-POP스튜디와 함께해요🫠
    
    ✅ 기존 가격에서 할인 ✅
    ✨ 25,000원 -> 15,000원 ✨

    ✔️ 춤을 재밌게 신나게 추고 싶다면 K-POP스튜디오!
    ✔️ 춤을 잘 추고 싶다면! K-POP스튜디오!
    ✔️ 몸치에서 벗어나 즐겁게 운동효과를 보고 싶다면!

    💝시간표💝

    🌈 원데이 클래스
      화요일 오후 8시 ~ 오후 9시 (60분)

    🌈 블랙핑크 메들리반(사전모집중)
      금요일 오후 8시 ~ 오후 9시 (60분)

    🌈 방탄소년단 메들리반(사전모집중)
      수요일 오후 8시 ~ 오후 9시 (60분)

    - 섬세한 디테일
    - 이해하기 쉬운 설명
    - 층분한 연습시간 (1 : 1 개인 피드백)
    - 편안한 분위기
    - 비슷한 연령대

    🧡수업참여 방법🧡

    1. 원하는 수업에 참석누르기!!
    2. 계좌번호로 수업료 입금! (동네 000 - 0000 - 00)
    # 참석누르고 바로 입금 해주기!

    🧡수업 장소🧡

    동네동 123-1 번지 B1 K-POP 스튜디오
    (동네역 3, 4 출구 도보 10분!)

    🧡문의사항
    카톡 채팅방 or 010-0000-0000
    카카오톡 오픈채팅 -> https://open.kakao.com/o/gOFGHMDf
    `,
    "댄스/무용"
]

const group4 = [
  "성남시",
  "https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2019/12/1-14.png",
  "동네와인🍷",
  "20",
  `분당 강남 모두가 즐기는 와인모임🍷

  가입조건
  👉 신원 확실하고 인성 좋은 남녀
  👉 88년생까지 가입가능 (예외있음)
  👉 가입 후 3시간 내 카톡방 입장

  ❌ 주사, 허세, 막말, 욕설 즉시 강퇴
  ❌ 모임 분위기 흐리는 분
  ❌ 기혼자, 돌싱

  💬모임 단톡방운영 -> https://open.kakao.com/o/gOFGHMDf
  💬주 활동지역 분당, 강남`,
  "사교/모임"
]

const group5 = [
  "서초구",
  "https://static.wixstatic.com/media/11062b_1012487cf291417ba3e5e1586abbb493~mv2.jpeg/v1/fill/w_640,h_356,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/11062b_1012487cf291417ba3e5e1586abbb493~mv2.jpeg",
  "소수정예 동네 영어회화",
  "241",
  `
  🙇‍♂️영어로 의견을 공유하는 동네영어모임(+원서)
  🙇‍♂️장소: 채팅방공지
  🙇‍♂️일시: 수(19:30 - 21:30)
         토(16:00 - 18:00),일(11:00 - 13:00)
  🙇‍♂️참가비: 2000원 (반드시 모임 하루전날에만 입금)
    * 모임운영비 및 운영진에게 쓰입니다
  🙇‍♂️방식: Free talking 및 Topic 발화, 원서읽기
  🙇‍♂️영어후 뒷푸일 자유 그외 다양한 활동
  🙇‍♂️벌금: 당일취소 5000원, 노쇼 10000원
  🙇‍♂️강퇴: 당일벌금 미준수, 가입후 한달 내 미참석(유령인원)
   카톡방참여 필수 -> https://open.kakao.com/o/gOFGHMDf`,
  "외국/언어"
]
const group6 = [
  "강남구",
  "https://www.hyumc.com/upload/ckfinder/images/210916%20%EA%B3%A8%ED%94%841.png",
  "⛳동네 골프모임(매니아골프모임)",
  "39",
  `
  야! 너두 버디 할 수 있어⛳
  골프에 빠진사람들!

  ✨모임 활동 매주 1회 이상 진행하며, 매너와 존중은 필수입니다
  상대방에게 불쾌감을 주는 행동은 삼가해주세요

  💦 모임 가입후 2주 이내 스크린 or 벙 필수 참석
  💦 매월 정기 필드 라운딩 진행
  💦 가입후 12시간안에 채팅방 참여 -> https://open.kakao.com/o/gOFGHMDf
  💦 가급적 전자담배 추천

  ⭕ 강남구에서만 진행
  ⭕ 나이 96 ~ 84년생 (지인예외)
  ⭕ 개인장비 상관없음
  ⭕ 골린이부터 프로님들까지 너무나 대환영
      모임장도 운영진도 백돌이
  
  ❌ 이런사람은 싫어요
  - 여러골프모임 가입
  - 비매너 해동
  - 다른골프모임 운영진
  - 영업금지
  `,
  "운동/스포츠"
]

const group7 = [
  "강남구",
  "https://www.playfacto.co.kr/images/boardGames_img.png",
  "🎯보드게임 모임 - BP",
  "93",
  `
  서울전지역을 기반으로 하는
  최고의 보드게임 소모임 입니다.
  보드게임을 처음 접하는분,
  보드게임을 좋아 하시는분,
  모두 환영합니다.
  파티게임부터 전략게임까지
  다양한 종류의 게임을 진행합니다.
  보드게임을 하며
  때로는 눈앞에 작은 이익을,
  때로는 보이지 않는 큰 목표를 향해 달려갑니다.
  어떤 것이든 자신만의 그림을 그려나가세요
  그것의 크기와 상관없이
  나중에는 자신만의 큰 그림이 될 것입니다.
  채팅방 -> https://open.kakao.com/o/gOFGHMDf`,
  "게임/오락"
]

const group8 = [
  "마포구",
  "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-2935d0a3e332decb8e727fe56789b6ab",
  "[리그오브레전드] 게임광 모집💗",
  "18",
  `
  ☘️ 롤 & 외 다양한게임 ☘️
  오프라인기반 및 온라인 모임을 함께하실 게임 유저분들을 찾습니다.

  ♻️ 오프라인 모임 참여가 가능하신분 
  ♻️ 롤(리그 오브레전드)만 해도 ok!
  ♻️ 디코 참여 가능하신분

  🎉 게임외 다양한활동도 해요!
  👉 맛집투어, 음주가무, 드라이브, 여행
  👉 카페, 영화, 문화생활 등등
  👉 매월 게임 내 이벤트 진행!
  카톡채팅 -> https://open.kakao.com/o/gOFGHMDf`,
  "게임/오락"
]

const group9 = [
  "서초구",
  "https://san.chosun.com/news/photo/201907/12936_54475_1040.jpg",
  "[서초구]Whale 클라이밍",
  "253",
  `
  🐋 안녕하세요 Whale 클라이밍 입니다.

  🐋클라이밍이 재미없어질지언정 크루는 재미있다!

  Since 22. 10. 16 ~ 
  🐋가입조건
  > 활발한 활동이 가능한 모든사람
  > 나이: 민증만 있으면 가능
  > 초보, 고수 모두가능

  🐋주 활동장소
  > Whale클라이밍 서초점
  > 본인이 원하는 추천암장
  > 클라이밍 외 다양한 취미공유
  > 겨울엔 스키장도 가요!

  🐋 필독사항
  > 카톡방은 필참입니다.
  > 소통없을시에 물갈이대상!

  자세한내용 문의는 010-0000-000
  가입후 입장할 채팅방 -> https://open.kakao.com/o/gOFGHMDf
  * 크루운영관련 의견은 언제나 환영입니다.`,
  "클라이밍"
]

const group10 = [
  "성남시",
  "https://image.dongascience.com/Photo/2017/02/14878990848744.jpg",
  "🔥🔥클린 배드민턴 시즌2 [동네중 대관]",
  "5",
  `
  🔥우리만의 특징🔥
  타 동호회와 같이치기 ❌ 체육관 전체 대관 우리들끼리 ⭕
  매번 내야하는 입장료 ❌ 월회비 한번만 내시면 무제한 ⭕
  딱딱한 체육시설 느낌 ❌ 노래 들으면서 즐겜 배밍모드 ⭕
  실력차이가 심한게임  ❌ 비슷한 실려끼리 매칭해서 겜 ⭕
  배민 레슨해주는 클럽 ❌ 다같이 배드민턴 치는 동호회 ⭕
  교내흡연 비매너 홍보 ❌ 2030집결! 85년 ~ 04년생 ⭕
  오직 배드민턴만해요  ❌ 식사벙 산책벙 볼링벙 카공벙 ⭕
  특정한 셔틀콕만 사용 ❌ 1타에 17000원 이상 셔틀콕 ⭕


  🏸 장소 : 동네중학교
  🏸 조건
    남성: 레슨 3개월 이상 또는 구력 6개월 이상이신 분
    여성: 복식룰 숙지 및 랠리 가능하신분

  🏸 일정
  - 평일 전체 (월,화,수,목,금) 18:30 ~ 22:00
  - 게스트비 : 5000원

  🏸 필수준비물
  - 드실물, 신발, 라켓, 셔틀콕(모임장한테 구입가능)

  🏸 모든문의 : 카카오톡 "동네배드 민턴채널"
`,
  "배드민턴"
]

const createGroup = ()=>{
  const groupNumber = [group1,group2,group3,group4,group5,group6,group7,group8,group9,group10];
  const insertQuery = `INSERT INTO groupInfo (groupRegion, groupImg, groupTitle, groupPeople, groupContent, groupTag) VALUES (?, ?, ?, ?, ?, ?)`

    db.serialize(()=>{
      let stmt = db.prepare(insertQuery);
  
      for (const group of groupNumber) {
        stmt.run(group, (err) => {
          if (err) return console.error(err.message);
          console.log("데이터 추가");
        });
      }
      stmt.finalize();
    });
    createGroupMeetDay();
}

createGroup();
/*-------------------------------group-----------------------------------------------*/

  