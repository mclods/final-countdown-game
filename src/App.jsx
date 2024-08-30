import './App.css';
import Player from './components/Player';
import styled from 'styled-components';
import TimerChallenge from './components/TimerChallenge';

const Challenges = styled.div`
  max-width: 50rem;
  margin: 3rem auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

function App() {
  return (
    <>
      <Player />
      <Challenges>
        <TimerChallenge title="Easy" targetTime={1} />
        <TimerChallenge title="Not Easy" targetTime={5} />
        <TimerChallenge title="Getting Tough" targetTime={10} />
        <TimerChallenge title="Pros Only" targetTime={15} />
      </Challenges>
    </>
  );
}

export default App;
