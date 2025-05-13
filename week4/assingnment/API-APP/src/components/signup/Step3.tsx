import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

interface Props {
  nickname: string;
  setNickname: (value: string) => void;
  onSubmit: () => void;
}

export default function Step3({ nickname, setNickname, onSubmit }: Props) {
  const isTooShort = nickname.length > 0 && nickname.length < 2;
  const isTooLong = nickname.length > 20;

  return (
    <>
      <Input
        label="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        error={
          isTooShort
            ? "닉네임은 최소 2자 이상이어야 합니다."
            : isTooLong
            ? "닉네임은 20자 이하로 입력해주세요."
            : undefined
        }
      />
      <Button onClick={onSubmit} disabled={nickname.length < 2 || isTooLong}>
        회원가입
      </Button>
    </>
  );
}
