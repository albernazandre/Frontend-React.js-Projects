const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const fetchDrinksRecomendations = async () => {
  const response = await fetch(endPoint);
  const data = await response.json();
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
};

export default fetchDrinksRecomendations;
