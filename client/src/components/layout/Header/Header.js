// Import Engine
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";

import Register from "../../auth/Register/Register";
import Login from "../../auth/Login/Login";

import HeaderMobileMenu from "./HeaderMobileMenu";
import Modal from "../../Modal/Modal";

// Import Styles
import iQcarpetLogo from "../../../img1/iQcarpet.png";
import LogoImage from "../../../img/лого.png";
import FavoriteImage from "../../../img/избр1.png";
import BasketImage from "../../../img/корзина1.png";
import "./Header.css";

const Header = ({ auth: { isAuthenticated, user }, logout }) => {
  const [mainHeader, setMainHeader] = useState(false);

  const [modalActive, setModalActive] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <header className={mainHeader ? "header" : "header_no_cover"}>
      <div className="cover1">
        <div className={mainHeader ? "contr1200" : "contr1111"}>
          <nav className="nav">
            <span className="logo">
              {" "}
              <Link to="/">
                <img src={LogoImage} width={"178"} height={"74"} />
              </Link>
            </span>
            {/* <!--Навигация для десктопа-->  */}
            <nav className="nav_menu_katalog">
              <ul className="menu_nav">
                <li className="menu_item">
                  <Link
                    to="/"
                    className="menu_link link"
                    onClick={() => setMainHeader(true)}
                  >
                    Каталог
                  </Link>
                </li>
                <li className="menu_item">
                  <Link
                    to="/about"
                    className="menu_link link"
                    onClick={() => setMainHeader(false)}
                  >
                    О нас
                  </Link>
                </li>
                <li className="menu_item">
                  <Link
                    to="/"
                    className="menu_link link"
                    onClick={() => setMainHeader(false)}
                  >
                    Доставка
                  </Link>
                </li>
                <li className="menu_item">
                  {isAuthenticated ? (
                    <Link to="/dashboard" onClick={() => setMainHeader(false)}>
                      Личный кабинет
                    </Link>
                  ) : (
                    <Link
                      to="/"
                      onClick={() => {
                        setMainHeader(false);
                        setModalActive(true);
                      }}
                    >
                      Личный кабинет
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
            <ul className="menu_nav">
              {isAuthenticated ? (
                <>
                  <li className="menu_item2">
                    <Link to="/">
                      <img src={FavoriteImage} width={"50"} height={"50"} />
                    </Link>
                  </li>
                  <li className="menu_item2">
                    <Link to="/">
                      <img src={BasketImage} width={"50"} height={"50"} />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="menu_item2">
                    <button onClick={() => setModalActive(true)}>
                      <img src={FavoriteImage} width={"50"} height={"50"} />
                    </button>
                  </li>
                  <li className="menu_item2">
                    <button onClick={() => setModalActive(true)}>
                      <img src={BasketImage} width={"50"} height={"50"} />
                    </button>
                  </li>
                </>
              )}
            </ul>
            {/* Registration And Authorization */}
            <Modal active={modalActive} setActive={setModalActive}>
              {loginStatus === false ? (
                <>
                  <Register closeModal={setModalActive} />
                  <p>
                    Зарегистрированы?
                    <button
                      style={{ backgroundColor: "green" }}
                      onClick={() => setLoginStatus(true)}
                    >
                      Вход
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <Login closeModal={setModalActive} />
                  <p>
                    Нет аккаунта?
                    <button
                      style={{ backgroundColor: "green" }}
                      onClick={() => setLoginStatus(false)}
                    >
                      Регистрация
                    </button>
                  </p>
                </>
              )}
            </Modal>

            {/* <!-- кнопка Мобильная навигация--> */}
            <div id="menu-tog" className="menu-icon">
              <div className="menu-icon-line"></div>
            </div>

            {/* <!--Мобильная навигация--> */}
            {/* <div id="mobile-nav" className="mobile-nav">
              <div className="mobile-nav-title"> </div>
              <ul className="mobile-nav-list">
                <li>
                  <Link to="/" className="link3">
                    Каталог
                  </Link>
                </li>
                <li>
                  <Link to="/" className="link3">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link to="/" className="link3">
                    Доставка
                  </Link>
                </li>
                <li>
                  <Link to="/" className="link3">
                    Личный кабинет
                  </Link>
                </li>
              </ul>
            </div> */}
          </nav>
        </div>
      </div>
      <div className="whiteline"></div>
    </header>
  );

  // const authLinks = (
  //   <Link className="headerUserMenu" to="/dashboard">
  //     <span className="headerUserName">{user && user.login}</span>
  //     <img className="headerUserImage" src="" />
  //     <div className="headerUserArrow" src="" />
  //   </Link>
  // );

  // const guestLinks = (
  //   <Fragment>
  //     {/* <Link to="/profiles">Developers</Link> */}

  //     <Link to="/register" className="signupbutton">
  //       Sign Up
  //     </Link>
  //     <Link to="/login" className="loginbutton">
  //       Log In
  //     </Link>
  //   </Fragment>
  // );

  // return (
  //   <nav className="header">
  //     <div className="headerLeftSide">
  //       <img className="headerLogo" src={iQcarpetLogo} />

  //       <Link to="/" className="headerChapter">
  //         Home
  //       </Link>
  //       <Link to="/sellers" className="headerChapter">
  //         Sellers
  //       </Link>
  //       <Link to="/how-it-works" className="headerChapter">
  //         How it works
  //       </Link>
  //       <Link to="/support" className="headerChapter">
  //         Support
  //       </Link>
  //     </div>
  //     <div className="headerCentre">
  //       <HeaderMobileMenu />
  //     </div>
  //     <div className="headerRightSide">
  //       {isAuthenticated ? authLinks : guestLinks}
  //       <select className="languageSelection">
  //         <option>ENG</option>
  //       </select>
  //     </div>
  //   </nav>
  // );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
