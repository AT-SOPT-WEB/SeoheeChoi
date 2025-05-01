import React from 'react';

function Button({ isActive, onClick, label }) {
  const base = 'px-4 py-2 rounded font-semibold transition w-32 text-center';
  const active = isActive
    ? 'bg-white text-primary border border-primary'
    : 'bg-primaryDark text-white hover:bg-primary';

  return (
    <button className={`${base} ${active}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
