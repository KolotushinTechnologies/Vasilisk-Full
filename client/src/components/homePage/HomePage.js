// Import Engine
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSellersCards } from "../../actions/profile";
import { newBasketProduct, newFavoritesProduct } from "../../actions/order";

import Modal from "../Modal/Modal";

import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";

import Carousel from "../Carousel/Carousel";

// import HomePageIntroBlock from "./homePageIntroBlock/HomePageIntroBlock"
// import HowItWorks from "../howItWorks/HowItWorks";
// import HomePageWhyUsBlock from "./homePageWhyUsBlock/HomePageWhyUsBlock";
// import HomePageAdvantagesBlock from "./homePageAdvantagesBlock/HomePageAdvantagesBlock";
// import HomePageClientsBlock from "./homePageClientsBlock/HomePageClientsBlock";
// import HomePageAdvantages2Block from "./homePageAdvantages2Block/HomePageAdvantages2Block";

// Import Styles
import ArrowImage from "../../img/arrow.png";
import ZmeiImage from "../../img/1.png";
import XoImage from "../../img/хо.png";
import PlusImage from "../../img/+.png";
// import ProductImage from "../../img/товар.png";
import "./HomePage.css";

import data from "../../data/data.json";

function HomePage({
  auth: { isAuthenticated, user },
  getSellersCards,
  newBasketProduct,
  newFavoritesProduct,
  profile: { profiles, loading },
  order: { orders },
  history
}) {
  const [modalActive, setModalActive] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    getSellersCards();
  }, [getSellersCards]);

  return (
    <Fragment>
      {/* <HomePageIntroBlock />
            <HowItWorks />
            <HomePageWhyUsBlock />
            <HomePageAdvantagesBlock />
            <HomePageClientsBlock />
            <HomePageAdvantages2Block /> */}
      <section className="section-main">
        <div className="whiteline"></div>
        <div className="whiteline"></div>

        <div className="top">
          <Link to="/">
            <img src={ArrowImage} />
          </Link>
        </div>
        <div className="contr1284">
          <div className="zagolovok">Популярные товары</div>
        </div>

        {/* <div className="contr_slider">
        <div className="slider"> */}
        <Carousel>
          {profiles.map((item) => {
            return (
              <div key={item._id} className="slider__item">
                <ul className="  ">
                  <li className="gogo11">
                    <Link to="/">{/* <img src={ZmeiImage} /> */}</Link>
                  </li>
                  <li className="gogo11 flex33 ">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </li>
                  <li className="gogo11">
                    <div className="flex111">
                      <div className="pravo11">
                        <Link to="/">{item.price}руб</Link>{" "}
                      </div>
                      <div className="flex222">
                        {" "}
                        <button
                          onClick={() => {
                            if (isAuthenticated) {
                              newFavoritesProduct(item._id, history);
                            } else {
                              setModalActive(true);
                            }
                          }}
                        >
                          {" "}
                          <img src={XoImage} />{" "}
                        </button>{" "}
                      </div>
                      <div>
                        {" "}
                        {}
                        <button
                          onClick={() => {
                            if (isAuthenticated) {
                              newBasketProduct(item._id, history);
                            } else {
                              setModalActive(true);
                            }
                          }}
                        >
                          <img src={PlusImage} />
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
        </Carousel>

        <Modal active={modalActive} setActive={setModalActive}>
          {loginStatus === false ? (
            <>
              <Register closeModal={setModalActive} />
              <div className="second-section__auth">
                <p>
                  Зарегистрированы?
                  <button
                    style={{ backgroundColor: "green" }}
                    onClick={() => setLoginStatus(true)}
                  >
                    Вход
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <Login closeModal={setModalActive} />
              <div className="second-section__auth">
                <p>
                  Нет аккаунта?
                  <button
                    style={{ backgroundColor: "green" }}
                    onClick={() => setLoginStatus(false)}
                  >
                    Регистрация
                  </button>
                </p>
              </div>
            </>
          )}
        </Modal>

        {/* </div>
      </div> */}

        <div className="zagolovok">Новинки</div>

        <Carousel>
          {profiles.map((item) => {
            return (
              <div key={item._id} className="slider__item">
                <ul className="  ">
                  <li className="gogo11">
                    <Link to="/">{/* <img src={ZmeiImage} /> */}</Link>
                  </li>
                  <li className="gogo11 flex33 ">
                    <Link to="/">{item.name}</Link>
                  </li>
                  <li className="gogo11">
                    <div className="flex111">
                      <div className="pravo11">
                        <Link to="/">{item.price}руб</Link>{" "}
                      </div>
                      <div className="flex222">
                        {" "}
                        <button>
                          {" "}
                          <img src={XoImage} />{" "}
                        </button>{" "}
                      </div>
                      <div>
                        {" "}
                        <button to="/">
                          <img src={PlusImage} />
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
        </Carousel>
      </section>
    </Fragment>
  );
}

HomePage.propTypes = {
  getSellersCards: PropTypes.func.isRequired,
  newBasketProduct: PropTypes.func.isRequired,
  newFavoritesProduct: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  order: state.order
});

export default connect(mapStateToProps, {
  getSellersCards,
  newBasketProduct,
  newFavoritesProduct
})(HomePage);
