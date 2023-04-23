import React, { useEffect, useState } from 'react';
import classes from './recipeDetails.module.css';
import {useParams} from 'react-router-dom';


const RecipeDetails = () => {
  const URL_DETAILS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const {id} = useParams();

  // console.log(id);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`${URL_DETAILS}${id}`);
        const data = await response.json();
        // console.log(data.meals[0]);
        setRecipe(data.meals[0]);

        Object.keys(data.meals[0]).forEach((key) => {
          if(key.includes('strIngredient') && data.meals[0][key] !== '') {
            setIngredients(prev => {
              if(prev.length === 0) {
                return [data.meals[0][key]]
              } else {
                return [...prev, data.meals[0][key]]
              }   
            })
          }
          if(key.includes('strMeasure') && data.meals[0][key] !== '') {
            setMeasures(prev => {
              if(prev.length === 0) {
                return [data.meals[0][key]]
              } else {
                return [...prev, data.meals[0][key]]
              }    
            })
          }
        })

      } catch (error) {
        console.log(error);
      }
    }
    fetchRecipeDetails();
  }, [id]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Recipe Details</h2>
        <div className={classes.recipe}>
          <img src={recipe?.strMealThumb} alt='img' />
          <div className={classes.metadata}>
            Title: {recipe?.strMeal}
          </div>
          <h3>Ingredients and Measures</h3>
            <div className={classes.ingredients}>
              {ingredients.map((ingredient, index) => (
                <div key={ingredient} className={classes.ingredient}>
                  <span>
                    {ingredient}
                  </span>
                  -
                  <span>{measures[index]}</span>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails
