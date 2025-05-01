import React from 'react';

function UserCard({ user, onClose }) {
  return (
    <div className="bg-white shadow-card rounded p-4 w-full">
      <button onClick={onClose} className="float-right text-red-500">X</button>
      <div className="flex flex-col items-center">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-24 h-24 rounded-full cursor-pointer"
          onClick={() => window.open(user.html_url, '_blank')}
        />
        <h2 className="text-xl font-bold text-primary mt-2">{user.name}</h2>
        <p className="text-gray-600">{user.login}</p>
        <p className="text-gray-700">{user.bio}</p>
        <p>Followers: {user.followers} | Following: {user.following}</p>
      </div>
    </div>
  );
}

export default UserCard;
