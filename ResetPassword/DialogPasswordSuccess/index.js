import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from "@material-ui/core/Typography";
import header from './orange-header.png'
import {styles} from './styles'

class PasswordDialog extends React.Component {
    handleClose = () => {
        return this.props.onClose();
    };

    render() {
        const {classes, ...other} = this.props;
        return (
            <Dialog aria-labelledby="simple-dialog-title" {...other}>
                <div>
                    <div className={classes.header}><img src={header}/><Icon onClick={this.handleClose} className={classes.icon}>clear</Icon></div>
                    <Typography className={classes.title}
                                variant={'title'}>{this.props.requestStatus === 'success' && 'Password Success!' || 'Error'}</Typography>
                    <Typography className={classes.subtitle}
                                variant={'subheading'}>{this.props.requestStatus === 'success' && 'You updated your password.' || 'an error occurred'}</Typography>
                    <Link to={'/'} style={{textDecoration: 'none'}}>
                        <Button variant="contained" color="primary"
                                className={classes.button}>{this.props.requestStatus === 'success' && 'Nice!' || 'OK'}</Button>
                    </Link>
                </div>
            </Dialog>
        );
    }
}

PasswordDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

export default withStyles(styles)(PasswordDialog);
