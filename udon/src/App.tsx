import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import {
  HomePage,
  LodingPage,
  MyPage,
  LoginPage,
  SignUpPage,
  NewsPage,
  GroupDetailPage,
} from "@pages/index";
import { Footer, Header } from "@components";
import "@styles/index.css";

const PrivateRoute = () => {
  const storge = sessionStorage.getItem('accessToken');
  const cookie = document.cookie.includes('accessToken');
  
  if(storge === null && cookie === false){
    return <Navigate to="/login"/>
  } else{
    return <Outlet/>
  }
};


const HeaderandFooter = () => {
  return (
    <>
      <Header />
      <div className="layout-space">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
const HeaderOnly = () => {
  return (
    <>
      <Header />
      <div className="layout-space">
        <Outlet />
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<HeaderandFooter />}>
            <Route element={<PrivateRoute/>}>
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/news" element={<NewsPage />} />
            </Route>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route element={<HeaderOnly />}>
            <Route path="/signup" element={<SignUpPage />}></Route>
          </Route>
          <Route path="/group" element={<GroupDetailPage />} />
          <Route path="loding" element={<LodingPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
