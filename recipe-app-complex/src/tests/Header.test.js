import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './Helpers/renderWithRouterAndRedux';

describe('Testes do componente Header', () => {
  const PAGE_TITLE = 'page-title';
  const PROFILE_TOP_BUTTON = 'profile-top-btn';
  const SEARCH_TOP_BTN = 'search-top-btn';

  test('Verifica se tudo é renderizado corretamente na página Meals', () => {
    renderWithRouterAndRedux(<App />, {}, '/meals');

    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toBeVisible();
    expect(pageTitle).toHaveTextContent('Meals');

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeVisible();

    const profileButton = screen.getByTestId(PROFILE_TOP_BUTTON);
    expect(profileButton).toBeVisible();
  });

  test('Verifica se tudo é renderizado corretamente na página Drinks', () => {
    renderWithRouterAndRedux(<App />, {}, '/drinks');

    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toBeVisible();
    expect(pageTitle).toHaveTextContent('Drinks');

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeVisible();

    const profileButton = screen.getByTestId(PROFILE_TOP_BUTTON);
    expect(profileButton).toBeVisible();
  });

  test('Verifica se tudo é renderizado corretamente na página Profile', () => {
    renderWithRouterAndRedux(<App />, {}, '/profile');

    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toBeVisible();
    expect(pageTitle).toHaveTextContent('Profile');

    const profileButton = screen.getByTestId(PROFILE_TOP_BUTTON);
    expect(profileButton).toBeVisible();
  });

  test('Verifica se tudo é renderizado corretamente na página Done Recipes', () => {
    renderWithRouterAndRedux(<App />, {}, '/done-recipes');

    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toBeVisible();
    expect(pageTitle).toHaveTextContent('Done Recipes');

    const profileButton = screen.getByTestId(PROFILE_TOP_BUTTON);
    expect(profileButton).toBeVisible();
  });

  test('Verifica se tudo é renderizado corretamente na página Favorite Recipes', () => {
    renderWithRouterAndRedux(<App />, {}, '/favorite-recipes');

    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(pageTitle).toBeVisible();
    expect(pageTitle).toHaveTextContent('Favorite Recipes');

    const profileButton = screen.getByTestId(PROFILE_TOP_BUTTON);
    expect(profileButton).toBeVisible();
  });

  test('Verifica se o botão de perfil redireciona para a pagina de perfil', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/meals');

    const profileButton = screen.getByTestId(PROFILE_TOP_BUTTON);
    userEvent.click(profileButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  test('Verifica se ao clicar no botão de search o input é renderizado', () => {
    renderWithRouterAndRedux(<App />, {}, '/meals');

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeVisible();
  });

  test('Verifica se ao clicar no botão de search o input é renderizado', () => {
    renderWithRouterAndRedux(<App />, {}, '/meals');

    const toogleSearchButton = screen.getByTestId('search-top-btn');
    expect(toogleSearchButton).toBeInTheDocument();

    userEvent.click(toogleSearchButton);

    const textInput = screen.getByRole('textbox');
    expect(textInput).toBeInTheDocument();

    userEvent.type(textInput, 'Chicken');
    expect(textInput).toHaveValue('Chicken');
  });
});
