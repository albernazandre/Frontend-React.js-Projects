import React, { useEffect, useState } from 'react';
import classes from './hero.module.css';
import meal from '../../assets/meal1.jpg';

const Hero = () => {
  const URL_CHICKEN_BREAST='https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast';
  const URL_SEA='https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
  
  const [chickenRecipe, setChickenRecipe] = useState('');
  const [seaRecipe, setSeaRecipe] = useState('');

  useEffect(() => {
    const fetchChickenRecipe = async() => {
      try {
        const response = await fetch(URL_CHICKEN_BREAST);
        const data = await response.json();

        // console.log(data.meals);
        setChickenRecipe(data.meals[0]);

      } catch (error) {
        console.error(error);
      }
    }
    fetchChickenRecipe();
  }, []);

  useEffect(() => {
    const fetchseaRecipe = async() => {
      try {
        const response = await fetch(URL_SEA);
        const data = await response.json();

        // console.log(data.meals);
        setSeaRecipe(data.meals[0]);

      } catch (error) {
        console.error(error);
      }
    }
    fetchseaRecipe();
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <h2>Craving some <br />delicious meals</h2>
          <h5>Felling the cooking vibe</h5>
          <p className={classes.firstDesc}>
            You've come to the right place for <br /> some tasty recipes
          </p>
          <p className={classes.secondDesc}>
            Just see what we have for you
          </p>
          <div className={classes.buttons}>
            <button>Get Started</button>
            <button>Explore recipes</button>
          </div>
        </div>
        <div className={classes.right}>
          <img src={meal} alt='meal' />
          <div className={classes.chickenMeal}>
            <div className={classes.imgContainer}>
              <img src={chickenRecipe?.strMealThumb} alt='chicken' />
            </div>
            <h5>{chickenRecipe?.strMeal}</h5>
          </div>
          <div className={classes.seaMeal}>
            <div className={classes.imgContainer}>
              <img src={seaRecipe?.strMealThumb} alt='seaFood' />
            </div>
              <h5>{seaRecipe?.strMeal}</h5>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default Hero;
