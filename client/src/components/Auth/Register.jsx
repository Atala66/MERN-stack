import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
// connect cmp with redux
import { connect } from "react-redux";
// props of cmp.
import PropTypes from 'prop-types';
// import redux actions
import {setAlert} from '../../actions/alert';
import {registerUser} from '../../actions/auth';


const Register = ( { setAlert, registerUser, isAuthenticated }) => {
  // initial value
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;
  // copiamos el formulario
  // el name de cada input va a apuntar a su nuevo valor
  const onChange =  e => 
 setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      // equivalent to props.setAlert
      setAlert("Passwords don´t match", 'danger');
    } else {
      registerUser({ name, email, password });
      //console.log(formData);
    }

  };
  if(isAuthenticated) {
    return <Redirect to="/dashboard"/>
  }
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={e => onChange(e)}
              value={name}/>
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}/>
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}/>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}/>
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};


Register.propTypes = {
  setAlert : PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})

// @params - state - action to dispatch 
export default connect(mapStateToProps, {setAlert, registerUser} )(Register);
