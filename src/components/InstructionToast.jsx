import { createPortal } from 'react-dom';
import styled from 'styled-components';
import infoIcon from '../assets/info.svg';
import { useEffect, useState } from 'react';

const Aside = styled.aside`
  position: fixed;
  left: 50%;
  bottom: 1rem;
  color: #d35d6e;
  font-weight: bold;
  background: #fdf3e3;
  padding: 0 2rem;
  border-top: solid 6px #ffad60;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: all 300ms;
  ${({ $isVisible }) =>
    $isVisible
      ? `
    opacity: 1;
    transform: translate(-50%, 0);
  `
      : `
    opacity: 0;
    transform: translate(-50%, 100%);
  `}

  & img {
    width: 2rem;
    height: 2rem;
    padding-right: 0.4rem;
  }
`;

function InstructionToast({ gameActive }) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!gameActive) {
      const showToastTimer = setTimeout(() => {
        setShowToast(true);
      }, 5000);

      const hideToastTimer = setTimeout(() => {
        setShowToast(false);
      }, 10000);

      return () => {
        clearTimeout(showToastTimer);
        clearTimeout(hideToastTimer);
      };
    } else {
      setShowToast(false);
    }
  }, [gameActive]);

  return createPortal(
    <Aside $isVisible={showToast}>
      <img src={infoIcon} alt="info icon" />
      <p>Select a level to start the game</p>
    </Aside>,
    document.getElementById('toast')
  );
}

export default InstructionToast;
