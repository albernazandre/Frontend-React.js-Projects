import React, { useEffect, useState } from 'react';
import classes from './categories.module.css';
import { Link } from 'react-router-dom';

const Categories = () => {
  const URL_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const URL_RECIPES = `https://www.themealdb.com/api/json/v1/1/filter.php?c=`;
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategoy] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(URL_CATEGORIES);
        const data = await response.json();
        
        // console.log(data.categories.slice(0,9));
        setCategories(data.categories.slice(0,9));
        setActiveCategoy(data.categories[0].strCategory);

      } catch (error) {
        console.log(error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${URL_RECIPES}${activeCategory}`);
        const data = await response.json();
        
        // console.log(data.meals.slice(0, 11));
        setRecipes(data.meals.slice(0,11));

      } catch (error) {
        console.log(error);
      }
    }
    activeCategory && fetchRecipes();
  }, [activeCategory]);



  return (
    <div>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.titles}>
            <h5>Pick a Category</h5>
            <h2>Choose what suit you</h2>
          </div>
          <div className={classes.categories}>
            {categories.map((category) => (
              <div
                key={category.idCategory}
                className={`${classes.category} ${activeCategory === category.strCategory && classes.active}`}
                onClick={() => setActiveCategoy(category.strCategory)}
              >
                {category.strCategory}
              </div>
            ))}
          </div>
          <div className={classes.recipes}>
            {recipes.map((recipe) => (
              <div
                key={recipe.idMeal}
                className={classes.recipe}
              >
                <Link 
                  to={`/recipe/${recipe.idMeal}`}
                  className={classes.imgContainer}  
                >
                  <img src={recipe.strMealThumb} alt='img' />
                </Link>
                <h3>{recipe.strMeal}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
