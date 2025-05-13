import React from 'react';
import Button from './common/Button';

function Header({ activeTab, onTabChange }) {
  return (
    <header className="w-full bg-primary text-white py-4 px-6 mb-6">
      <h1 className="text-2xl font-bold text-center mb-4">
       😺 깃허브 검색 || 숫자야구 ⚾
      </h1>
      <div className="flex justify-center space-x-2">
        <Button isActive={activeTab === 'github'} onClick={() => onTabChange('github')} label="깃허브 검색" />
        <Button isActive={activeTab === 'baseball'} onClick={() => onTabChange('baseball')} label="숫자야구" />
      </div>
    </header>
  );
}

export default Header;
