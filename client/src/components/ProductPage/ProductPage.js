// Import Engine
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProductCard } from "../../actions/order";

// Import Components
import BackButton from "../backButton/BackButton";
// import CompanyInfo from "./CompanyInfo/CompanyInfo";
// import CompanyWhatMake from "./CompanyWhatMake/CompanyWhatMake";
// import CompanyCarpets from "./CompanyCarpets/CompanyCarpets";
import Spinner from "../layout/Spinner";

// Import Styles
// import "./Company.css";

const ProductPage = ({
  getProductCard,
  profile: { profile },
  order: { order },
  match
}) => {
  useEffect(() => {
    getProductCard(match.params.id);
  }, [getProductCard, match.params.id]);

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <BackButton link="/sellers" />
          {profile.name}
        </Fragment>
      )}
    </Fragment>
  );
};

ProductPage.propTypes = {
  getProductCard: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  order: state.order
});

export default connect(mapStateToProps, { getProductCard })(ProductPage);
