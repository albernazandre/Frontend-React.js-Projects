import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchMeals } from '../services/API';

function Meals() {
  const data = useSelector((state) => state.search.data);
  const [dataToRender, setDataToRender] = useState([]);
  const MAX_INDEX = 12;

  const history = useHistory();
  const dispatch = useDispatch();

  if (data === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    dispatch(sendDataAction([]));
  }

  useEffect(() => {
    const fetch = async () => {
      const allData = await fetchMeals();
      setDataToRender(allData);
    };
    fetch();
  }, []);

  return (
    <div>
      <Header />
      {(data.length >= 1 ? data : dataToRender)
        .filter((recipe, index) => index < MAX_INDEX)
        .map((rec, index) => (
          <section key={ rec.idMeal } data-testid={ `${index}-recipe-card` }>
            <button
              onClick={ () => history.push(`/meals/${rec.idMeal}`) }
            >

              <img
                src={ rec.strMealThumb }
                alt={ `thumbnail for recipe ${rec.strMeal}` }
                data-testid={ `${index}-card-img` }
                style={ { width: '180px' } }
              />

            </button>
            <p data-testid={ `${index}-card-name` }>
              {rec.strMeal}
            </p>
          </section>
        ))}
      <Footer />
    </div>
  );
}

export default Meals;
