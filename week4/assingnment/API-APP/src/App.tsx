import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import MyPage from "@/pages/mypage";
import UserListPage from "@/pages/users";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/users" element={<UserListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
