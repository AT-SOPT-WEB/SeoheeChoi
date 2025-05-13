import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { nickname, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="p-4 shadow relative">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">HEE</div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <nav className="hidden md:flex gap-4 items-center">
          <button onClick={() => navigate("/mypage")}>내 정보</button>
          <button onClick={() => navigate("/users")}>회원 조회</button>
          <span className="text-sm text-gray-600">{nickname}</span>
          <button onClick={handleLogout} className="text-sm text-red-500">
            로그아웃
          </button>
        </nav>
      </div>
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-white transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-60 p-4 border-t" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          <button onClick={() => navigate("/mypage")}>내 정보</button>
          <button onClick={() => navigate("/users")}>회원 조회</button>
          <span className="text-sm text-gray-600">{nickname}</span>
          <button onClick={handleLogout} className="text-sm text-red-500">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
