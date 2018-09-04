import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TextField from "@material-ui/core/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';
import searchIcon from "./assets/search.svg";
import {withStyles} from "@material-ui/core/styles";

import ImgDef from "./assets/user.png";
import Checkbox from "@material-ui/core/Checkbox";
import classnames from "classnames";

import Popup from "../Popup";
import Icon from "../Icon";


import {styles} from "./styles";

class StudentSelect extends Component {
    state = {
        anchorEl: null,
        popper: false,
        search: ''
    };
    handleClickAway = () => {
        this.setState({
            popper: false,
            search: ''
        });

        return this.props.fetchOptions('');
    };
    handleSearch = event => {
        this.setState({
            popper: true,
            search: event.target.value

        });
        return this.props.fetchOptions(event.target.value)
    };
    handleStudent = item => e => {
        e.preventDefault();
        let value = this.props.value.filter(i => i.objectId !== item.objectId);

        if (value.length !== this.props.value.length)
            return this.props.onChange(value);

        this.props.onChange([...value, item]);

    };
    handleClick = (event) => {
        this.setState({
            popper: true,
        })
    };
    handleAnchorRef = node => {
        this.setState({
            anchorEl: node,
        });
    };

    render() {
        const {options, value, loading, classes} = this.props;
        const valueIds = value.map(i => i.objectId);
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div>
                    <TextField label={(<span style={{display: 'flex'}}>
                        <Icon style={{marginTop: -3}}>search</Icon>
                        <p className={classes.inputLabel}>Add people to this group</p>
                    </span>)}
                               className={classes.textField}
                               onChange={this.handleSearch}
                               onClick={this.handleClick}
                               inputRef={this.handleAnchorRef}
                               value={this.state.search}
                               type='text'
                               rows={1}
                               margin="normal"/>


                    <Popup arrow open={this.state.popper} anchorEl={this.state.anchorEl} placement="bottom-end">
                        <div className={classes.list}>
                            {loading ? <CircularProgress/> : (
                                <div>

                                    {options.length === 0 && this.state.search.length > 2 &&
                                    <div style={{padding: 20}}> No suitable students</div>
                                    || options.length === 0 && this.state.search.length < 2 &&
                                    <div style={{padding: 20}}> Enter a name to find the student</div>
                                    ||
                                    options.map(item => {
                                        const isChecked = valueIds.indexOf(item.objectId) > -1;
                                        return (
                                            <div key={item.objectId}
                                                 className={classes.studentOption}
                                                 onClick={this.handleStudent(item)}>
                                                <img className={classes.studentOptionImg}
                                                     src={(item.Image && item.Image.url) || ImgDef}/>
                                                <p className={classes.overflow}>{`${item.firstName} ${item.lastName}`}</p>
                                                <Checkbox checked={isChecked}
                                                          className={classnames(classes.studentOptionCheck, {[classes.isStudentOptionCheck]: isChecked})}
                                                          color="primary"/>
                                            </div>
                                        )
                                    })}

                                </div>
                            )}
                        </div>
                    </Popup>
                </div>
            </ClickAwayListener>
        );
    }
}

StudentSelect.propTypes = {
    value: PropTypes.arrayOf(PropTypes.shape({
        objectId: PropTypes.string.isRequired
    })),
    options: PropTypes.arrayOf(PropTypes.shape({
        objectId: PropTypes.string.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        Image: PropTypes.shape({
            url: PropTypes.string
        })
    })),
    loading: PropTypes.bool,
    fetchOptions: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,

};


export default withStyles(styles)(StudentSelect);