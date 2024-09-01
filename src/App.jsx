import './App.css';
import Player from './components/Player';
import styled from 'styled-components';
import TimerChallenge from './components/TimerChallenge';
import { useState } from 'react';

const Challenges = styled.div`
  max-width: 50rem;
  margin: 3rem auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

function App() {
  const [gameActive, setGameActive] = useState(false);

  return (
    <>
      <Player />
      <Challenges>
        <TimerChallenge
          title="Easy"
          targetTime={1}
          gameActive={gameActive}
          setGameActive={setGameActive}
        />
        <TimerChallenge
          title="Not Easy"
          targetTime={5}
          gameActive={gameActive}
          setGameActive={setGameActive}
        />
        <TimerChallenge
          title="Getting Tough"
          targetTime={10}
          gameActive={gameActive}
          setGameActive={setGameActive}
        />
        <TimerChallenge
          title="Pros Only"
          targetTime={15}
          gameActive={gameActive}
          setGameActive={setGameActive}
        />
      </Challenges>
    </>
  );
}

export default App;
