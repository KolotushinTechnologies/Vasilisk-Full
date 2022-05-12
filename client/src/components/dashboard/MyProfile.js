// Import Engine
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMySellerCard } from "../../actions/profile";
import { getOrders } from "../../actions/order";
import { getMyCarpets } from "../../actions/carpet";
import { logout } from "../../actions/auth";

// Import Components
// import BackButton from "../backButton/BackButton";
import OrderCard from "../orderCard/OrderCard";
import CarpetCard from "../carpetCard/CarpetCard";
import Profile from "./Profile/Profile";
// import Carousel from

// Import Styles
import "./MyProfile.css";

const MyProfile = ({
  getMySellerCard,
  getOrders,
  getMyCarpets,
  auth: { user },
  profile: { profile },
  order: { orders },
  carpet: { carpets },
  logout
}) => {
  useEffect(() => {
    getMySellerCard();
  }, [getMySellerCard]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  useEffect(() => {
    getMyCarpets();
  }, [getMyCarpets]);

  return (
    <Fragment>
      {/* <div className="contentHeaderButtonsDiv"></div>
      <span className="profileHeader profileAboutMeText">Личный кабинет</span> */}
      <Profile
        avatar={user && user.avatar}
        fullName={user && user.fullName}
        login={user && user.login}
        address={user && user.address}
        // birthDay={user && user.birthDay}
        email={user && user.email}
        // location={user && user.location}
        phoneNumber={user && user.phoneNumber}
        // iAmSeller={user && user.iAmSeller}
        user={user && user}
        // profileCompanyName={profile && profile.companyName}
        // profileEmailOne={profile && profile.emailOne}
        // profilePhoneNumberOne={profile && profile.phoneNumberOne}
        logout={logout}
      />
      <div className="profileHeaderDiv">
        <span className="profOrdersText">
          Избранное({orders && orders.length})
        </span>
        <Link className="profOrdersLink" to="/orders">
          Смотреть все
        </Link>
      </div>
      <div className="profileOrdersDiv">
        {orders
          ? orders.map((product) => (
              <OrderCard
                nameProduct={product.productCard.name}
                priceProduct={product.productCard.price}
                // iAmSeller={user && user.iAmSeller}
                // myName={user && user.fullname}
                // key={order._id}
                // isSent
                // img=""
                // sellerName={order.seller.fullname}
                // nameBuyer={order.buyer.fullname}
              />
            ))
          : "Orders Not Found!"}
      </div>
      <div className="profileOrdersDiv">
        {carpets
          ? carpets.map((carpet) => (
              <CarpetCard key={carpet._id} about={carpet} />
            ))
          : "Orders Not Found!"}
      </div>
    </Fragment>
  );
};

MyProfile.propTypes = {
  getMySellerCard: PropTypes.func.isRequired,
  getOrders: PropTypes.func.isRequired,
  getMyCarpets: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  order: state.order,
  carpet: state.carpet
});

export default connect(mapStateToProps, {
  getMySellerCard,
  getOrders,
  getMyCarpets,
  logout
})(MyProfile);
