import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LodingPage from "./pages/LodingPage";
import Header from "./Header";
import Footer from "./Footer";
import GroupPage from "./pages/GroupPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NewsPage from "./pages/NewsPage";

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
            <Route path="/group" element={<GroupPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Route>
          <Route path="loding" element={<LodingPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
