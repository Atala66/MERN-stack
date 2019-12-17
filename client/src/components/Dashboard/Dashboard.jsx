import React, { useEffect } from "react";
import {  getCurrentProfile } from '../../actions/profile';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const Dashboard = ( { getCurrentProfile }) => {

    useEffect(() => {
       getCurrentProfile();
    }, []);
    return(
       <div>Dashboard</div>
    )
};

Dashboard.propTypes = {
   getCurrentProfile : PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired
}


const mapStateToProps = () => state => ({
   auth: state.auth,
   profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);