import { render } from '@testing-library/react';
import App from './App';

vi.mock('./components/InstructionToast');
vi.mock('./components/ResultModal');

describe('Test App Component', () => {
  it('App component renders successfully', () => {
    const appComponent = render(<App />);
    expect(appComponent).toBeDefined();
  });
});
