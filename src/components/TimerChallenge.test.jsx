import { render, act, fireEvent } from '@testing-library/react';
import TimerChallenge from './TimerChallenge';
import { expect } from 'vitest';

vi.mock('./ResultModal');

describe('Test TimerChallenge Component', () => {
  const mockProps = {
    title: 'some title',
    targetTime: 10,
    gameActive: false,
    setGameActive: vi.fn(),
  };

  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('Component renders successfully', () => {
    const { queryByTestId } = render(<TimerChallenge {...mockProps} />);

    expect(queryByTestId('challenge')).not.toBeNull();
    expect(queryByTestId('challenge-title')).toHaveTextContent('some title');
    expect(queryByTestId('challenge-time')).toHaveTextContent('10 seconds');
    expect(queryByTestId('challenge-button')).toHaveTextContent(
      'Start Challenge'
    );
    expect(queryByTestId('challenge-status')).toHaveTextContent(
      'Timer inactive'
    );
  });

  it('On starting the game', () => {
    const { queryByTestId } = render(<TimerChallenge {...mockProps} />);

    expect(queryByTestId('challenge-button')).toHaveTextContent(
      'Start Challenge'
    );
    expect(queryByTestId('challenge-status')).toHaveTextContent(
      'Timer inactive'
    );

    act(() => {
      fireEvent.click(queryByTestId('challenge-button'));

      // Interval check time of 100ms passes
      vi.advanceTimersByTime(100);
    });
    expect(queryByTestId('challenge-button')).toHaveTextContent(
      'Stop Challenge'
    );
    expect(queryByTestId('challenge-status')).toHaveTextContent(
      'Time is running...'
    );

    // After timer of 10s expires
    act(() => {
      vi.advanceTimersByTime(9900);
    });
    expect(queryByTestId('challenge-button')).toHaveTextContent(
      'Start Challenge'
    );
    expect(queryByTestId('challenge-status')).toHaveTextContent(
      'Timer inactive'
    );
  });
});
