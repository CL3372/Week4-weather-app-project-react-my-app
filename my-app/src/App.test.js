import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather app heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /weather app/i });
  expect(heading).toBeInTheDocument();
});
