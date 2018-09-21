import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles/index";
import {styles} from './styles';
import PasswordDialog from './DialogPasswordSuccess'
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

class ResetPassword extends Component {
    state = {
        isDialogOpen: false,
        passwords: {
            firstValue: '',
            secondValue: ''
        },
        requestStatus: false,
        errors: {},
        errorMsg: null,

    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.resetPasswordStatus) {
            this.setState({requestStatus: nextProps.resetPasswordStatus, isDialogOpen: true})
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        let errors = {};
        const passwords = this.state.passwords;
        this.setState({errors, errorsMsg: null});

        for (let v in passwords) {
            if (passwords[v] === '') {
                errors = Object.assign({}, errors, {[v]: true});
                this.setState({errors, errorsMsg: 'This fields are required!'})
            }
        }

        if (this.state.passwords.firstValue !== this.state.passwords.secondValue) {
            errors = Object.assign({}, errors, {firstValue: true, secondValue: true});
            this.setState({errors, errorMsg: 'Passwords do not match'})
        }

        if (this.state.passwords.secondValue.length <= 4) {
            errors = Object.assign({}, errors, {firstValue: true, secondValue: true});
            this.setState({errors, errorMsg: 'Password is to short'})
        }

        if (Object.keys(errors).length > 0) return null;

        return this.props.resetPasswordSetNew(this.props.username, this.state.passwords.secondValue, this.props.token);
    };

    handleClose = () => {
        return this.setState({isDialogOpen: false});
    };

    handleChange = (type) => e => {
        return this.setState({
            passwords: Object.assign({}, this.state.passwords, {[type]: e.target.value})
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.currentBody}>
                <p className={classes.title}>Reset Password</p>
                <form onSubmit={this.handleSubmit}>
                    <div className={classes.emailBox}>

                        <FormControl
                            className={classes.textField}
                            error={this.state.errors.firstValue && true}
                            aria-describedby="name-error-text"
                        >
                            <InputLabel>New Password</InputLabel>
                            <Input type='password' required={true} value={this.state.passwords.firstValue}
                                   onChange={this.handleChange('firstValue')}/>
                            {this.state.errors.firstValue &&
                            <FormHelperText className={classes.formHelperText}
                                            id="name-error-text">{this.state.errorMsg}</FormHelperText>}
                        </FormControl>

                        <FormControl
                            className={classes.textField}
                            error={this.state.errors.secondValue && true}
                            aria-describedby="name-error-text"
                        >
                            <InputLabel>Password Again</InputLabel>
                            <Input type='password' required={true} value={this.state.passwords.secondValue}
                                   onChange={this.handleChange('secondValue')}/>
                            {this.state.errors.secondValue &&
                            <FormHelperText className={classes.formHelperText}
                                            id="name-error-text">{this.state.errorMsg}</FormHelperText>}
                        </FormControl>

                        <Button variant="contained" color="primary" type='submit' className={classes.button}
                                disabled={false}>Change
                            Password</Button>
                    </div>
                </form>
                <PasswordDialog open={this.state.isDialogOpen} requestStatus={this.state.requestStatus}
                                onClose={this.handleClose}
                />
            </div>
        )
    }
}

export default withStyles(styles)(ResetPassword)