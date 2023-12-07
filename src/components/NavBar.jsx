import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { logout } from '../features/authSlice';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Toggles the menu display
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowMenu(!showMenu);
    navigate('/');
    toast.warning('You have logged out!', {position:'bottom-left'});
  }

  return (
    <nav className='nav-bar'>
      {
        auth._id ? // use _id attribute later
        <Link to={'/home'} className='nav-bar-title'>
          <img src='https://wallpapercave.com/uwp/uwp4090068.png' alt='logoImage' className='nav-logo'/>
          <h2>Frosty Chronicles</h2>
        </Link> :
        <Link to={'/'} className='nav-bar-title'>
          <img src='https://wallpapercave.com/uwp/uwp4090068.png' alt='logoImage' className='nav-logo'/>
          <h2>Frosty Chronicles</h2>
        </Link>
      }
      {
        auth._id ? 
        <div className='dropdown-menu'>
          {/* Dropdown trigger */}
          <button onClick={toggleMenu} >{auth.name}</button>
          {/* Dropdown content */}
          {showMenu && (
            <div className='menu'>
              <button onClick={handleLogout} className='btnLogout'>Logout</button>
              <Link to={'/pokedex'}>Pokedex</Link>
              <Link to={'/team'}>Team</Link>
            </div> //if i put div here with a classname = menu, .menu will be child of dropdown-menu right?
          )}
        </div> :
        <AuthLinks>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
        </AuthLinks>
      }
    </nav>
  )
}

export default NavBar;

const AuthLinks = styled.div`
  a{
    &:last-child{
      margin-left: 2rem;
    }
  }
`;