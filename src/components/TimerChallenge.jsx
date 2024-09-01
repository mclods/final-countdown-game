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
  position: relative;

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

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 6px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    display: ${({ $disabled }) => ($disabled ? 'block' : 'none')};
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
  ${({ $timerActive }) => ($timerActive ? flashAnimation : '')}
  font-weight: bold
`;

const INTERVAL_CHECK_TIME = 10;

function TimerChallenge({ title, targetTime, gameActive, setGameActive }) {
  const timerRef = useRef();
  const dialogRef = useRef();
  const targetTimeInMS = targetTime * 1000;
  const [timeRemainingInMS, setTimeRemainingInMS] = useState(targetTimeInMS);

  const timerActive =
    timeRemainingInMS > 0 && timeRemainingInMS < targetTimeInMS;

  if (timerActive) {
    setGameActive && setGameActive(true);
  }

  if (timeRemainingInMS <= 0) {
    handleStop();
  }

  function handleStart() {
    timerRef.current = setInterval(function () {
      setTimeRemainingInMS(
        (prevTimeRemaining) => prevTimeRemaining - INTERVAL_CHECK_TIME
      );
    }, INTERVAL_CHECK_TIME);
  }

  function handleStop() {
    clearInterval(timerRef.current);
    showResultModal();
  }

  function resetState() {
    setTimeRemainingInMS(targetTimeInMS);
    setGameActive && setGameActive(false);
  }

  function showResultModal() {
    dialogRef.current.open();
  }

  return (
    <>
      <ResultModal
        ref={dialogRef}
        targetTime={targetTime}
        timeRemainingInMS={timeRemainingInMS}
        onClose={resetState}
      />
      <Challenge $disabled={!timerActive && gameActive}>
        <h2>{title}</h2>
        <ChallengeTime>
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </ChallengeTime>
        <p>
          <button onClick={timerActive ? handleStop : handleStart}>
            {timerActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <TimerMessage $timerActive={timerActive}>
          {timerActive ? 'Time is running...' : 'Timer inactive'}
        </TimerMessage>
      </Challenge>
    </>
  );
}

export default TimerChallenge;
