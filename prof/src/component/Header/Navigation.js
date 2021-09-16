import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const navItems = [
  { id: 'login', text: 'Login', link: '/login', auth: false ,className:'login'},
  { id: 'signup', text: 'Create account', link: '/signup', auth: false ,className:'log'}
];

const navigationItems = props => [
  ...navItems.filter(item => item.auth === props.isAuth).map(item => (
  <li
      key={item.id}
    >
      <NavLink to={item.link} exact onClick={props.onChoose}>
      <span className={item.className}>
        {item.text}
        </span> 
      </NavLink>
    </li>
    
  )),
  
  
];

export default navigationItems;
/*

*/ 