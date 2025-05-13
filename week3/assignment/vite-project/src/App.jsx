import React, { useState } from 'react';
import Header from './components/Header';
import GithubSearch from './components/github/GithubSearch';
import NumberBaseball from './components/baseball/NumberBaseball';

function App() {
  const [activeTab, setActiveTab] = useState('github');

  return (
    <div className="min-h-screen bg-lightGray font-sans flex flex-col items-center">
      <main className="w-full p-6">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="w-full">
          {activeTab === 'github' ? <GithubSearch /> : <NumberBaseball />}
        </div>
      </main>
    </div>
  );
}

export default App;
