import React from 'react';

export default function doneMealsRecipe(mealRecipe) {
  return (
    <div>
      {mealRecipe?.map((recipe, index) => (
        <>
          {recipe.type === 'meals'}
          <image
            key={ index }
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
          />
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.nationality} - ${recipe - category}`}

          </h3>

          <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDtae}</p>

          <button data-testid={ `${index}-horizontal-share-btn` }>Compartilhar</button>
          {recipe.tags.map((tag, indexTag) => (
            <p
              key={ indexTag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag.tagName}

            </p>

          ))}
        </>
      ))}
    </div>
  );
}
