import { render, act } from '@testing-library/react';
import InstructionToast from './InstructionToast';

describe('Test InstructionToast Component', () => {
  beforeAll(() => {
    vi.useFakeTimers();

    const toastDiv = document.createElement('div');
    toastDiv.setAttribute('id', 'toast');
    document.body.appendChild(toastDiv);
  });

  afterAll(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();

    const toastDiv = document.getElementById('toast');
    toastDiv && document.body.removeChild(toastDiv);
  });

  it('Instruction text shows up after 5s', () => {
    const { queryByTestId } = render(<InstructionToast />);
    const instructionToast = queryByTestId('instruction-toast');

    expect(instructionToast).not.toBeVisible();

    // Toast pops up after 5s
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(instructionToast).toBeVisible();
    expect(instructionToast).toHaveTextContent(
      'Select a level to start the game'
    );

    // Toast goes away after 10s
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(instructionToast).not.toBeVisible();
  });
});
