import React, { useState, useRef } from "react";
//import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./Header.css";
import Navigation from "./Navigation";
import ProfileDropDown from "../../component/ProfileDropdown/ProfileDropDown";
/*const navItems = [
  { id: "login", text: "Login", link: "/login", auth: false },
  { id: "signup", text: "signup", link: "/signup", auth: false },
  { id: "name", text: "name", link: "/", auth: true },
];
*/
const Header = (props) => {
  const [navbar, setNavbar] = useState(false);
  const [loginInfo, setLoginInfo] = useState(false);

  const loginInfoHandler = () => {
    setLoginInfo(true);
  };

  const themeChange = useRef();
  const menutoggle = useRef();
  const navigation = useRef();

  //console.log(themeChange.current.classList);
  const changeBackgroundColor = () => {
    if (window.scrollY >= 60) {
      if (!loginInfo) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    } else {
      setNavbar(false);
    }
  };

  const themeChangeHandler = () => {
    console.log(themeChange);
    themeChange.current.classList.toggle("active");
    props.body.current.classList.toggle("dark");
  };
  const menuToggleHandler = () => {
    menutoggle.current.classList.toggle("active");
    navigation.current.classList.toggle("active");
  };

  window.addEventListener("scroll", changeBackgroundColor);
  let navbarclassname = "nav";
  navbarclassname = navbar ? "nav-scroll" : "nav";

  return (
    <div className={props.body}>
      <nav className={navbarclassname}>
        <div className="logo">
          <Link to="/">
            <span className="logo1">Prof</span>
            <span className="logo2">Review</span>
          </Link>
        </div>
        <div
          className="toggle"
          ref={menutoggle}
          onClick={menuToggleHandler}
        ></div>
        <ul className="ulist" ref={navigation}>
          <li>
           
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/posts">Feeds</Link>
          </li>
          <li>
            <Link to="/aboutus">About us</Link>
          </li>

          <Navigation isAuth={props.isAuth} onLogout={props.onLogout} />
          <li onChange={loginInfoHandler}>
            <span className="log1">
              <Link to="/contactus">Contact Us</Link>
            </span>
          </li>
          {props.isAuth && (
            <li key="logout" className="logout">
              <ProfileDropDown
                onLogout={props.onLogout}
                userName={props.userName}
                url = {props.url}
              />
            </li>
          )}
          <li>
            <span
              className="themeChange"
              ref={themeChange}
              onClick={themeChangeHandler}
            ></span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
