import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import { HashRouter, Route } from 'react-router-dom';
import Switch from 'react-bootstrap/esm/Switch';
import HomePage from './components/HomePage/HomePage';
import { ContactPage } from './components/ContactPage/ContactPage';
import UserLoginPage from './components/UserLoginPage/UserLoginPage';
import MoviePage from './components/MoviePage/MoviePage';
import { UserRegistrationPage } from './components/UserRegistrationPage/UserRegistrationPage';
import OrdersPage from './components/Orders/OrdersPage';
import AdministratorLoginPage from './components/AdministratorLoginPage/AdministratorLoginPage';
import AdministratorDashboard from './components/AdministratorDashboard/AdministratorDashboard';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ HomePage }/>
        <Route path="/contact" component={ ContactPage }/>
        <Route path="/user/login" component={ UserLoginPage }/>
        <Route path="/user/register" component={ UserRegistrationPage }/>
        <Route path="/movie/:mId" component={ MoviePage }/>
        <Route path="/user/orders" component={ OrdersPage }/>
        <Route path="/administrator/login" component={ AdministratorLoginPage }/>
        <Route path="/administrator/dashboard" component={ AdministratorDashboard }/>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
