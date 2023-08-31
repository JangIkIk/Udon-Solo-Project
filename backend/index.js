// env.파일 읽기위함
require('dotenv').config();
//DB파일 생성및 테이블 생성
require('./models/table-Queries');
//임시데이터 추가
require('./createData');
const express = require('express');
const app = express();
const port = 4000;
//cors 모듈
const cors = require('cors');
// 경로지정 관련 모듈
const path = require('path');
// __dirname 은 현재경로기준으로 imageFile 디렉토리의 경로를생성
const uploadsDir = path.join(__dirname, process.env.UPLOAD_DIR);

//CORS 설정
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

// 정적파일 서비스설정 : 클라이언트에서 접근 허용
// 상대경로로 지정
// 절대경로로 지정할경우에는 app.use('[option/ 절대경로]', '상대경로')
app.use(express.static(uploadsDir));

// json타입 파싱을위한 미들웨어
app.use(express.json());

// 각 API 라우터
app.use('/api/group', require('./controllers/group-API'));
app.use('/api/mypage', require('./controllers/mypage-API'));
app.use('/api/users', require('./controllers/users-API'));

// 서버실행
app.listen(port, () => {
    console.log(`server port${port}`);
});






