/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts'); // localStorage salva as infos, e getItem busca dentro do localStorage a info necessária, no caso o cartProducts
  return cartProducts ? JSON.parse(cartProducts) : []; // se cartProducts tiver algum item, retorne os itens em forma de obj. Caso contrário, retorna array vazio
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');
  const cartProducts = getSavedCartIDs(); // cartProducts é o carrinho de compras que começa vazio
  const newCartProducts = [...cartProducts, id]; // pega os itens do carrinho e adiciona o novo id (os 3 pontos são o spread operator que acumula os itens)
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts)); // setItem armazena os itens dentro da key que é cartProducts. stringify transforma os valores em string
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = [...getSavedCartIDs()]; // captura a função com os itens armazenados na localStorage
  const indexProduct = cartProducts.indexOf(id); // o indexOf busca a posicao do id passado como param na função
  cartProducts.splice(indexProduct, 1); // o splice quando recebe dois param, exclui o numero de elementos passado no segundo param. o primeiro param é a posicao
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
};

const selectPrice = document.querySelector('.total-price');

export const calcTotal = (price) => {
  const productPrice = [getSavedCartIDs.results.price];
}