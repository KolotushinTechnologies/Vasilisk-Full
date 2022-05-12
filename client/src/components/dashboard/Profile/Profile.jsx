import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileInfoSettings from "./ProfileInfo/ProfileInfoSettings";
import ButtonBackArrow from "../../../img1/buttonBackArrow.png";

import CompanyInfo from "./CompanyInfo/CompanyInfo";
import CompanyInfoSettings from "./CompanyInfo/CompanyInfoSettings";
import CompanyWhatMake from "../../company/CompanyWhatMake/CompanyWhatMake";
import CompanyWhatMakeSettings from "./CompanyWhatMakeSettings.jsx";

import "./Profile.css";

const Profile = ({
  avatar,
  fullName,
  login,
  // birthDay,
  email,
  // location,
  phoneNumber,
  // iAmSeller,
  user,
  address,
  profileCompanyName,
  profileEmailOne,
  profilePhoneNumberOne,
  logout
}) => {
  console.log(avatar);

  const [mobileInfoHidden, setMobileInfoHidden] = useState(false);

  const [displayEditProfile, toggleEditProfile] = useState(false);

  const openProfileSettings = () => toggleEditProfile(!displayEditProfile);

  const [displayEditCompanyInfo, toggleEditCompanyInfo] = useState(false);

  const openCompanySettings = () =>
    toggleEditCompanyInfo(!displayEditCompanyInfo);

  const [displayEditWhatMake, toggleEditWhatMake] = useState(false);

  const openWhatMakeSettings = () => toggleEditWhatMake(!displayEditWhatMake);

  const editProfile = (
    <ProfileInfoSettings 
      setMobileInfoHidden={setMobileInfoHidden}
      mobileInfoHidden={mobileInfoHidden} 
      logout={logout}
      // iAmSeller={iAmSeller}
      openProfileSettings={openProfileSettings}
      displayEditProfile={displayEditProfile}
      closeSettings={toggleEditProfile}
    />
  );

  const editCompanyInfo = (
    <CompanyInfoSettings mobileInfoHidden={mobileInfoHidden} />
  );

  const myProfile = (
    <ProfileInfo
      avatar={avatar}
      fullName={fullName}
      // iAmSeller={iAmSeller}
      openProfileSettings={openProfileSettings}
      displayEditProfile={displayEditProfile}
      setMobileInfoHidden={setMobileInfoHidden}
      mobileInfoHidden={mobileInfoHidden}
      logout={logout}
      login={login}
      // birthDay={birthDay}
      email={email}
      // location={location}
      address={address}
      phoneNumber={phoneNumber}
    />
  );

  // const infoCompany = (
  //   <CompanyInfo
  //     companyName={profileCompanyName}
  //     // location={location}
  //     emailOne={profileEmailOne}
  //     phoneNumberOne={profilePhoneNumberOne}
  //     mobileInfoHidden={mobileInfoHidden}
  //   />
  // );

  return (
    <Fragment>
      {displayEditProfile ? editProfile : myProfile}
      
    </Fragment>
  );
};

export default Profile;
