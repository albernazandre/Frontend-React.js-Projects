export const ACTION_EMAIL = 'EMAIL_SAVE';
export const ACTION_CURR = 'ACTION_CURR';
export const ACTION_SAVE_EXPENSE = 'ACTION_SAVE_EXPENSE';
export const ACTION_CURR_ON_EXPENSE = 'ACTION_CURR_ON_EXPENSE';
export const EXCLUDE_EXP = 'EXCLUDE_EXP';
export const ACTION_EDIT_EXP_ID = 'ACTION_EDIT_EXP_ID';
export const ACTION_EDIT_EXP = 'ACTION_EDIT_EXP';

// acao de salvar email
export const actionEmail = (payload) => ({
  type: ACTION_EMAIL,
  payload,
});

export const actionCurr = (payload) => ({
  type: ACTION_CURR,
  payload,
});

// acao de salvar despesa
export const actionSaveExpense = (payload) => ({
  type: ACTION_SAVE_EXPENSE,
  payload,
});

export const actionCurrOnExpense = (payload) => ({
  type: ACTION_CURR_ON_EXPENSE,
  payload,
});

// acao de excluir despesa da tabela
export const actionExcludeExp = (payload) => ({
  type: EXCLUDE_EXP,
  payload,
});

// acoes de editar despesas com o clique de btao edit
export const actionEditExpId = (payload) => ({
  type: ACTION_EDIT_EXP_ID,
  payload,
});

export const actionEditExp = (payload) => ({
  type: ACTION_EDIT_EXP,
  payload,
});

export const fetchOnCurr = () => async (dispatch) => {
  const requisitionOne = await fetch('https://economia.awesomeapi.com.br/json/all');
  const responseJSON = await requisitionOne.json();
  const arrayOfCurr = Object.keys(responseJSON);
  const indexUSDT = arrayOfCurr.indexOf('USDT');
  arrayOfCurr.splice(indexUSDT, 1);
  dispatch(actionCurr(arrayOfCurr));
};

export const currOnExpense = () => async (dispatch) => {
  const requisitionOne = await fetch('https://economia.awesomeapi.com.br/json/all');
  const responseJSON = await requisitionOne.json();
  dispatch(actionCurrOnExpense(responseJSON));
};
