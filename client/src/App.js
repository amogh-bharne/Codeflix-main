import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages and Components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import NewProject from './pages/NewProject';
import Workspace from './pages/Workspace';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path='/newProject' element={<NewProject />} />
          <Route path='/workspace' element={<Workspace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
