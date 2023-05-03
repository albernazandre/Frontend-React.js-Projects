import { ACTION_CURR, ACTION_SAVE_EXPENSE, EXCLUDE_EXP, ACTION_EDIT_EXP_ID,
  ACTION_EDIT_EXP } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de moedas que vao nas opcoes de moeda
  expenses: [], // array de objetos contendo caracteristicas da despesa, como valor, etc...
  editor: false, // indica se uma despesa esta sendo editada no momento
  idToEdit: 0, // armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_CURR:
    return { ...state, currencies: action.payload };
  case ACTION_SAVE_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        ...action.payload, // retorna nova despesa dentro do array
      }] };
  case EXCLUDE_EXP:
    return { ...state,
      expenses: state.expenses.reduce(((acc, current) => {
        if (current.id === action.payload.id) { // nao retorne o valor corrente (aquele a ser excluido)...
          return acc; // e somente os outros na array de despesas
        }
        const newArrOfExp = [...acc, current]; // caso contrario retorne o array total
        return newArrOfExp;
      }), []),
    };
  case ACTION_EDIT_EXP_ID:
    return { ...state,
      editor: true,
      idToEdit: action.payload,
      expenses: [...state.expenses],
    };
  case ACTION_EDIT_EXP:
    return { ...state,
      editor: false,
      idToEdit: 0,
      expenses: state.expenses.reduce(((acc, current) => {
        if (current.id === action.payload.id) {
          const newArrOfExp = [...acc, action.payload]; // novo array com item editado
          return newArrOfExp;
        }
        return [...acc, current];
      }), []),
    };
  default:
    return state;
  }
};

export default wallet;
