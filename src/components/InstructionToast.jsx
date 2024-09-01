import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Aside = styled.aside`
  position: fixed;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  background: #073638;
  padding: 0 2rem;
  border-top: solid 6px #227c71;
  border-radius: 6px;
`;

function InstructionToast() {
  return createPortal(
    <Aside>
      <p>Select a level to start the Game</p>
    </Aside>,
    document.getElementById('toast')
  );
}

export default InstructionToast;
