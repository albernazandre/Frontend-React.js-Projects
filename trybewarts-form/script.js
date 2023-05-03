const getInputEmail = document.getElementById('input-email');
const getInputSenha = document.getElementById('input-senha');
const getBtnEntrar = document.getElementById('btn-entrar');

function validateBtnEntrar() {
  getBtnEntrar.addEventListener('click', () => {
    const inputEmail = getInputEmail.value;
    const inputSenha = getInputSenha.value;
    if (inputEmail === 'tryber@teste.com' && inputSenha === '123456') {
      window.alert('Olá, Tryber!');
    } else {
      window.alert('Email ou senha inválidos.');
    }
  });
}
validateBtnEntrar();

// Requisito 18

const getSubmitBtn = document.getElementById('submit-btn');
const getAgreement = document.getElementById('agreement');

const submitForm = () => {
  if (getAgreement.checked) {
    getSubmitBtn.disabled = false;
  } else {
    getSubmitBtn.disabled = true;
  }
};
submitForm();

getAgreement.addEventListener('click', submitForm);