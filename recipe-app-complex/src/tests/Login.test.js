import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './Helpers/renderWithRouterAndRedux';

describe('Testes da tela de Login', () => {
  test('Testa se os inputs são renderizados corretamente', () => {
    renderWithRouterAndRedux(<App />, {}, '/');

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeVisible();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeVisible();

    const sendButton = screen.getByTestId('login-submit-btn');
    expect(sendButton).toBeVisible();
    expect(sendButton).toBeDisabled();
  });

  test('Testa se os campos são validados corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/');

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'trybe@teste.com');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1597535');

    const sendButton = screen.getByTestId('login-submit-btn');
    expect(sendButton).toBeEnabled();

    userEvent.click(sendButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
