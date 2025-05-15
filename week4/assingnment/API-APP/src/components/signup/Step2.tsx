import { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Props {
  password: string;
  confirmPassword: string;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  onNext: () => void;
}

export default function Step2({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  onNext,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const isTooShort = password.length > 0 && password.length < 6;
  const isTooLong = password.length > 20;
  const isMismatch = password !== confirmPassword;
  const isInvalid = isTooShort || isTooLong || isMismatch;

  return (
    <>
      <div className="relative">
        <Input
          label="비밀번호"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={
            isTooShort
              ? "비밀번호는 최소 6자 이상이어야 합니다."
              : isTooLong
              ? "비밀번호는 20자 이하로 입력해주세요."
              : undefined
          }
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[32px] text-xl text-gray-500"
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>

      <Input
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={isMismatch && confirmPassword ? "비밀번호가 일치하지 않습니다." : undefined}
      />

      <Button
        onClick={onNext}
        disabled={!password || !confirmPassword || isInvalid}
      >
        다음
      </Button>
    </>
  );
}
