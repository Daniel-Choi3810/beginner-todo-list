import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todo app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Todo App/i);
  expect(headerElement).toBeInTheDocument();
});
