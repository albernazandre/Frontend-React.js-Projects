import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouterAndRedux from './Helpers/renderWithRouterAndRedux';

describe('Verifica a pagina Profiles', () => {
  it('Verifica se os botoes estao presentes na pagina', () => {
    renderWithRouterAndRedux(<Profile />, {}, '/profile');
    const doneRecipes = screen.getByRole('button', {
      name: /done recipes/i,
    });

    const favoriteRecipes = screen.getByRole('button', {
      name: /favorite recipes/i,
    });

    const logoutButton = screen.getByRole('button', {
      name: /logout/i,
    });

    expect(doneRecipes).toBeInTheDocument();
    expect(favoriteRecipes).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it('Verifica se ao clicar em "Done Recipes", o usuario é redirecionado', () => {
    const { history } = renderWithRouterAndRedux(<Profile />, {}, '/profile');
    const doneRecipes = screen.getByRole('button', {
      name: /done recipes/i,
    });

    userEvent.click(doneRecipes);
    const route = history.location.pathname;
    expect(route).toBe('/done-recipes');
  });

  it('Verifica se ao clicar em "Favorite Recipes", o usuario é redirecionado', () => {
    const { history } = renderWithRouterAndRedux(<Profile />, {}, '/profile');
    const favoriteRecipes = screen.getByRole('button', {
      name: /favorite recipes/i,
    });

    userEvent.click(favoriteRecipes);
    const route = history.location.pathname;
    expect(route).toBe('/favorite-recipes');
  });

  it('Verifica se ao clicar em "Logout", o usuario é redirecionado para a pagina Home e o LocalStorage é limpo', () => {
    const { history } = renderWithRouterAndRedux(<Profile />, {}, '/profile');

    const logoutButton = screen.getByRole('button', {
      name: /logout/i,
    });

    userEvent.click(logoutButton);
    const route = history.location.pathname;
    expect(route).toBe('/');
  });
});
