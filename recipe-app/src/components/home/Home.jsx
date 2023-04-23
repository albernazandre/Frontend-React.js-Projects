import React from 'react';
import classes from './home.module.css';
import Hero from '../hero/Hero';
import FavouriteFoods from '../favouritesFoods/FavouriteFoods';
import Categories from '../categories/Categories';

const Home = () => {
  return (
    <div>
      <Hero />
      <FavouriteFoods />
      <Categories />
    </div>
  )
}

export default Home
