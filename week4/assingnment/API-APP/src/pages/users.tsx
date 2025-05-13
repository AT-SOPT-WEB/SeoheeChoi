import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import { getUsers } from "@/api/user";
import Header from "@/components/layout/Header";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [error, setError] = useState("");

  const searchUsers = async (keyword?: string) => {
    try {
      const response = await getUsers(keyword || undefined);
      const nicknameList = response.data.data.nicknameList ?? [];
      setUsers(nicknameList);
      setError("");
    } catch (e) {
      setError("유저 조회에 실패했습니다.");
      setUsers([]);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      searchUsers(value);
    }, 300),
    []
  );

  useEffect(() => {
    if (query.trim() !== "") {
      debouncedSearch(query);
    } else {
      setUsers([]);
    }
  }, [query, debouncedSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchUsers(query);
  };

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto py-10 px-4">
        <h2 className="text-xl font-semibold mb-4">회원 조회</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
          <Input
            label="회원 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="닉네임 입력"
          />
          <Button type="submit">확인</Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        <ul className="space-y-2">
          {users.length > 0 ? (
            users.map((nickname, index) => (
              <li
                key={`${nickname}-${index}`}
                className="p-2 border rounded text-gray-800 bg-white"
              >
                {nickname}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">표시할 회원이 없습니다.</li>
          )}
        </ul>
      </main>
    </>
  );
}
