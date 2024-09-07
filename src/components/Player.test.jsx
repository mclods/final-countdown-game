import { render, fireEvent, act } from '@testing-library/react';
import Player from './Player';

describe('Test Player Component', () => {
  it('Component renders successfully', () => {
    const { queryByTestId } = render(<Player />);

    expect(queryByTestId('player')).not.toBeNull();
    expect(queryByTestId('set-player-name-button')).toHaveTextContent(
      'Set Name'
    );
    expect(queryByTestId('player-name')).toHaveTextContent(
      'Welcome unknown entity'
    );
  });

  it('Sets player name', () => {
    const { queryByTestId } = render(<Player />);

    act(() => {
      fireEvent.change(queryByTestId('player-name-input'), {
        target: { value: 'abc' },
      });
      fireEvent.click(queryByTestId('set-player-name-button'));
    });

    expect(queryByTestId('player-name')).toHaveTextContent('Welcome abc');
  });
});
