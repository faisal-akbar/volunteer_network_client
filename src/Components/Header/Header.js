import React, { useContext } from 'react';
import './Header.css';
import logo from '../../assets/logos/logo.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { handleSignOut } from '../Login/loginManager';
//=============================================================================

const Header = () => {
  // Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // Handle sign out button
  const signOut = () => {
    handleSignOut().then(() => setLoggedInUser(''));
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand' href='#'>
          <img src={logo} alt='Volunteer-Network' />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav  justify-content-between nav-link ml-auto align-items-md-center'>
            {/* Home Navigation Click redirect to home */}
            <Link to='/home' className='nav-link active'>
              Home
            </Link>
            <Link to='/donation' className='nav-link' href='#'>
              Donation
            </Link>
            <Link to='/events' className='nav-link' href='#'>
              Events
            </Link>
            <Link to='/blog' className='nav-link' href='#'>
              Blog
            </Link>
            {/* If user logged in show User Task */}
            {loggedInUser.email && (
              <Link to='/userDashboard' className='nav-link'>
                <button type='button' className='btn btn-info w-100'>
                  My Tasks
                </button>
              </Link>
            )}

            {/* If user is not logged in show show Register else Signout  */}
            {!loggedInUser.email ? (
              <Link to='/login' className='nav-link'>
                <button type='button' className='btn btn-primary w-100'>
                  Register
                </button>
              </Link>
            ) : (
              <Link to='/' className='nav-link'>
                <button
                  onClick={signOut}
                  type='button'
                  className='btn btn-danger w-100'
                >
                  Sign Out
                </button>
              </Link>
            )}
            {/* Redirect to Admin Dashboard */}
            <Link to='/admin/dashboard' className='nav-link'>
              <button type='button' className='btn btn-dark w-100'>
                Admin
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
