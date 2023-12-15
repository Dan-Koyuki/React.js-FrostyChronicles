import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Register from './components/auth/Register';
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage';
import Login from './components/auth/Login';
import Pokedex from './components/content/Pokedex';
import Team from './components/content/Team';
import Map from './components/adventure/Map';
import { useSelector } from 'react-redux';
import Stage from './components/battle/Stage';

function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
        <NavBar />
        <Routes>
          <Route path='/' element={ auth._id ? <Home /> : <LandingPage />} />
          <Route path='/home' element={<Home />} />
          {/* content Route */}
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/team' element={<Team />} />
          {/* auth Route */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          {/* not found Route */}
          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/not-found'/>}/>
          {/* Adventure */}
          <Route path='/adventure' element={<Map />}/>
          <Route path='/battle' element={<Stage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
