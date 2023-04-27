import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const history = useHistory();

  const validateEmail = () => {
    const number = 6;
    const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    return regex.test(emailInput) && passwordInput.length > number;
  };

  const handleClick = () => {
    const obj = { email: emailInput };

    localStorage.setItem('user', JSON.stringify(obj));
    history.push('/meals');
  };

  return (
    <div>
      <input
        data-testid="email-input"
        type="text"
        value={ emailInput }
        onChange={ ({ target }) => setEmailInput(target.value) }
      />
      <input
        data-testid="password-input"
        type="password"
        value={ passwordInput }
        onChange={ ({ target }) => setPasswordInput(target.value) }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !validateEmail() }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
