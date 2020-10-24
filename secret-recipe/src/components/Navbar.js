import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const Navigation = () => {
  const history = useHistory();
  const location = useLocation();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <Navbar style={{ backgroundColor: '#320d6d' }} dark>
      <NavbarBrand
        style={{ fontSize: '30px', color: '#ffd447' }}
        tag={Link}
        to='/'
        className='mr-auto'>
        Secret Family Recipes
      </NavbarBrand>

      {localStorage.getItem('token') ? (
        <Nav className='nav-links'>
          <NavItem>
            <NavLink
              a
              href='https://elles-secret-family-recipes.netlify.app/index.html'>
              Home
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              tag={Link}
              to='/recipes'
              className={location.pathname === '/api/recipes' ? 'active' : ''}>
              View Recipes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to='/addrecipe'
              className={location.pathname === '/addrecipe' ? 'active' : ''}>
              Add Recipe
            </NavLink>
          </NavItem>
          <NavItem onClick={logout}>
            <NavLink
              tag={Link}
              to='https://elles-secret-family-recipes.netlify.app/index.html'>
              Log Out
            </NavLink>
          </NavItem>
        </Nav>
      ) : (
        <Nav className='nav-links'>
          <NavItem>
            <NavLink
              tag={Link}
              to='/recipes'
              className={location.pathname === '/login' ? 'active' : ''}>
              Log In
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to='/registration'
              className={location.pathname === '/registration' ? 'active' : ''}>
              Sign Up
            </NavLink>
          </NavItem>
        </Nav>
      )}
    </Navbar>
  );
};

export default Navigation;
