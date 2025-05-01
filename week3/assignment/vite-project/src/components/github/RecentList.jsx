import React from 'react';

function RecentList({ recent, onRemove, onClick }) {
  return (
    <div className="flex flex-wrap gap-2">
      {recent.map((user) => (
        <div key={user} className="bg-gray-100 px-2 py-1 rounded flex items-center space-x-1">
          <span className="cursor-pointer text-primary" onClick={() => onClick(user)}>
            {user}
          </span>
          <button onClick={() => onRemove(user)} className="text-red-500">x</button>
        </div>
      ))}
    </div>
  );
}

export default RecentList;
