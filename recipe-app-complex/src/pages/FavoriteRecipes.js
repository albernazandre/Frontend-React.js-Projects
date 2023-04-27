import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favorite, setFavorite] = useState([]);
  const [messageCopied, setMessageCopied] = useState(false);

  const getItem = () => {
    const recoveredData = localStorage.getItem('favoriteRecipes');

    return JSON.parse(recoveredData) || [];
  };

  useEffect(() => {
    setFavorite(getItem());
  }, []);

  const handleFavorite = (id) => {
    const currentArray = getItem();
    const newArray = currentArray.filter((recipe) => recipe.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    setFavorite(newArray);
  };

  const handleClickMeal = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);

    setMessageCopied(true);
  };

  const handleClickDrink = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);

    setMessageCopied(true);
  };

  const handleFilterAll = () => {
    setFavorite(getItem());
  };

  const handleFilterMeals = () => {
    const rawDataMeal = getItem();
    const filteredDataMeal = rawDataMeal.filter((recipe) => recipe.type === 'meal');

    setFavorite(filteredDataMeal);
  };

  const handleFilterDrinks = () => {
    const rawDataDrink = getItem();
    const filteredDataDrink = rawDataDrink.filter((recipe) => recipe.type === 'drink');

    setFavorite(filteredDataDrink);
  };

  return (
    <>
      <div>
        <Header />
        <div>
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ handleFilterAll }
          >
            All
          </button>
          <button
            data-testid="filter-by-meal-btn"
            type="button"
            onClick={ handleFilterMeals }
          >
            Meals
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ handleFilterDrinks }
          >
            Drinks
          </button>
        </div>
        <div>
          {favorite.map((rec, index) => (
            rec.type === 'meal' ? (
              <section key={ rec.id }>
                <Link to={ `/meals/${rec.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ rec.image }
                    alt={ `Imagem da receita ${rec.name}` }
                  />
                </Link>
                <Link to={ `/meals/${rec.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{rec.name}</p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${rec.nationality} - ${rec.category}`}
                </p>
                <button
                  type="button"
                  onClick={ () => handleClickMeal(rec.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="Share Button"
                  />
                </button>
                <button
                  type="button"
                  onClick={ () => handleFavorite(rec.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="Favorite Button"
                  />
                </button>
                {messageCopied && <p>Link copied!</p>}
              </section>
            )
              : (
                <section key={ rec.id }>
                  <Link to={ `/drinks/${rec.id}` }>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ rec.image }
                      alt={ `Imagem do drink ${rec.name}` }
                    />
                  </Link>
                  <Link to={ `/drinks/${rec.id}` }>
                    <p data-testid={ `${index}-horizontal-name` }>{rec.name}</p>
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${rec.alcoholicOrNot}`}
                  </p>
                  <button
                    type="button"
                    onClick={ () => handleClickDrink(rec.id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="Share Button"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={ () => handleFavorite(rec.id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="Favorite Button"
                    />
                  </button>
                  {messageCopied && <p>Link copied!</p>}
                </section>
              )
          ))}
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default FavoriteRecipes;
