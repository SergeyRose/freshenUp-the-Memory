import React from 'react';
import {Route as ReactRoute, withRouter} from 'react-router-dom';

import Layout from '../components/Layout';

const Route = ({component: Component, ...rest}) => (
    <ReactRoute {...rest}
           render={props => {
               if (props.staticContext)
                   props.staticContext.routeProps = rest;
               return (<Layout component={Component} {...rest} {...props}/>)
           }}/>
);

export default withRouter(Route);
