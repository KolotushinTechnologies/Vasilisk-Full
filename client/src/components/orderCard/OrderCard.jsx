// Import Engine
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { getSellersCards } from "../../actions/profile";

// Import Styles
import "./OrderCard.css";
import ArrowImage from "../../img/arrow.png";
import ZmeiImage from "../../img/1.png";
import XoImage from "../../img/хо.png";
import PlusImage from "../../img/+.png";

const OrderCard = ({ nameProduct, priceProduct }) => {
  return (
    <Fragment>
      <ul className="  ">
        <li className="gogo11">
          <Link to="/">{/* <img src={ZmeiImage} /> */}</Link>
        </li>
        <li className="gogo11 flex33 ">
          <Link to="/">{nameProduct}</Link>
        </li>
        <li className="gogo11">
          <div className="flex111">
            <div className="pravo11">
              <Link to="/">{priceProduct}руб</Link>{" "}
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
              <button onClick={() => {}}>
                <img src={PlusImage} />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </Fragment>
  );
};

export default OrderCard;

// HomePage.propTypes = {
//   getSellersCards: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => ({
//   profile: state.profile
// });

// export default connect(mapStateToProps, { getSellersCards })(HomePage);
