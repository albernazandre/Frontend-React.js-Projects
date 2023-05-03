import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });
  // toHaveBeeCalled chama fecht ao executar a funcao fecthproductList
  it('fetch é chamado ao executar fetchProductsList', () => {
    fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });
  // toBeCalledWidth chama o fetch com o endpoint
  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', () => {
    fetchProductsList('computador');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  // a pesquisa só será mostrada depois (await) de o param computador ser passado para a funcao (espera o argumento)
  it('Retorno esperado com o parâmetro "computador', async () => {
    expect(await fetchProductsList('computador')).toEqual(computadorSearch);
  });
  // pesquisa retorna o erro. Se rejeitada lance o erro 'Termo de busca não informado'
  it('Erro quando chama fetchProductList sem param', () => {
    expect(fetchProductsList()).rejects.toThrow('Termo de busca não informado');
  });
});
