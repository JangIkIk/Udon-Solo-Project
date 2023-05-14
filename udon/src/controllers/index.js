const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
  }));

  // 임시데이터

  const GroupList = [
    {
        id: 1,
        region: "성남시",
        img:"https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjhfMjAz/MDAxNTg4MDQwOTA5MjE0.i6ARBaBdi_HYODiTR0f1ma8OvblzSh01bJGL8U5gDZUg.1oPlzYogIg8H_TAk5iZvUMYOLsZkZM1ITTVrfUsIHHog.JPEG.mijung011040/20200424_192926.jpg?type=w800",
        title: "[정자역] 클라이밍 초자분들 환영 나이제한없음X",
        people: "85",
        detailedArea: "정자역 5번출구",
        iskeep: false,
      },
  
      {
        id: 2,
        region: "서울시",
        img:"https://img.lovepik.com/free-png/20220127/lovepik-badminton-png-image_401948661_wh1200.png",
        title: "[서울역] 배드민턴 초자분들 환영 나이제한없음X",
        people: "50",
        detailedArea: "서울역 5번출구",
        iskeep: false,
      },
      {
        id: 3,
        region: "부산시",
        img:"https://www.hanbit.co.kr/data/editor/20191015091554_afbeoaea.png",
        title: "[부산역] 서핑 초자분들 환영 나이제한없음X",
        people: "100",
        detailedArea: "부산역 5번출구",
        iskeep: true,
      },
]

const Group = {

  Join : [
    {
        id: 1,
        region: "성남시",
        img:"https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjhfMjAz/MDAxNTg4MDQwOTA5MjE0.i6ARBaBdi_HYODiTR0f1ma8OvblzSh01bJGL8U5gDZUg.1oPlzYogIg8H_TAk5iZvUMYOLsZkZM1ITTVrfUsIHHog.JPEG.mijung011040/20200424_192926.jpg?type=w800",
        title: "[정자역] 클라이밍 초자분들 환영 나이제한없음X",
        people: "85",
    },
    {
        id: 2,
        region: "서울시",
        img:"https://img.lovepik.com/free-png/20220127/lovepik-badminton-png-image_401948661_wh1200.png",
        title: "[서울역] 배드민턴 초자분들 환영 나이제한없음X",
        people: "50",
    }
  ],

  myGroup : [
    {
        id: 1,
        region: "부산시",
        img:"https://www.hanbit.co.kr/data/editor/20191015091554_afbeoaea.png",
        title: "[부산역] 서핑 초자분들 환영 나이제한없음X",
        people: "100",
    }
  ]
  

}
 






app.get(`/groupList`, (req, res)=>{
    res.status(200).send(GroupList);
})

app.listen(port, ()=>{
    console.log(`server port${port}`);
})