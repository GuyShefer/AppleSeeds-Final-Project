import React from 'react'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/main/Main.component';
import Header from './components/header/Header.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/footer/Footer.component';
import 'semantic-ui-css/semantic.min.css'
import Admin from './pages/admin/Admin.componenet';
import AllProducts from './pages/allProducts/AllProducts.component';
import SaveProduct from './components/saveProduct/SaveProduct.component';
import ProductsType from './pages/productsTypes/ProductsType.component';
import Cart from './pages/cart/Cart.component';
import User from './pages/user/User.component';
import Page404 from './pages/404/Page404.component';
import Faq from './pages/faq/Faq.component';
import AboutUs from './pages/about/AboutUs.component';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="index-section">
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/faq' component={Faq} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path="/about" component={AboutUs} />
            <Route exact path='/myAccount' component={User} />
            <Route exact path='/products' component={AllProducts} />
            <Route exact path='/saveProduct' component={SaveProduct} />
            <Route exact path='/products/byType' component={ProductsType} />
            <Route path="*" component={Page404} />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
