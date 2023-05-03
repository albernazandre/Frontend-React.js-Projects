import { searchCep } from './helpers/cepFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { addingProduct, createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// constante que seleciona a class products
const cardList = document.querySelector('.products');
const load = document.createElement('span'); // constante que cria elemento do tipo span
load.innerText = 'carregando...'; // mensagem do elemento span
load.classList.add('loading'); // adiciona classe ao elemento load
cardList.appendChild(load); // os elementos da classe products recebem o elemento load

// funcao que faz com que quando o resultado da pesquisa é colocado na tela, o load seja removido e apareça um elemento contendo o produto
fetchProductsList('computador').then((result) => { // resultado quando a requisição for resovida será...
  load.remove(); // remover o icone de carregamento
  result.forEach((element) => { // para cada elemento do resultado crie a const cardque será o elemento que contem um produto
    const card = createProductElement(element);
    cardList.appendChild(card);
  });
})
  .catch(() => { // em caso de erro...
    load.remove(); // remova o load
    const errorElement = document.createElement('span'); // constante que recebe o elemento de erro
    errorElement.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    errorElement.classList.add('error'); // adiciona uma classe ao erro
    cardList.appendChild(errorElement); // cardList recebe o elemento de erro em caso de ocorrer
  });

getSavedCartIDs().forEach((id) => { // seleciona o que ja esta salvo no Carrinho e para cada id...
  addingProduct(id); // executa a funcao que adiciona o produto
});
