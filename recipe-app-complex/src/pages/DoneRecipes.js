import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareButton from '../images/shareIcon.svg';
import Header from '../components/Header';
import useLocalStorage from '../hooks/useLocalStorage';

function DoneRecipes() {
  const [doneRecipes] = useLocalStorage('doneRecipes');
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  return (
    <div>
      <Header />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>

      {doneRecipes?.map((recipe, index) => (
        recipe.type === 'meal'
          ? (
            <>
              <button
                type="button"
                onClick={
                  () => history.push(`/meals/${recipe.id}`)
                }
              >
                <img
                  style={ { width: '260px' } }
                  alt="icone do botao"
                  key={ index }
                  src={ recipe.image }
                  data-testid={ `${index}-horizontal-image` }
                />
              </button>

              <h3
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.category}`}

              </h3>

              <button
                onClick={ () => history.push(`/meals/${recipe.id}`) }
              >
                <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
              </button>

              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

              <button
                onClick={
                  () => clipboardCopy(`http://localhost:3000/meals/${recipe.id}`).then(() => {
                    setCopied(true);
                  })
                }
              >
                <img
                  style={ { width: '30px' } }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="icone do botao"
                  src={ shareButton }
                />
              </button>
              {copied && <p>Link copied!</p>}

              {recipe.tags.map((tag, indexTag) => (
                <p
                  key={ indexTag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}

                </p>

              ))}
            </>)
          : (
            <>
              <button
                type="button"
                onClick={
                  () => history.push(`/drinks/${recipe.id}`)
                }
              >
                <img
                  alt="icone do botao"
                  style={ { width: '260px' } }
                  key={ index }
                  src={ recipe.image }
                  data-testid={ `${index}-horizontal-image` }
                />
              </button>

              <button
                onClick={ () => history.push(`/drinks/${recipe.id}`) }
              >
                <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
              </button>

              <h3
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}

              </h3>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              <button
                onClick={
                  () => clipboardCopy(`http://localhost:3000/drinks/${recipe.id}`).then(() => {
                    setCopied(true);
                  })
                }
              >
                <img
                  style={ { width: '30px' } }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="icone do botao"
                  src={ shareButton }
                />
              </button>
              {copied && <p>Link copied!</p>}

            </>)

      ))}
    </div>
  );
}

export default DoneRecipes;
