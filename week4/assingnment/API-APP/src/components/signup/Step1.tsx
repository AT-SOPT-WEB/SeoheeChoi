import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

interface Props {
  loginId: string;
  setLoginId: (value: string) => void;
  onNext: () => void;
}

export default function Step1({ loginId, setLoginId, onNext }: Props) {
  const isTooLong = loginId.length > 20;
  const isTooShort = loginId.length > 0 && loginId.length < 4;
  const isInvalid = isTooShort || isTooLong;

  return (
    <>
      <Input
        label="아이디"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        error={
          isTooShort
            ? "아이디는 최소 4자 이상이어야 합니다."
            : isTooLong
            ? "아이디는 20자 이하로 입력해주세요."
            : undefined
        }
      />
      <Button onClick={onNext} disabled={loginId.length < 4 || isInvalid}>
        다음
      </Button>
    </>
  );
}
