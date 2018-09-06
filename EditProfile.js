import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {go, goBack} from '../../common/actions/index';
import EditProfile from '../components/EditProfile';
import {clearError, updateProfile,clearAlert,changePassword, changeImage} from "../actions";
import {Component} from "react";
import React from "react";
import {withWrapper} from "create-react-server/wrapper";

const mapStateToProps = (state) => ({
    user: state.user.current,
    error: state.user.editProfile.error,
    alert: state.user.editProfile.editProfile,
    country: state.common.term.country,
    accent: state.common.term.accent,
    age: state.common.term.age,
    grade: state.common.term.grade,
    readingLevel: state.common.term.readingLevel,
});

const mapDispatchToProps = (dispatch) => ({
    goBack: () => dispatch(goBack()),
    clearError: () => dispatch(clearError()),
    clearAlert: () => dispatch(clearAlert()),
    updateProfile: (data, img) => dispatch(updateProfile(data, img)),
    changePassword: password => dispatch(changePassword(password)),
    changeImage: img => dispatch(changeImage(img))

});

class Wrap extends Component {

    componentWillUnmount() {
       this.props.clearAlert();
    }
    render() {
        return <EditProfile {...this.props} />
    }
}


Wrap = connect(mapStateToProps, mapDispatchToProps)(Wrap);
export default withWrapper(Wrap);