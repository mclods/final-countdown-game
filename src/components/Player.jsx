import { useRef, useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  text-align: center;

  & h2 {
    color: #54a399;
  }

  & p {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & input {
    font: inherit;
    border: 1px solid #54a399;
    border-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right-style: none;
    padding: 0.27rem;
    color: #d1f0ec;
    ${({ $error }) =>
      $error
        ? `
      background-color: #2e1818;
      border-color: red;
    `
        : `
      background-color: #192f2b;
    `}
  }

  & input:focus {
    outline: none;
  }

  & button {
    font-weight: bold;
    cursor: pointer;
    background-color: #54a399;
    border: 1px solid #54a399;
    padding: 0.4rem 1rem;
    color: #061e1a;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left-style: none;
  }

  & button:focus {
    outline: none;
    background-color: #337168;
    border-color: #337168;
  }

  & button:hover {
    background-color: #3c8379;
    border-color: #3c8379;
  }

  & button:active {
    background-color: #337168;
    border-color: #337168;
  }
`;

function Player() {
  const playerRef = useRef();
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState(false);

  function handleClick() {
    if (playerRef.current.value) {
      if (validateName(playerRef.current.value)) {
        setPlayerName(playerRef.current.value);
        setError(false);
        playerRef.current.value = '';
      } else {
        setError(true);
      }
    }
  }

  function validateName(name) {
    const regex = /^[A-Za-z]( ?[A-Za-z])*$/g;
    return regex.test(name);
  }

  return (
    <Section $error={error} data-testid="player">
      <h2 data-testid="player-name">
        Welcome {playerName ? playerName : 'unknown entity'}
      </h2>
      <p>
        <input ref={playerRef} type="text" data-testid="player-name-input" />
        <button onClick={handleClick} data-testid="set-player-name-button">
          Set Name
        </button>
      </p>
    </Section>
  );
}

export default Player;
