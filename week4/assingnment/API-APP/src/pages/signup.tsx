import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "@/api/user";
import Step1 from "@/components/signup/Step1";
import Step2 from "@/components/signup/Step2";
import Step3 from "@/components/signup/Step3";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signup({ loginId, password, nickname });
      alert(`${nickname}님, 회원가입이 완료되었습니다.`);
      navigate("/login");
    } catch (err) {
      alert(getErrorMessage(err, "회원가입 실패! 아이디 중복일 수 있습니다."));
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold mb-6">회원가입</h1>
      <div className="flex flex-col gap-4">
        {step === 1 && (
          <Step1 loginId={loginId} setLoginId={setLoginId} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <Step2
            password={password}
            confirmPassword={confirmPassword}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <Step3 nickname={nickname} setNickname={setNickname} onSubmit={handleSignup} />
        )}
        <button onClick={() => navigate("/login")} className="text-sm text-primary">
          로그인으로 돌아가기
        </button>
      </div>
    </div>
  );
}
