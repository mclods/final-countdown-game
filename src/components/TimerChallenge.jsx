import { useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import ResultModal from './ResultModal';

const Challenge = styled.section`
  width: 22rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin: 2rem auto;
  background: linear-gradient(#4df8df, #4df0f8);
  color: #221c18;
  box-shadow: 0 2px 8px rgba(35, 34, 34, 0.6);
  border-radius: 6px;

  & h2 {
    font-size: 1.5rem;
    letter-spacing: 0.1em;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
    color: #221c18;
  }

  & button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: #12352f;
    color: #edfcfa;
    font-size: 1.2rem;
    cursor: pointer;
  }

  & button:hover {
    background: #051715;
  }
}
`;

const ChallengeTime = styled.p`
  border: 1px solid #46cebe;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  margin: 0.5rem;
`;

const flash = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const flashAnimation = css`
  animation: ${flash} 1s infinite;
`;

const TimerMessage = styled.p`
  ${({ $timerStarted }) => ($timerStarted ? flashAnimation : '')}
  font-weight: bold
`;

function TimerChallenge({ title, targetTime }) {
  const timerRef = useRef();
  const dialogRef = useRef();
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);

  function handleStart() {
    timerRef.current = setTimeout(() => {
      setTimerEnded(true);
      dialogRef.current.open();
    }, targetTime * 1000);
    setTimerStarted(true);
  }

  function handleStop() {
    clearTimeout(timerRef.current);
    resetState();
  }

  function resetState() {
    setTimerStarted(false);
    setTimerEnded(false);
  }

  return (
    <>
      <ResultModal ref={dialogRef} result="lost" targetTime={targetTime} />
      <Challenge>
        <h2>{title}</h2>
        <p>{timerEnded ? 'You Lost' : ''}</p>
        <ChallengeTime>
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </ChallengeTime>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <TimerMessage $timerStarted={timerStarted}>
          {timerStarted ? 'Time is running...' : 'Timer inactive'}
        </TimerMessage>
      </Challenge>
    </>
  );
}

export default TimerChallenge;
