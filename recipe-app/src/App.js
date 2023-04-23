import './App.css';
import Navbar from './components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import RecipeDetails from './components/recipeDetails/RecipeDetails';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipe/:id' element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
