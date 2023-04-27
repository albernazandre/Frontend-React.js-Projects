export async function getCategories() {
  const resolve = await fetch('https://api.mercadolibre.com/sites/MLB/categories'); // resolve recebe a funcao de requisicao
  const data = resolve.json(); // data recebe o resultado da requisicao modificada por json, o que torna os dados mais "limpos"
  return data; // retorne data
}

export async function getProductsFromCategoryAndQuery(id, query) { // retorna os produtos baseados em um ou outro parametros (id ou query) -> query significa 'consulta' quando traduzido, entao seria qualquer outro valor que nao o id numa busca de produto
  const resolve = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}&q=${query}`); // resolve recebe a funcao de requisicao
  const data = resolve.json(); // data recebe o resultado da requisicao modificada por json, o que torna os dados mais "limpos"
  return data; // retorne data
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
