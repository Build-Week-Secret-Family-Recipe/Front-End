import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import ProtectedRoute from './utils/ProtectedRoute';

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
      <div className='App'>
        <Navigation />

        <Switch>
          <ProtectedRoute path='/addrecipe' component={AddNewRecipe} />
          <ProtectedRoute path='/editrecipe/:id' component={EditRecipe} />
          <ProtectedRoute path='/recipes/:id' component={RecipePage} />
          <ProtectedRoute path='/recipes' component={RecipeList} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/login' component={LoginForm} />

          {/* If user has a token, redirect to recipe list, if not redirect to login */}
          <Route path='/'>
            {localStorage.getItem('token') ? (
              <Redirect to='/recipes' />
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
