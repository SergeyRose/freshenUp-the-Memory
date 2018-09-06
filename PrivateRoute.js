import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut} from "../../user/actions";

import Layout from '../components/Layout';

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => {
    return(
    <Route {...rest}
           render={props => (
               isAuthenticated ? (
                   <Layout component={Component} {...rest} {...props}/>
               ) : (
                   <Redirect to={{
                       pathname: '/login',
                       state: {from: props.location}
                   }}/>
               )
           )
           }/>
)};

const mapStateToProps = (state) => ({
    load: state.common.loadApp,
    isAuthenticated: state.user.current
});

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logOut())
});

const Wrap = (props) => props.load ? <PrivateRoute {...props} /> : null;

export default connect(mapStateToProps, mapDispatchToProps)(Wrap);
