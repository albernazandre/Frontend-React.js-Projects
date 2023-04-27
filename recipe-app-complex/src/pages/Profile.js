import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useLocalStorage from '../hooks/useLocalStorage';

function Profile() {
  const [user] = useLocalStorage('user', 'email@email.com');
  const history = useHistory();

  const logoutFunc = () => {
    history.push('/');
    localStorage.clear();
  };
  return (
    <div>
      <Header />
      <h1 data-testid="profile-email">{user.email}</h1>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes

      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes

      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => logoutFunc() }

      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

export default Profile;
