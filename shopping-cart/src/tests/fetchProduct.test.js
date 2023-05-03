import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchproduct é uma funcao', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  it('testa se ao chamar com arg espec funcao fetch ua api', () => {
    fetchProduct('MLB1405519561');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });
  // verificar somente quando fetchProduct for executada
  it('testa se com o arg etabelecido o retorno é identico ao obj product', async () => {
    expect(await fetchProduct('MLB1405519561')).toEqual(product);
  });
  it('fetch sem arg retorna erro', () => {
    expect(fetchProduct()).rejects.toThrow('ID não informado');
  });
});
