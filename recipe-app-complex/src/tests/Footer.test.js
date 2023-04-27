import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Footer from '../components/Footer';
import renderWithRouterAndRedux from './Helpers/renderWithRouterAndRedux';

describe('Testes da tela de Footer', () => {
  test('Testa se os inputs são renderizados corretamente', () => {
    renderWithRouterAndRedux(<App />);
  });

  test('Testa se os campos são validados corretamente', () => {
    const { history } = renderWithRouterAndRedux(<Footer />);

    const imgFooter1 = screen.getByTestId('drinks-bottom-btn');
    expect(imgFooter1).toBeVisible();

    const imgFooter2 = screen.getByTestId('meals-bottom-btn');
    expect(imgFooter2).toBeVisible();

    userEvent.click(imgFooter1);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    userEvent.click(imgFooter2);
    expect(history.location.pathname).toBe('/meals');
  });
});
