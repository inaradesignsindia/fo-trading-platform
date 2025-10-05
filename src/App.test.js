import { render, screen } from '@testing-library/react';
import App from './App';

test('renders F&O Trading Platform', () => {
  render(<App />);
  const linkElement = screen.getByText(/F&O Trading Platform/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders dashboard by default', () => {
  render(<App />);
  const dashboardElement = screen.getByText(/Welcome back, Trader!/i);
  expect(dashboardElement).toBeInTheDocument();
});