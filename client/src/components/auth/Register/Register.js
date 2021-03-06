// Import Engine
import React, { createRef, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/auth";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import AuthSwitchBar from "../AuthSwitchBar";
import ErrorMessage from "../ErrorMessage";

// Import Styles
import "./Register.css";
import showPasswordImage from "../../../img1/showPassword.png";
import selectArrow from "../../../img1/selectArrow.png";
import ErrorInput from "../ErrorInput";

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const countries = {
  Russia: {
    cities: [],
    code: "+7"
  },
  USA: {
    cities: [],
    code: "+1"
  },
  Ukraine: {
    cities: [],
    code: "+380"
  }
};

const currentYear = new Date().getFullYear();

const Register = ({ setAlert, register, closeModal, isAuthenticated }) => {
  const query = new URLSearchParams(useLocation().search);

  const hookForm = useForm({ mode: "all" });
  const {
    handleSubmit,
    trigger,
    setValue,
    formState: { submitCount, touchedFields, errors, dirtyFields }
  } = hookForm;
  const reghook = (ref, options) => {
    return {
      ...hookForm.register(ref, options),
      maxLength:
        (options.maxLength && (options.maxLength.value || options.maxLength)) ||
        -1
    };
  };
  /* console.log(watch("fullname")) */
  console.log(errors);

  const [countryListVisible, setCountryListVisible] = useState(false);
  const [dateDivTouched, setDateTouched] = useState(false);

  const [formData, setFormData] = useState({
    login: "",
    fullName: "",
    email: "",
    phoneMask: "+7",
    phoneNumber: "",
    address: "",
    password: "",
    password2: ""
  });

  // const [iAmSeller, setiAmSeller] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const {
    login,
    fullName,
    email,
    phoneMask,
    phoneNumber,
    address,
    password,
    password2
  } = formData;

  // useEffect(() => {
  //   trigger(submitCount > 0 ? undefined : Object.keys(touchedFields));
  // }, [iAmSeller]);

  // useEffect(() => {
  //   if (touchedFields.login || dirtyFields.login) {
  //     setValue("login", useHowLogin ? email : login);
  //     trigger("login");
  //   }
  // }, [useHowLogin]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    /* setValue(e.target.name, e.target.value);
    trigger(e.target.name);
    touchedFields[e.target.name] = true; */
  };

  const onSubmit = async (e) => {
    /* e.preventDefault(); */
    console.log("Ok");
    register({
      login,
      fullName,
      email,
      address,
      phoneNumber,
      password
    });
    closeModal(false);
  };

  // const companyField = (
  //   <div className="authField">
  //     <span className="authFieldName">Enter a Company's name</span>
  //     <ErrorInput
  //       className="authFieldInput"
  //       type="text"
  //       placeholder="Company's name"
  //       /* name="companyName" */
  //       aria-invalid={!!errors.companyName + ""}
  //       {...reghook("companyName", {
  //         required: { value: iAmSeller, message: "Empty field" },
  //         maxLength: { value: 320, message: "Company name greater than 320" },
  //         minLength: 1,
  //         pattern: /^[a-z0-9]+(|\s([a-z0-9]+)|-([a-z0-9]+))$/i,
  //         onChange: onChange
  //       })}
  //       value={companyName}
  //       error={errors.companyName}
  //     />
  //   </div>
  // );

  const phoneField = (
    <div className="authField">
      {/* <span className="authFieldName">?????????????? ?????????? ????????????????</span> */}
      <div className="phoneFieldDiv">
        <input
          className="authFieldInput phoneMask"
          /* name="phoneMask" */
          aria-invalid={!!errors.phoneMask + ""}
          {...reghook("phoneMask", {
            required: "Empty field",
            onChange: onChange
          })}
          size={phoneMask ? phoneMask.length - 1 || 1 : 1}
          value={phoneMask}
        ></input>
        <input
          className="authFieldInput phoneNum"
          type="text"
          placeholder=""
          /* name="phoneNumber" */
          aria-invalid={!!errors.phoneNumber + ""}
          {...reghook("phoneNumber", {
            required: "Empty field",
            maxLength: { value: 10, message: "???????????? ???????? 10 ????????????????" },
            minLength: { value: 10, message: "???????????? ???????? 10 ????????????????" },
            pattern: /^[0-9]+$/i,
            onChange: onChange
          })}
          value={phoneNumber}
        />
        {/* <input className="authFieldInput phoneNum"></input> */}
      </div>
      <ErrorMessage
        error={errors.phoneNumber}
        message={errors.phoneNumber && errors.phoneNumber.message}
      />
    </div>
  );

  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }

  return (
    <Fragment>
      <form className="authorizingBlock" onSubmit={handleSubmit(onSubmit)}>
        <div className="regLeftBlock">
          <div className="authField">
            {/* <span className="authFieldName">???????????????????? ??????????</span> */}
            {/* <span className="authFieldSubName">
              Latin letters and numbers without spaces
            </span> */}
            <ErrorInput
              className="authFieldInput"
              type="text"
              placeholder="???????????????????? ??????????"
              /* name="login" */
              aria-invalid={!!errors.login + ""}
              {...reghook("login", {
                required: "Empty field",
                maxLength: 320,
                minLength: 1,
                pattern:
                  /.+/gi /* /^[a-z0-9\.\$\%\#\,\-\+\=\_\(\)\{\}\!\"\'\|\;\:\<\>]+@[a-z0-9]+\.[a-z0-9]+$/i */,
                onChange: onChange
              })}
              value={login}
              error={errors.login}
            />
          </div>
          <div className="authField">
            {/* <span className="authFieldName">?????????????? ???????????? ??????</span> */}
            <ErrorInput
              className="authFieldInput"
              type="text"
              placeholder="???????? ???????????? ??????"
              /* name="fullName" */
              aria-invalid={!!errors.fullName + ""}
              {...reghook("fullName", {
                required: "Empty field",
                maxLength: { value: 30, message: "Length more than 30" },
                minLength: 1,
                pattern: /^[a-z0-9]+(|\s([a-z0-9]+)|-([a-z0-9]+))$/i,
                onChange: onChange
              })} /* TODO: ?????????????? ?????????????????? ???????????? ????????????  */
              value={fullName}
              error={errors.fullName}
            />
          </div>
          <div className="authField">
            {/* <span className="authFieldName">?????????????? ???????? Email</span> */}
            {/* <input className="authFieldInput" placeholder="Email"></input> */}
            <ErrorInput
              className="authFieldInput"
              type="email"
              placeholder="?????????????? ?????? Email"
              /* name="email" */
              aria-invalid={!!errors.email + ""}
              {...reghook("email", {
                required: "Empty field",
                maxLength: { value: 320, message: "Email greater than 320" },
                minLength: 1,
                pattern:
                  /^[a-z0-9\.\$\%\#\,\-\+\=\_\(\)\{\}\!\"\'\|\;\:\<\>]+@[a-z0-9]+\.[a-z0-9]+$/i,
                onChange: onChange
              })}
              value={email}
              error={errors.email}
            />
          </div>

          {phoneField}
          <div className="authField">
            {/* <span className="authFieldName">???????????????????? ????????????</span> */}
            {/* <span className="authFieldSubName">
              ?????????????????????? ???????????? ????????????: 6 ????????????????
            </span> */}
            <input
              className="authFieldInput"
              type={showPassword ? "text" : "password"}
              placeholder="???????????????????? ????????????"
              /* name="password" */
              aria-invalid={!!errors.password + ""}
              {...reghook("password", {
                required: "Empty field",
                minLength: {
                  value: 6,
                  message: "???????????? ???????????? ???????? 6 ????????????????"
                },
                onChange: onChange
              })}
              value={password}
            />
            <img
              onClick={() => setShowPassword(!showPassword)}
              className="regShowPassword"
              src={showPasswordImage}
            />
            <ErrorMessage
              error={errors.password}
              message={errors.password && errors.password.message}
            />
          </div>
          <div className="authField">
            {/* <span className="authFieldName">?????????????????? ????????????</span> */}
            <input
              className="authFieldInput"
              type={showPassword2 ? "text" : "password"}
              placeholder="?????????????????????? ????????????"
              /* name="password2" */
              aria-invalid={!!errors.password2 + ""}
              {...reghook("password2", {
                required: "Empty field",
                validate: {
                  value: (value) => password == value || "???????????? ???? ??????????????????"
                },
                onChange: onChange
              })}
              value={password2}
            />
            <img
              onClick={() => setShowPassword2(!showPassword2)}
              className="regShowPassword"
              src={showPasswordImage}
            />
            <ErrorMessage
              error={errors.password2}
              message={errors.password2 && errors.password2.message}
            />
          </div>
          <div className="authField">
            {/* <span className="authFieldName">?????????????? ??????????</span> */}
            <ErrorInput
              className="authFieldInput"
              type="text"
              placeholder="?????? ??????????"
              /* name="fullname" */
              aria-invalid={!!errors.address + ""}
              {...reghook("address", {
                required: "Empty field",
                maxLength: {
                  value: 100,
                  message: "???????????????????????? ???????????????????? ????????????????: 100"
                },
                minLength: 1,
                pattern: /^[a-z0-9]+(|\s([a-z0-9]+)|-([a-z0-9]+))$/i,
                onChange: onChange
              })} /* TODO: ?????????????? ?????????????????? ???????????? ????????????  */
              value={address}
              error={errors.address}
            />
          </div>
          <div className="authField">
            <span className="authFieldName">???????????????? ????????</span>
            <span className="authFieldSubName">Png/Jpeg & up to 10 MB</span>
            {/* <label className="regDownloadImageDiv">
                <div className="regDownloadImageBG">Tap for download</div>
                <input
                  className="regDownloadImageInput"
                  type="file"
                  accept="image/*"
                ></input>
              </label> */}
          </div>
        </div>
        <div className="submitButtonDiv">
          <button type="submit" className="submitButton">
            ??????????????????????
          </button>
        </div>
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
