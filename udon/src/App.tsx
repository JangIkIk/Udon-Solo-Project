import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HomePage, LodingPage, MyPage, LoginPage, SignUpPage, NewsPage, GroupDetailPage, GroupSettingPage} from "@pages";
import {Footer, Header} from "@components"
import "@styles/index.css"

const CommonFooter = () => {
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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<CommonFooter />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/mypage" element={<MyPage />} />            
            <Route path="/news" element={<NewsPage />} />
            <Route path="/groupsetting" element={<GroupSettingPage />} />
          </Route>
          <Route path="/group" element={<GroupDetailPage />} />
          <Route path="loding" element={<LodingPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
