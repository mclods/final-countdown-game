import { fireEvent, render, act } from '@testing-library/react';
import ResultModal from './ResultModal';

describe('Test ResultModal Component', () => {
  const mockProps = {
    targetTime: 10,
    timeRemainingInMS: 0,
    onClose: vi.fn(),
  };

  beforeAll(() => {
    const modalDiv = document.createElement('div');
    modalDiv.setAttribute('id', 'modal');
    document.body.appendChild(modalDiv);
  });

  afterAll(() => {
    const modalDiv = document.getElementById('modal');
    modalDiv && document.body.removeChild(modalDiv);
  });

  it('Component renders successfully on losing', () => {
    const { queryByTestId } = render(<ResultModal {...mockProps} />);

    expect(queryByTestId('result-modal')).not.toBeNull();
    expect(queryByTestId('result')).toHaveTextContent('You Lost');
    expect(queryByTestId('result-time')).toHaveTextContent(
      'The target time was 10 seconds.'
    );
    expect(queryByTestId('result-time-left')).toHaveTextContent(
      'You stopped the timer with 0.00 seconds left.'
    );
    expect(queryByTestId('result-modal-close-button')).toHaveTextContent(
      'Close'
    );
  });

  it('Component renders successfully on winning', () => {
    const { queryByTestId } = render(
      <ResultModal {...{ ...mockProps, timeRemainingInMS: 9000 }} />
    );

    expect(queryByTestId('result-modal')).not.toBeNull();
    expect(queryByTestId('result')).toHaveTextContent('Your Score 10');
    expect(queryByTestId('result-time')).toHaveTextContent(
      'The target time was 10 seconds.'
    );
    expect(queryByTestId('result-time-left')).toHaveTextContent(
      'You stopped the timer with 9.00 seconds left.'
    );
    expect(queryByTestId('result-modal-close-button')).toHaveTextContent(
      'Close'
    );
  });

  it('Modal is not visible after closing', () => {
    const { queryByTestId } = render(<ResultModal {...mockProps} />);

    act(() => {
      fireEvent.click(queryByTestId('result-modal-close-button'));
    });

    expect(queryByTestId('result-modal')).not.toBeVisible();
  });
});
