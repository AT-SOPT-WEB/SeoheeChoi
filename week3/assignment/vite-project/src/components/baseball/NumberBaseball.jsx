import React, { useState, useEffect } from 'react';
import generateAnswer from '../../utils/generateAnswer';
import HistoryList from './HistoryList';

function NumberBaseball() {
  const [answer, setAnswer] = useState(generateAnswer());
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    console.log('🎯 정답 숫자:', answer.join(''));
  }, [answer]);

  useEffect(() => {
    if (attempts >= 10) {
      setMessage('10회 초과했습니다. 게임 패배! 5초 후 초기화됩니다.');
      setTimeout(resetGame, 5000);
    }
  }, [attempts]);  

  const resetGame = () => {
    setAnswer(generateAnswer());
    setInput('');
    setMessage('');
    setHistory([]);
    setAttempts(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[0-9]{3}$/.test(input) || new Set(input).size !== 3) {
      setMessage('3자리 중복 없는 숫자를 입력하세요.');
      return;
    }

    const inputArr = input.split('').map(Number);
    let strike = 0, ball = 0;
    inputArr.forEach((num, idx) => {
      if (num === answer[idx]) strike++;
      else if (answer.includes(num)) ball++;
    });

    setHistory([...history, { guess: input, result: `${strike}S ${ball}B` }]);
    setAttempts(attempts + 1);

    if (strike === 3) {
      setMessage('정답! 3초 후 게임이 초기화됩니다.');
      setTimeout(resetGame, 3000);
    } else {
      setMessage(`${strike} 스트라이크 ${ball} 볼`);
    }
    setInput('');
  };

  return (
    <div className="space-y-4 w-full">
      <form onSubmit={handleSubmit} className="flex space-x-2 w-full">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="3자리 숫자 입력"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-primary text-white px-4 rounded hover:bg-primaryDark transition" type="submit">
          제출
        </button>
      </form>
      <p>{message}</p>
      <HistoryList history={history} />
    </div>
  );
}

export default NumberBaseball;
