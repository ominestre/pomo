import React from 'react';
import Timer from './features/timer/Timer';
import Pager from './features/pager/Pager';

function App() {
  return (
    <div className="wrapper">
      <header>
        <Timer />
      </header>
      <main>
        <Pager />
      </main>
    </div>
  );
}

export default App;
