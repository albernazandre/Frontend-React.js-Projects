import { screen } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouterAndRedux from './Helpers/renderWithRouterAndRedux';

describe('Test', () => {
  it('Test2', () => {
    renderWithRouterAndRedux(<DoneRecipes />);
    screen.logTestingPlaygroundURL();
  });
});
