const URL_API = 'https://swapi.dev/api/planets';

export default async function fetchPlanets() {
  const request = await fetch(URL_API);
  const data = await request.json();
  const dataFinal = data.results
    .filter((planet) => delete planet.residents);
  return dataFinal;
}

//  dataFinal exclui a chave residents do objeto requerido na API
