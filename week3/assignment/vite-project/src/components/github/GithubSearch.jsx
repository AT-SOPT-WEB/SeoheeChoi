import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import UserCard from './UserCard';
import RecentList from './RecentList';

function GithubSearch() {
  const [input, setInput] = useState('');
  const [userInfo, setUserInfo] = useState({ status: 'idle', data: null });
  const [recent, setRecent] = useLocalStorage('recentUsers', []);

  const fetchUser = async (username) => {
    setUserInfo({ status: 'pending', data: null });
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUserInfo({ status: 'resolved', data });

      if (!recent.includes(username)) {
        const updated = [...recent.slice(-2), username];
        setRecent(updated);
      }
    } catch {
      setUserInfo({ status: 'rejected', data: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) fetchUser(input.trim());
  };

  return (
    <div className="space-y-4 w-full">
      <form onSubmit={handleSubmit} className="flex space-x-2 w-full">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="GitHub 아이디 입력"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-primary text-white px-4 rounded hover:bg-primaryDark transition" type="submit">
          검색
        </button>
      </form>

      <RecentList recent={recent} onRemove={(u) => setRecent(recent.filter((r) => r !== u))} onClick={fetchUser} />

      {userInfo.status === 'pending' && <p>로딩 중...</p>}
      {userInfo.status === 'rejected' && <p>결과를 찾을 수 없습니다.</p>}
      {userInfo.status === 'resolved' && (
        <UserCard user={userInfo.data} onClose={() => setUserInfo({ status: 'idle', data: null })} />
      )}
    </div>
  );
}

export default GithubSearch;
