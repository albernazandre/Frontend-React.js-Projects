import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { recommendationDrinks,
  recommendationMeals,
  fetchMealUsingId,
  fetchDrinkUsingId } from '../redux/actions';
import Carousel from './Carousel';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import Recipe from './Recipe';

function RecipeInProgress() {
  const location = useLocation();
  const { pathname } = location;
  const pathnameSplited = pathname.split('/');
  const pathnameAfterSplit = pathnameSplited[1];
  const pathnameId = pathnameSplited[2];
  const loading = useSelector(({ recommend }) => recommend.recommendLoading);
  const recipeLoading = useSelector(
    ({ RecipePage: { detailsLoading } }) => detailsLoading,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathnameAfterSplit === 'meals') {
      dispatch(fetchMealUsingId(pathnameId));
      dispatch(recommendationMeals());
    } else {
      dispatch(fetchDrinkUsingId(pathnameId));
      dispatch(recommendationDrinks());
    }
  }, []);

  return (
    <div>
      {!recipeLoading && <Recipe /> }
      {!loading && <Carousel />}
      <ShareButton />
      <FavoriteButton />
    </div>
  );
}

export default RecipeInProgress;
