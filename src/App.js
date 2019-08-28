/* eslint-disable no-shadow */

import React, { useState, useEffect } from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './Auth';
import HomePage from './components/HomePage/HomePage';
import Callback from './components/HomePage/Callback';
import Login from './components/Login/Login';
import PrivateRoute from './PrivateRoute';
import Profile from './components/Owner/Profile';
import EditProfile from './components/EditProfile/EditProfile';
import Register from './components/Register/Register';
import { getUserId } from './actions/Users/USERID/getIdOfUser';
import NavBar from './components/Nav/NavBar';
import Footer from './components/Footer/Footer';
import CreateListing from './components/CreateListing/CreateListing';
import ViewListing from './components/ViewListing/ViewListing';

const App = props => {
  const submit = useSelector(store => store.submit);
  const user = useSelector(store => store.getUser);
  const registered = useSelector(store => store.registered);
  const [userId, setUserId] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pic, setPic] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [gettingUser, setGettingUser] = useState(false);
  const [id, setId] = useState({
    auth0_user_id: localStorage.getItem('user_id'),
  });
  const dispatch = useDispatch();

  const handleName = e => {
    setName(e);
  };

  const handleEmail = e => {
    setEmail(e);
  };



  

 
  useEffect(() => {
    console.log(user.user);
    if (id) {
      dispatch(getUserId(id));
     
    }
    if (user.user !== '') {
      // setGettingUser(user.gettingUser);
      setName(user.user.name);
      setEmail(user.user.email);
      setUserId(user.user.id);
      setStreet(user.user.street);
      setCity(user.user.city);
      setState(user.user.state);
      setPic(user.user.profile_picture)
      setZip(user.user.zip_code);

      console.log(user.user.name);
    }
  }, user.user !== undefined ? [user.user.name] : []);


  return ( 
    <div className="app-wrapper">
      <BrowserRouter>
        <header>
          <NavBar {...props} />
        </header>
        <Switch>
          <Route exact path="/" render={props => <Login {...props} />} />

          <Route exact path="/v2/logout" {...props} component={Login} />
          <Route exact path="/callback" component={Callback} />
          <PrivateRoute auth={submit} path="/home" component={HomePage} />
          <PrivateRoute
            {...props}
            exact
            path="/profile"
            name={name}
            render={props => (<Profile {...props} name={name} user={user} pic={pic} />)}
          />
          <PrivateRoute
            exact
            path="/edit-profile"
            render={props => (
              <EditProfile
                {...props}
                name={name}
                email={email}
                id={userId}
                city={city}
                state={state}
                street={street}
                zip={zip}
                pic={pic}
                
              />
            )}
          />
          <Route path="/create-listing" component={CreateListing} />
          
            <PrivateRoute
              exact
              path="/register"
              {...props}
              render={props => (
                <Register
                  {...props}
                  handleName={handleName}
                  handleEmail={handleEmail}
                />
              )}
            />
         
          <Route
            exact
            path="/view-listing"
            render={props => <ViewListing {...props} />}
          />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

// grabbing login and signup from actions file... mapping the state to the props
export default App;
