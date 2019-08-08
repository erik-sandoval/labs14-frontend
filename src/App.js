import React,{useState} from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import HomePage from './components/HomePage/HomePage';
import Callback from './components/HomePage/Callback';
import Login from './components/Login/Login';
import PrivateRoute from './PrivateRoute';
import Profile from './components/Owner/Profile';
import Register from './components/Register/Register';

import NavBar from './components/Nav/NavBar';
import Footer from './components/Footer/Footer';
import CreateListing from './components/CreateListing/CreateListing';

const App = props => {
  const submit = useSelector(store => store.submit);
  
      return (
      <div>
        <BrowserRouter>
          <header>
            <NavBar {...props} />
          </header>
          <Switch>
           <Route exact path="/" {...props} component={Login} />
            <Route exact path="/v2/logout" {...props} component={Login} />
            <Route exact path="/callback" component={Callback} />
            <PrivateRoute
              auth={submit}
              path="/home"
              component={HomePage}
            />
            <Route  {...props} exact path="/profile" component={Profile} />
            <Route path="/create-listing" component={CreateListing} />
            <Route exact path="/register" component={Register} />
          </Switch>
          <footer>
            <Footer />
          </footer>
        </BrowserRouter>
      </div>
   
      )}


// grabbing login and signup from actions file... mapping the state to the props
export default App
