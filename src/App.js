import React, { useState } from 'react';
import './App.css';
import ChatGPTComponent from './ChatGPTComponent';
import Home from './pages/home'
import Convo from './pages/convo';


function App() {
  const [isSessionStarted, setSessionStarted] = useState(false)

  return (
    <div >
      <link href='https://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'></link>
      <link href='https://fonts.googleapis.com/css?family=Montagu+Slab:300,400,700' rel='stylesheet' type='text/css'></link>
      <script src="https://cdn.tailwindcss.com"></script>
      {/* <header className="App-header">
      </header> */}
      {/* <ChatGPTComponent /> */}
      {!isSessionStarted &&
        <Home onStartSession={() => { setSessionStarted(true) }} />
      }
      {isSessionStarted &&
        <Convo />
      }
    </div>
  );
}

export default App;
