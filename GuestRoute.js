import React from 'react';
import {Route as ReactRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from '../components/Layout';
import {logOut} from "../../user/actions";

const GuestRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <ReactRouter {...rest}
                 render={props => (
                     !isAuthenticated ? (
                         <Layout component={Component} {...rest} {...props}/>
                     ) : (
                         <Redirect to={{
                             pathname: '/',
                             state: {from: props.location}
                         }}/>
                     )
                 )
                 }/>
);

const mapStateToProps = (state) => ({
    load: state.common.loadApp,
    isAuthenticated: state.user.current
});

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logOut())
});

const Wrap = (props) => props.load ? <GuestRoute {...props} /> : null;

export default connect(mapStateToProps, mapDispatchToProps)(Wrap);