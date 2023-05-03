// const URL_API = `https://api.mercadolibre.com/sites/MLB/search?q=${searchTypeInput}`;

const errorMessage = 'Termo de busca não informado';
const idErrorMessage = 'ID não informado';

export const fetchProduct = async (id) => {
  if (!id) throw new Error(idErrorMessage);
  const result = await fetch(`https://api.mercadolibre.com/items/${id}`); // busca id na api
  const data = result.json(); // .results é uma key dentro da api
  return data;
};

export const fetchProductsList = async (search) => {
  if (!search) throw new Error(errorMessage);
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
  const resultObj = await result.json();
  const data = resultObj.results;
  return data;
};
