import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Popper from "@material-ui/core/Popper/Popper";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core";
import classNames from 'classnames';

import {styles} from "./styles";

class Popup extends Component {
    state = {
        arrowRef: null,
    };
    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    };

    render() {
        const {classes, open, arrow, anchorEl, children, title, ...rest} = this.props;
        const {arrowRef} = this.state;
        return (
            <Popper className={classes.popper}
                    placement="bottom"
                    open={open}
                    anchorEl={anchorEl}
                    disablePortal={true}
                    modifiers={{
                        arrow: {
                            enabled: arrow,
                            element: arrowRef,
                        },
                    }}
                    {...rest}>
                {arrow &&
                <span className={classNames(classes.arrow, title && classes.arrowBlack)} ref={this.handleArrowRef}/>}
                <Paper>
                    {title && (<Typography variant="subheading" className={classes.title}>{title}</Typography>)}
                    {children}
                </Paper>
            </Popper>
        );
    }
}

Popup.defaultProps = {
    arrow: false,
    children: null,
    anchorEl: null,
    open: false,
    title: null,
};

Popup.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    arrow: PropTypes.bool,
    children: PropTypes.node,
    anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    classes: PropTypes.object.isRequired,
    placement: PropTypes.oneOf([
        'bottom-end',
        'bottom-start',
        'bottom',
        'left-end',
        'left-start',
        'left',
        'right-end',
        'right-start',
        'right',
        'top-end',
        'top-start',
        'top',
    ]),

};

export default withStyles(styles)(Popup)
