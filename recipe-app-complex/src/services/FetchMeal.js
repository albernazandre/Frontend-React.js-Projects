const fetchMealWithId = async (pathnameId) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathnameId}`;
  const response = await fetch(endPoint);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default fetchMealWithId;
