import React from 'react'
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Main from './pages/main/Main.component';
import Header from './components/header/Header.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/footer/Footer.component';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="index-section">
          <Route exact path='/' component={Main} />
        </div>
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
