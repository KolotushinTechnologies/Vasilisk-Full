// Import Engine
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

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

function HomePage() {
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
          {data.map((item) => {
            return (
              <div key={item._id} className="slider__item">
                <ul className="  ">
                  <li className="gogo11">
                    <Link to="/">{/* <img src={ZmeiImage} /> */}</Link>
                  </li>
                  <li className="gogo11 flex33 ">
                    <Link to="/">{item.title}</Link>
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
                        <Link to="/">
                          <img src={PlusImage} />
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
        </Carousel>

        {/* </div>
      </div> */}

        <div className="zagolovok">Новинки</div>

        <Carousel>
          {data.map((item) => {
            return (
              <div key={item._id} className="slider__item">
                <ul className="  ">
                  <li className="gogo11">
                    <Link to="/">{/* <img src={ZmeiImage} /> */}</Link>
                  </li>
                  <li className="gogo11 flex33 ">
                    <Link to="/">{item.title}</Link>
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
                        <Link to="/">
                          <img src={PlusImage} />
                        </Link>
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

export default HomePage;
