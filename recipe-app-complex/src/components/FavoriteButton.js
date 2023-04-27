import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import blackHearticon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

// const base = [{
//   id: id - da - receita,
//   type: meal - ou - drink,
//   nationality: nacionalidade - da - receita - ou - texto - vazio,
//   category: categoria - da - receita - ou - texto - vazio,
//   alcoholicOrNot: alcoholic - ou - non - alcoholic - ou - texto - vazio,
//   name: nome - da - receita,
//   image: imagem - da - receita,
// }];
export default function FavoriteButton() {
  const [isFav, setIsFav] = useState(false);
  const recipe = useSelector(({ RecipePage }) => RecipePage.detailsObject)[0];
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const savingFavoriteRecipes = () => {
    console.log(favoriteRecipes);
    const savingFavoriteRecipeObject = {
      id: recipe.idDrink || recipe.idMeal,
      type: recipe.idDrink !== undefined ? 'drink' : 'meal',
      nationality: recipe.strArea !== undefined ? recipe.strArea : '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic !== undefined ? recipe.strAlcoholic : '',
      name: recipe.strDrink || recipe.strMeal,
      image: recipe.strDrinkThumb || recipe.strMealThumb,
    };
    favoriteRecipes.push(savingFavoriteRecipeObject);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };
  const deletingFavoriteRecipe = () => {
    const pageID = recipe.idMeal || recipe.idDrink;
    const arrayWithDeletedRecipe = favoriteRecipes.filter(({ id }) => id !== pageID);
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrayWithDeletedRecipe));
  };

  useEffect(() => {
    console.log(recipe);
    // const keys = Object.keys(recipe);
    if (recipe !== undefined) {
      const pageID = recipe.idMeal || recipe.idDrink;
      const isThere = favoriteRecipes.some((favRec) => favRec.id === pageID);
      setIsFav(isThere);
      console.log(pageID);
      console.log(isThere);
    }
  }, [recipe, favoriteRecipes]);
  return (
    <div>

      { isFav
        ? (
          <button
            onClick={ () => {
              setIsFav(false);
              deletingFavoriteRecipe();
            } }
          >
            <img src={ blackHearticon } alt="Black Heart" data-testid="favorite-btn" />

          </button>)
        : (
          <button
            onClick={ () => {
              setIsFav(true);
              savingFavoriteRecipes();
            } }
          >
            <img src={ whiteHeartIcon } alt="White Heart" data-testid="favorite-btn" />
          </button>
        )}
    </div>
  );
}
