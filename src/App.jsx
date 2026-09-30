
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav/nav';
import Footer from './Components/Footer/footer'
import Home from './Pages/Home/home'
import Movies from './Pages/Movies/movies'




function App() {
  return (
    <Router>
      <div className="app">
        <Nav />
        <main className="app__main">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Movies' element={<Movies />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
);
}

export default App;
