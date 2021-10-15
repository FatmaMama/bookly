import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className="container container-fluid">
          <Route path="/" exact component={Home} />
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;