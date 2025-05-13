import { useEffect, useState } from "react";
import { getMyInfo, updateNickname } from "@/api/user";
import { useAuthStore } from "@/store/auth";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Header from "@/components/layout/Header";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function MyPage() {
  const { nickname, setNickname } = useAuthStore();
  const [newNickname, setNewNickname] = useState(nickname ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    getMyInfo()
      .then((res) => {
        const nickname = res.data?.nickname;
        if (nickname) {
          setNickname(nickname);
          setNewNickname(nickname); 
        }
      })
      .catch(() => setError("유저 정보를 불러오지 못했습니다."));
  }, [setNickname]);

  const handleSave = async () => {
    if (!newNickname) return;

    try {
      await updateNickname(newNickname);
      setNickname(newNickname);
      alert("닉네임이 변경되었습니다");
      setError("");
    } catch (err) {
      const message = getErrorMessage(err, "닉네임 변경에 실패했습니다");
      setError(message);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto py-10 px-4">
        <h2 className="text-xl font-semibold mb-6">내 정보</h2>
        <div className="flex flex-col gap-4">
          <Input
            label="새 닉네임"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            error={error || undefined}
          />
          <Button onClick={handleSave} disabled={!newNickname}>
            저장
          </Button>
        </div>
      </div>
    </>
  );
}
