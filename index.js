import React from 'react';

import PrivateRoute from '../common/containers/PrivateRoute';
import GuestRoute from '../common/containers/GuestRoute';

import Login from './containers/FormLogin';
import Profile from './containers/Profile';
import EditProfile from './containers/EditProfile';
import SignUp from './containers/FormSignup';
import CreateGroup from './containers/CreateGroup'
import EditGroup from './containers/EditGroup'

import Assignment from './containers/TeacherAssignment';

const routes = [
    <GuestRoute key='login' path='/login' exact component={Login}/>,
    <GuestRoute key='signUp' path='/signup' exact component={SignUp}/>,
    <PrivateRoute key='profile-edit' path='/profile/edit' exact component={EditProfile}/>,


    <PrivateRoute key='group-edit' path='/profile/groups/edit/:id' exact component={EditGroup}/>,
    <PrivateRoute key='create-group' path='/profile/groups/create' exact component={CreateGroup}/>,

    <PrivateRoute key='assignment-view' path='/profile/assignments/view/:id/:page?' exact component={Assignment}/>,

    <PrivateRoute key='profile-tabs' path='/profile/:tab?' component={Profile}/>,
];

export default routes;

export {default as Reducer} from './reducers';


export {default as initStore} from './actions';