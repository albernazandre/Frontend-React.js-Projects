import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './Helpers/renderWithRouterAndRedux';
import App from '../App';

import SearchBar from '../components/SearchBar';
import fetch from '../../cypress/mocks/fetch';
import { meals } from '../../cypress/mocks/meals';
import { drinks } from '../../cypress/mocks/drinks';
import oneMeal from '../../cypress/mocks/oneMeal';
import aDrinks from './mocks/aDrinks';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import firstLetterMeal from './mocks/firstLetterMeal';
import soupMeals from '../../cypress/mocks/soupMeals';
import chickenMeals from '../../cypress/mocks/chickenMeals';

const toogleSearchButtonID = 'search-top-btn';

describe('Verifica o componente "SearchBar"', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
  });
  afterEach(() => jest.clearAllMocks());
  it('Verifica se ao ser clicado no botao de busca, o Searchbar é exibido', async () => {
    await act(async () => { renderWithRouterAndRedux(<App />, { search: { data: meals } }, '/meals'); });
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const toogleSearchButton = await screen.findByTestId(toogleSearchButtonID);

    act(() => { fireEvent.click(toogleSearchButton); });
    expect(toogleSearchButton).toBeInTheDocument();

    const searchBar = await screen.findByRole('textbox');
    const ingredientRadio = await screen.findByRole('radio', {
      name: /ingredient/i,
    });
    const nameRadio = await screen.findByRole('radio', {
      name: /name/i,
    });
    const firstLetterRadio = await screen.findByRole('radio', {
      name: /first letter/i,
    });

    expect(searchBar).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });

  it('Verifica se é possivel fazer uma busca', async () => {
    act(() => { renderWithRouterAndRedux(<SearchBar />, { search: { search: 'Chicken', data: chickenMeals } }, '/meals'); });

    const ingredientRadio = await screen.findByRole('radio', {
      name: /ingredient/i,
    });
    const nameRadio = await screen.findByRole('radio', {
      name: /name/i,
    });
    const firstLetterRadio = await screen.findByRole('radio', {
      name: /first letter/i,
    });
    const searchButton = await screen.findByRole('button', {
      name: /search/i,
    });
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    act(() => { userEvent.click(ingredientRadio); });
    await act(async () => { userEvent.click(searchButton); });
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });

  it('Verifica se é possivel fazer uma busca com o filtro por nome', async () => {
    act(() => { renderWithRouterAndRedux(<SearchBar />, { search: { search: 'soup', data: soupMeals } }, '/meals'); });

    const nameRadio = await screen.findByRole('radio', {
      name: /name/i,
    });
    const searchButton = await screen.findByRole('button', {
      name: /search/i,
    });

    act(() => { fireEvent.click(nameRadio); });
    await act(async () => { userEvent.click(searchButton); });
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
  });

  it('Verifica se é possivel fazer uma busca com o filtro pela primeira letra', async () => {
    act(() => { renderWithRouterAndRedux(<SearchBar />, { search: { search: 'a', data: firstLetterMeal } }, '/meals'); });

    const firstLetterRadio = await screen.findByRole('radio', {
      name: /first letter/i,
    });
    const searchButton = await screen.findByRole('button', {
      name: /search/i,
    });

    act(() => { fireEvent.click(firstLetterRadio); });
    await act(async () => { userEvent.click(searchButton); });
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });

  it('Verifica se ao digitar mais de uma letra com o filtro de Primeira letra, é emitido um alerta', async () => {
    global.alert = jest.fn();
    act(() => { renderWithRouterAndRedux(<SearchBar />, { search: { search: 'ad' } }, '/meals'); });

    const firstLetterRadio = await screen.findByRole('radio', {
      name: /first letter/i,
    });
    const searchButton = await screen.findByRole('button', {
      name: /search/i,
    });

    act(() => { fireEvent.click(firstLetterRadio); });
    await act(async () => { userEvent.click(searchButton); });
    expect(global.alert).toBeCalled();
  });
});

describe('Verifica se no caminho "/drinks" é possivel fazer buscas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
  });
  afterEach(() => jest.clearAllMocks());
  it('Verifica se ao ser clicado no botao de busca, o Searchbar é exibido', async () => {
    await act(async () => { renderWithRouterAndRedux(<App />, { search: { data: drinks } }, '/drinks'); });
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const toogleSearchButton = await screen.findByTestId(toogleSearchButtonID);

    expect(toogleSearchButton).toBeInTheDocument();

    act(() => { fireEvent.click(toogleSearchButton); });

    const searchBar = await screen.findByRole('textbox');
    const ingredientRadio = await screen.findByRole('radio', {
      name: /ingredient/i,
    });
    const nameRadio = await screen.findByRole('radio', {
      name: /name/i,
    });
    const firstLetterRadio = await screen.findByRole('radio', {
      name: /first letter/i,
    });

    expect(searchBar).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });
  it('Verifica se é possivel fazer uma busca', async () => {
    act(() => { renderWithRouterAndRedux(<SearchBar />, { search: { search: 'Light rum', data: drinksByIngredient } }, '/drinks'); });

    const ingredientRadio = await screen.findByRole('radio', {
      name: /ingredient/i,
    });
    const nameRadio = await screen.findByRole('radio', {
      name: /name/i,
    });
    const firstLetterRadio = await screen.findByRole('radio', {
      name: /first letter/i,
    });
    const searchButton = await screen.findByRole('button', {
      name: /search/i,
    });

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    act(() => { fireEvent.click(ingredientRadio); });
    await act(async () => { userEvent.click(searchButton); });
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
  });

  it('Verifica se é possivel fazer uma busca com o filtro por nome', async () => {
    act(() => { renderWithRouterAndRedux(<SearchBar />, { search: { search: 'gin', data: ginDrinks } }, '/drinks'); });

    const nameRadio = await screen.findByRole('radio', {
      name: /name/i,
    });
    const searchButton = await screen.findByRole('button', {
      name: /search/i,
    });

    act(() => { fireEvent.click(nameRadio); });
    await act(async () => { userEvent.click(searchButton); });
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');
  });

  it('Verifica se é possivel fazer uma busca com o filtro pela primeira letra', async () => {
    act(() => { renderWithRouterAndRedux(<SearchBar />, { search: { search: 'a', data: aDrinks } }, '/drinks'); });

    const firstLetterRadio = await screen.findByRole('radio', {
      name: /first letter/i,
    });
    const searchButton = await screen.findByRole('button', {
      name: /search/i,
    });

    act(() => { fireEvent.click(firstLetterRadio); });
    await act(async () => { userEvent.click(searchButton); });
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  });

  it('Verifica se ao digitar mais de uma letra com o filtro de Primeira letra, é emitido um alerta', async () => {
    global.alert = jest.fn();

    act(() => { renderWithRouterAndRedux(<SearchBar />, { search: { search: 'ad' } }, '/drinks'); });

    const firstLetterRadio = await screen.findByRole('radio', {
      name: /first letter/i,
    });
    const searchButton = await screen.findByRole('button', {
      name: /search/i,
    });

    act(() => { fireEvent.click(firstLetterRadio); });
    await act(async () => { userEvent.click(searchButton); });
    expect(global.alert).toBeCalled();
  });
});

describe('Verifica se ao fazer a busca e retornar apenas um resultado, o usuario é redirecionado para a paginade detalhes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
  });
  afterEach(() => jest.clearAllMocks());
  it('Verifica o redirecionamento', async () => {
    renderWithRouterAndRedux(<SearchBar />, { search: { search: 'Arrabiata', data: oneMeal } }, '/meals');

    const nameRadio = await screen.findByRole('radio', {
      name: /name/i,
    });
    const searchButton = await screen.findByRole('button', {
      name: /search/i,
    });

    act(() => { fireEvent.click(nameRadio); });
    await act(async () => { userEvent.click(searchButton); });
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
  });
});
