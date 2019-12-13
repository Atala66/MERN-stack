import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const Login = ({ login, isAuthenticated }) => {
  // initial value
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  // copiamos el formulario
  // el name de cada input va a apuntar a su nuevo valor
  const onChange =  e => 
 setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
    console.log('user logged in');
  };

  // redirect if logged in
  if(isAuthenticated) {
    return <Redirect to="/dashboard"/>
  }
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign in to your account
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={e => onChange(e)}
              value={email}/>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={e => onChange(e)}
              value={password}/>
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don´t have an account yet? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </Fragment>
  );
};


Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool

}

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login } )(Login);
