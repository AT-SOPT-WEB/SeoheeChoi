import React from 'react';

function HistoryList({ history }) {
  return (
    <div className="space-y-1">
      {history.map((item, idx) => (
        <p key={idx} className="border p-2 rounded bg-white shadow-card w-full">
          {item.guess} - {item.result}
        </p>
      ))}
    </div>
  );
}

export default HistoryList;
