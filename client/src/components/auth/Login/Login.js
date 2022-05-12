import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginAuth } from "../../../actions/auth";
import AuthSwitchBar from "../AuthSwitchBar";
import { useForm } from "react-hook-form";
import ErrorInput from "../ErrorInput";

import "./Login.css";

const Login = ({ loginAuth, closeModal, isAuthenticated }) => {
  const hookForm = useForm();
  const {
    handleSubmit,
    trigger,
    setValue,
    formState: { errors }
  } = hookForm;
  const reghook = (ref, options) => {
    return {
      ...hookForm.register(ref, options),
      maxLength:
        (options.maxLength && (options.maxLength.value || options.maxLength)) ||
        -1
    };
  };

  const [formData, setFormData] = useState({
    login: "",
    password: ""
  });

  const { login, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  const onSubmit = (e) => {
    /* e.preventDefault(); */
    loginAuth(login, password);
    closeModal(false);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <form className="authorizingBlock" onSubmit={handleSubmit(onSubmit)}>
        <div className="authField">
          <span className="authFieldName">Введите свой логин</span>
          {/* <input
            className="authFieldInput"
            placeholder="Email or Login"
          ></input> */}
          <ErrorInput
            className="authFieldInput"
            type="text"
            placeholder="Ваш логин"
            /* name="email" */
            aria-invalid={!!errors.login + ""}
            {...reghook("login", {
              required: "Empty field",
              maxLength: 320,
              minLength: 1,
              pattern:
                /^[a-z0-9\.\$\%\#\,\-\+\=\_\(\)\{\}\!\"\'\|\;\:\<\>]+@[a-z0-9]+\.[a-z0-9]+$|^[a-z0-9]+$/i
            })}
            value={login}
            onChange={onChange}
            error={errors.login}
          />
        </div>
        <div className="authField">
          <span className="authFieldName">Введите пароль</span>
          {/* <input className="authFieldInput" placeholder=" Password"></input> */}
          <ErrorInput
            className="authFieldInput"
            type="password"
            placeholder="Введите пароль"
            /* name="password" */
            aria-invalid={!!errors.password + ""}
            {...reghook("password", { required: "Empty field", minLength: 6 })}
            value={password}
            onChange={onChange}
            error={errors.password}
          />
          <div className="loginLastField">
            <Link to="password-recovery" className="forgotPassword">
              Forgot your Password?
            </Link>
          </div>
        </div>
        <div className="submitButtonDiv">
          <button className="submitButton" type="submit">
            Go
          </button>
        </div>
      </form>
      <div className="loginLinksDiv">
        <div className="loginLinksBlock1">
          <div className="loginLinksLine"></div>
          <span className="loginLinksHeader">Or</span>
          <div className="loginLinksLine"></div>
        </div>
        <div className="loginLinksBlock2">
          <a className="loginLink"></a>
          <a className="loginLink"></a>
          <a className="loginLink"></a>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  loginAuth: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginAuth })(Login);
