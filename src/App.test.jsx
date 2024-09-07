import { render } from '@testing-library/react';
import App from './App';

vi.mock('./components/InstructionToast');
vi.mock('./components/ResultModal');

describe('Test App Component', () => {
  it('Component renders successfully', () => {
    const appComponent = render(<App />);
    expect(appComponent).toBeDefined();
  });

  it('Renders four challenges', () => {
    const { queryAllByTestId } = render(<App />);

    const challengeTitle = queryAllByTestId('challenge-title');
    expect(challengeTitle).toHaveLength(4);
    expect(challengeTitle[0]).toHaveTextContent('Easy');
    expect(challengeTitle[1]).toHaveTextContent('Not Easy');
    expect(challengeTitle[2]).toHaveTextContent('Getting Tough');
    expect(challengeTitle[3]).toHaveTextContent('Pros Only');
  });
});
