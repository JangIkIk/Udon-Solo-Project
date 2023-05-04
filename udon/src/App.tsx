import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LodingPage from "./pages/LodingPage";
import FooterPage from "./pages/FooterPage";
import GroupPage from "./pages/GroupPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const CommonFooter = () => {
  return (
    <>
      <Outlet />
      <FooterPage />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<CommonFooter />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/group" element={<GroupPage />}></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
          </Route>
          <Route path="loding" element={<LodingPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
