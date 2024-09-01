import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';

const slideIn = keyframes`
  0% {
    transform: translateY(-15%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInAnimation = css`
  ${slideIn} 0.35s ease-out
`;

const Dialog = styled.dialog`
  border: none;
  border-radius: 8px;
  padding: 2rem;
  background-color: #d7fcf8;

  &[open] {
    animation: ${slideInAnimation};
  }

  &::backdrop {
    background: rgba(0, 0, 0, 0.9);
  }

  & h2 {
    font-family: 'Handjet', monospace;
    margin: 0 0 0.25rem 0;
    font-size: 3rem;
    text-transform: uppercase;
  }

  & p {
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }

  & p strong {
    color: #10655b;
  }

  & form {
    text-align: right;
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
`;

const ResultModal = forwardRef(function ResultModal(
  { targetTime, timeRemainingInMS, onClose },
  ref
) {
  const dialogRef = useRef();
  const targetTimeInMS = targetTime * 1000;
  const userLost = timeRemainingInMS <= 0;
  const formattedTimeRemainingInS = (timeRemainingInMS / 1000).toFixed(2);
  const score = userLost
    ? 0
    : Math.round((1 - timeRemainingInMS / targetTimeInMS) * 100);

  useImperativeHandle(ref, function () {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <Dialog ref={dialogRef} onClose={onClose}>
      <h2>{userLost ? 'You Lost' : `Your Score ${score}`}</h2>
      <p>
        The target time was <strong>{targetTime}</strong> second
        {targetTime > 1 ? 's' : ''}.
      </p>
      <p>
        You stopped the timer with{' '}
        <strong>{formattedTimeRemainingInS} seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </Dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
