import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin, getMyInfo } from "@/api/user";
import { useAuthStore } from "@/store/auth";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserId, setNickname } = useAuthStore();

  const handleLogin = async () => {
    try {
      const res = await signin({ loginId, password });
      const userId = res?.data?.data?.userId;
      if (!userId) throw new Error("userId가 응답에 없습니다.");

      // userId 저장
      setUserId(userId.toString());

      // 닉네임 불러와서 저장
      const profile = await getMyInfo();
      setNickname(profile.data.data.nickname);

      // 이동
      navigate("/mypage");
    } catch (err) {
      setError(getErrorMessage(err, "로그인에 실패했습니다"));
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold mb-6">로그인</h1>
      <div className="flex flex-col gap-4">
        <Input
          label="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button onClick={handleLogin} disabled={!loginId || !password}>
          로그인
        </Button>
        <button
          onClick={() => navigate("/signup")}
          className="text-sm text-primary"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
