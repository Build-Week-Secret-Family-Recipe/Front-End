import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';

// components
import Navigation from './components/Navbar';
import AddNewRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';
import RecipePage from './components/RecipePage';
import RecipeList from './components/RecipeList';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      {/* Protected routes to check token or redirect to the login if no token is available */}
      
          <Switch>
            <PrivateRoute path='/addrecipe' component={AddNewRecipe} />
            <PrivateRoute path='/editrecipe/:id' component={EditRecipe} />
            <PrivateRoute path='/recipes/:id' component={RecipePage} />
            <PrivateRoute path='/recipes' component={RecipeList} />
            <Route exact path='/registration' component={RegisterForm} />
            <Route exact path='/login' component={LoginForm} />

            {/* Token needed to redirect to recipe list, if not redirect to login */}
            <Route path='/'>
              {localStorage.getItem('token') ? (
                <Redirect to='/recipes' />
              ) : (
                <Redirect to='/login' />
              )}
            </Route>
          </Switch>

    </BrowserRouter>
  );
};

export default App;