import './App.css';
import { PlanetProvider } from './context/ContextApp';
import Home from './pages/Home';

function App() {
  return (
    <PlanetProvider>
      <Home />
    </PlanetProvider>
  );
}
export default App;
