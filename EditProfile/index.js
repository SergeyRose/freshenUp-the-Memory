import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles/index";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classNames from 'classnames';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import TextArea from "../../../common/components/TextArea/TextArea";

import DefaultImage from './assets/images/addUser.svg';

import moment from 'moment';

import {styles} from './styles';


const dateFormat = 'YYYY-MM-DD';

class EditProfile extends Component {
    constructor(props) {
        super(props);

        let {objectId, email, firstName, lastName, location, phone, school, dateBirth, userType, descr, Image, Country, Accent, Age, Grade, ReadingLevel, gender} = props.user;
        if (dateBirth) dateBirth = moment(dateBirth.iso).format(dateFormat);
        this.state = {
            userData: {
                objectId,
                email,
                firstName,
                lastName,
                location,
                phone,
                school,
                gender,
                dateBirth,
                userType,
                descr: descr || '',
                Accent: Accent || '',
                Country: Country || '',
                Age: Age || '',
                Grade: Grade || '',
                ReadingLevel: ReadingLevel || '',
            },
            Image,
            showPassword: '',
            passwordError: null,
            tempImage: null,
            errors: {},
            errorsMsg: null,
            age: '',
            grade: '',
            notifications: true,
            product: false,
            news: false,
            research: false,
            allSettingsButton: 'disabled',
            photoChange: 'disabled',
            passwordChange: 'disabled',
        };
    }

    handleChange = type => e => {
        if (this.props.error) this.props.clearError();
        if (this.props.alert) this.props.clearAlert();
        this.setState({
            errors: {},
            errorsMsg: null,
            userData: Object.assign({}, this.state.userData, {[type]: e.target.value})
        });
        if (type === 'password' && e.target.value.length > 4) this.setState({passwordChange: 'changed'});
        else this.setState({passwordChange: 'disabled'});

        if (e.target.value.length || e.target.value.length === 0) {
            this.setState({allSettingsButton: 'changed'})
        } else {
            this.setState({allSettingsButton: 'disabled'})
        }
    };
    savePassword = () => {
        if (this.state.userData.password &&
            this.state.userData.password.length > 0 &&
            this.state.userData.password.length < 5) {
            this.setState({
                passwordError: 'Must be at least 5 characters'
            });
            return null
        }
        this.props.changePassword(this.state.userData.password)
    };

    handleUploadImage = () => e => {
        let file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const tempImage = reader.result;
            this.setState({tempImage})
        }, false);
        reader.readAsDataURL(file);
        this.setState({photoChange: 'changed'})
    };

    changeImage = () => {
        this.props.changeImage(this.state.tempImage)
    };


    handleDeleteImage = () => {
        this.setState({tempImage: 'deleteUserImage'});
    };

    handleUndoImage = () => {
        this.setState({tempImage: null})
    };

    handleSubmit = e => {
        e.preventDefault();
        let errors = {};
        let userData = this.state.userData;
        let Image = this.state.Image;
        this.setState({errors, errorsMsg: null});
        if (this.props.user.userType === 'teacher') {
            for (let v in userData) {
                if ((v === 'email' || v === 'firstName' || v === 'lastName' || v === 'password') && userData[v] === '') {
                    errors = Object.assign({}, errors, {[v]: true});
                    this.setState({errors, errorsMsg: 'This fields are required!'})
                }
            }
        } else {
            for (let v in userData) {
                if ((v === 'email' || v === 'password') && userData[v] === '') {
                    errors = Object.assign({}, errors, {[v]: true});
                    this.setState({errors, errorsMsg: 'This fields are required!'})
                }
            }
        }


        if (userData.password && userData.password.length > 0 && userData.password.length < 5) {
            this.setState({
                passwordError: 'Must be at least 5 characters'
            });
            return null
        }

        if (Object.keys(errors).length > 0) return null;

        if (this.state.tempImage) Image = this.state.tempImage;

        this.props.updateProfile(userData, Image);
    };

    handleChangeSelect = (options) => event => {
        const item = options.find(o => o.id === event.target.value);
        this.setState({
            userData: Object.assign({}, this.state.userData, {[event.target.name]: {objectId: item.id}}),
            allSettingsButton: 'changed'
        });
    };

    handleChangeSelectValue = event => {
        this.setState({
            userData: Object.assign({}, this.state.userData, {[event.target.name]: event.target.value}),
            allSettingsButton: 'changed'
        });
    };

    handleChangeCheckBox = name => event => {
        this.setState({[name]: event.target.checked});
    };

    changeNumber = (name) => (e) => {
        let text = e.target.value;
        let number = '';
        if (text.length === 0) return this.setState({userData: Object.assign({}, this.state.userData, {[name]: text})});
        if (text.length < 10)
            number = text.replace(/-/g, '').match(/.{1,3}/g).join('-');
        else {
            number = text
        }
        this.setState({userData: Object.assign({}, this.state.userData, {[name]: number})});
        if (text.length) this.setState({allSettingsButton: 'changed'})
    };


    render() {
        const {classes, user, error, alert, country, accent, age, grade, readingLevel} = this.props;
        const {userData, Image, tempImage} = this.state;
        const isUserImageUrl = !!(Image && typeof Image.url === 'string');
        const userImageSrc = (tempImage !== 'deleteUserImage' && tempImage) || (tempImage !== 'deleteUserImage' && userData && Image && Image.url) || DefaultImage;
        const userType = this.props.user.userType;
        return (
            <div className={classes.editWrap}>
                <form className={classes.editCard} onSubmit={this.handleSubmit}>
                    <Grid container className={classes.root} spacing={16} alignItems='center' justify='center'>
                        <Grid item xs={12} sm={12} md={5} lg={3}>
                            <Typography variant="title" component="h3" className={classes.title}>
                                Edit profile
                            </Typography>

                            <FormControl className={classes.formControl}
                                         error={userType === 'teacher' && this.state.errors.firstName && true}
                                         aria-describedby="name-error-text">
                                <InputLabel className={classes.inputLabelReg} htmlFor="name">First Name</InputLabel>
                                <Input id="name-error-firsName" value={userData.firstName}
                                       onChange={this.handleChange('firstName')}/>
                                {userType === 'teacher' && this.state.errors.firstName &&
                                <FormHelperText className={classes.formHelperText}
                                                id="name-error-text">{this.state.errorsMsg}</FormHelperText>}
                            </FormControl>

                            <FormControl className={classes.formControl}
                                         error={userType === 'teacher' && this.state.errors.lastName && true}
                                         aria-describedby="name-error-text">
                                <InputLabel className={classes.inputLabelReg} htmlFor="name">Last Name</InputLabel>
                                <Input id="name-error-lastName" value={userData.lastName}
                                       onChange={this.handleChange('lastName')}/>
                                {userType === 'teacher' && this.state.errors.lastName &&
                                <FormHelperText className={classes.formHelperText}
                                                id="name-error-text">{this.state.errorsMsg}</FormHelperText>}
                                {userType === 'teacher' && userType === 'admin' &&
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControl className={classes.formControlGender}>
                                        <InputLabel htmlFor="readingLevel-simple">Gender</InputLabel>
                                        <Select
                                            value={this.state.userData.gender || ''}
                                            onChange={this.handleChangeSelectValue}
                                            className={classes.formSelectOdd}
                                            inputProps={{
                                                name: 'gender',
                                                id: 'gender-simple',
                                            }}>
                                            <MenuItem className={classes.menuItemStyle} value="FEMALE">
                                                Female
                                            </MenuItem>
                                            <MenuItem className={classes.menuItemStyle} value="MALE">
                                                Male
                                            </MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                }
                            </FormControl>


                            <Grid container className={classes.root} spacing={0} alignItems='center' justify='center'>
                                {userType !== "teacher" && userType !== "admin" &&
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="age-simple">Age</InputLabel>
                                        <Select
                                            value={this.state.userData.Age && this.state.userData.Age.objectId}
                                            onChange={this.handleChangeSelect(age)}
                                            className={classes.formSelectOdd}
                                            inputProps={{
                                                name: 'Age',
                                                id: 'age-simple',
                                            }}
                                        >{age.map(item =>
                                            <MenuItem className={classes.menuItemStyle} value={item.id}
                                                      key={item.id}>
                                                {item.label}
                                            </MenuItem>
                                        )}
                                        </Select>
                                    </FormControl>
                                </Grid>}

                                <Grid item xs={12} sm={12} md={userType !== "teacher" && userType !== "admin" ? 6 : 12}
                                      lg={userType !== "teacher" && userType !== "admin" ? 6 : 12}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="readingLevel-simple">Gender</InputLabel>
                                        <Select
                                            value={this.state.userData.gender || ''}
                                            onChange={this.handleChangeSelectValue}
                                            className={classes.formSelectOdd}
                                            inputProps={{
                                                name: 'gender',
                                                id: 'gender-simple',
                                            }}>
                                            <MenuItem className={classes.menuItemStyle} value="FEMALE">
                                                Female
                                            </MenuItem>
                                            <MenuItem className={classes.menuItemStyle} value="MALE">
                                                Male
                                            </MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                {userType !== "teacher" && userType !== "admin" &&
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="grade-simple">Grade</InputLabel>
                                        <Select
                                            value={this.state.userData.Grade && this.state.userData.Grade.objectId}
                                            onChange={this.handleChangeSelect(grade)}
                                            className={classes.formSelectEven}
                                            inputProps={{
                                                name: 'Grade',
                                                id: 'grade-simple',
                                            }}
                                        >{grade.map(item =>
                                            <MenuItem className={classes.menuItemStyle} value={item.id}
                                                      key={item.id}>
                                                {item.label}
                                            </MenuItem>
                                        )}
                                        </Select>
                                    </FormControl>
                                </Grid>}


                                {userType !== "teacher" && userType !== "admin" &&
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="reading-simple">Reading Level</InputLabel>
                                        <Select
                                            value={this.state.userData.ReadingLevel && this.state.userData.ReadingLevel.objectId || ''}
                                            onChange={this.handleChangeSelect(readingLevel)}
                                            className={classes.formSelectEven}
                                            inputProps={{
                                                name: 'ReadingLevel',
                                                id: 'reading-simple',
                                            }}
                                        >{readingLevel.map(item =>
                                            <MenuItem className={classes.menuItemStyle} value={item.id}
                                                      key={item.id}>
                                                {item.label}
                                            </MenuItem>
                                        )}
                                        </Select>
                                    </FormControl>
                                </Grid>}

                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="country-simple"
                                                    className={classes.formControlLabel}>Country</InputLabel>
                                        <Select
                                            value={this.state.userData.Country && this.state.userData.Country.objectId}
                                            onChange={this.handleChangeSelect(country)}
                                            className={classes.formSelectOdd}
                                            inputProps={{
                                                name: 'Country',
                                                id: 'country-simple',
                                            }}
                                        >{country.map(item =>
                                            <MenuItem className={classes.menuItemStyle} value={item.id}
                                                      key={item.id}>
                                                {item.label}
                                            </MenuItem>
                                        )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="accent-simple"
                                                    className={classes.formControlLabel}>Accent</InputLabel>
                                        <Select
                                            value={this.state.userData.Accent && this.state.userData.Accent.objectId}
                                            onChange={this.handleChangeSelect(accent)}
                                            className={classes.formSelectEven}
                                            inputProps={{
                                                name: 'Accent',
                                                id: 'accent-simple',
                                            }}
                                        >{accent.map(item =>
                                            <MenuItem
                                                className={classes.menuItemStyle}
                                                value={item.id}
                                                key={item.id}>
                                                {item.label}
                                            </MenuItem>
                                        )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>


                            {/*<TextField*/}
                            {/*id="descr"*/}
                            {/*className={classes.textField}*/}
                            {/*value={userData.descr}*/}
                            {/*label="Description"*/}
                            {/*onChange={this.handleChange('descr')}*/}
                            {/*margin="normal"*/}
                            {/*placeholder="Enter a short bio about you"*/}
                            {/*InputProps={{classes: {input: this.props.classes['input']}}}*/}
                            {/*multiline*/}
                            {/*rowsMax={5}*/}
                            {/*/>*/}
                            <TextArea
                                id="descr"
                                label="Description"
                                max={250}
                                placeholder="Enter a short bio about you"
                                onChange={this.handleChange('descr')}
                                value={userData.descr}
                                rowsMax={4}
                            />


                            <figure className={classes.userPhoto}>
                                <div>
                                    <input
                                        className={classes.uploadHidden}
                                        accept="image/*"
                                        id='Image'
                                        type="file"
                                        onChange={this.handleUploadImage()}
                                    />
                                    <div>
                                        {/*{isUserImageUrl && <Tooltip title="Delete photo" placement="bottom">*/}
                                        {/*<IconButton className={classes.deleteIcon} color="secondary" onClick={this.handleDeleteImage}>*/}
                                        {/*<Icon>delete_icon</Icon>*/}
                                        {/*</IconButton>*/}
                                        {/*</Tooltip>}*/}
                                        {/*{tempImage && <Tooltip title="Undo photo changes" placement="bottom">*/}
                                        {/*<IconButton className={classes.deleteIcon} color="primary" onClick={this.handleUndoImage}>*/}
                                        {/*<Icon>undo</Icon>*/}
                                        {/*</IconButton>*/}
                                        {/*</Tooltip>}*/}
                                        <label htmlFor='Image'>
                                            <Tooltip title="Add new photo" placement="bottom">
                                                <img className={classes.userPhotoItem} src={userImageSrc}
                                                     alt={`${userData.firstName} ${userData.lastName}`}/>
                                            </Tooltip>
                                        </label>
                                    </div>
                                </div>
                                <Button color='secondary' variant='contained' onClick={this.changeImage}
                                        disabled={this.state.photoChange === 'disabled'}
                                        className={classes.inputButton}>
                                    Change
                                </Button>
                            </figure>

                            <Typography variant="title" component="h3" className={classes.title}>
                                Account
                            </Typography>
                            <FormControl className={classes.formControl}
                                         error={this.state.errors.email && true || this.props.error && true}
                                         aria-describedby="name-error-text">
                                <InputLabel className={classes.inputLabelReg} required htmlFor="name">Email
                                    Address</InputLabel>
                                <Input id="name-error-Email" value={userData.email}
                                       onChange={this.handleChange('email')}/>
                                {this.state.errors.email && <FormHelperText className={classes.formHelperText}
                                                                            id="name-error-text">{this.state.errorsMsg}</FormHelperText>}
                                {this.props.error && <FormHelperText className={classes.formHelperText}
                                                                     id="name-error-text">{this.props.error}</FormHelperText>}
                            </FormControl>

                            {/*<TextField*/}
                            {/*id="dateBirth"*/}
                            {/*type="date"*/}
                            {/*onChange={this.handleChange('dateBirth')}*/}
                            {/*value={userData.dateBirth || moment().format(dateFormat)}*/}
                            {/*className={classes.textField}*/}
                            {/*/>*/}

                            <TextField
                                id="phone"
                                className={classes.textField}
                                label="Phone Number"
                                value={userData.phone}
                                onChange={this.changeNumber('phone')}
                                margin="normal"
                                type='tel'
                                inputProps={{
                                    maxLength: '11',
                                    classes: {input: this.props.classes['inputPhone']}
                                }}
                            />
                            {user.userType === 'student' && <div>
                                <TextField
                                    id="location"
                                    className={classes.textField}
                                    label="Location"
                                    value={userData.location}
                                    onChange={this.handleChange('location')}
                                    margin="normal"
                                />
                            </div>}
                            <TextField
                                id="school"
                                className={classes.textField}
                                label="School"
                                value={userData.school}
                                onChange={this.handleChange('school')}
                                margin="normal"
                            />

                            <FormControl className={classes.formControl}
                                         error={this.state.errors.password && true || typeof this.state.passwordError === 'string'}
                                         aria-describedby="name-error-text">
                                <InputLabel className={classes.inputLabelReg} htmlFor="Password">Password</InputLabel>
                                <Input id="adornment-password"
                                       inputProps={{maxLength: '15', autoComplete: "new-password"}}
                                       value={this.state.password}
                                       type='password'
                                       onChange={this.handleChange('password')}
                                       endAdornment={
                                           <InputAdornment position="end" className={classes.inputWrap}>
                                               <Button color='secondary' variant='contained' onClick={this.savePassword}
                                                       disabled={this.state.passwordChange === 'disabled'}
                                                       className={classes.inputButton}>
                                                   Change
                                               </Button>
                                           </InputAdornment>
                                       }
                                />
                                {this.state.errors.password && <FormHelperText className={classes.formHelperText}
                                                                               id="name-error-text">{this.state.errorsMsg}</FormHelperText>}
                                {typeof this.state.passwordError === 'string' &&
                                <FormHelperText className={classes.formHelperText}
                                                id="name-error-text">{this.state.passwordError}</FormHelperText>}
                            </FormControl>

                            <Typography variant="title" component="h3" className={classes.title}>
                                Notifications
                            </Typography>

                            <FormGroup>
                                <FormControlLabel
                                    className={classes.formControlLabel}
                                    control={
                                        <Checkbox
                                            color='primary'
                                            checked={this.state.notifications}
                                            onChange={this.handleChangeCheckBox('notifications')}
                                            value="notifications"/>
                                    }
                                    label="Send me email notifications"
                                />
                            </FormGroup>

                        </Grid>
                    </Grid>
                    <div className={classes.buttonWrapper}>
                        <Grid container className={classes.root} spacing={16} alignItems='center' justify='center'>
                            <Grid item xs={6} sm={6} md={2} lg={2} className={classes.rootAlign}>
                                <Button onClick={this.props.goBack} color='default' variant='contained'
                                        className={classes.button}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3}
                                  className={classNames(classes.rootAlign, classes.buttonAlign)}>
                                {alert &&
                                <div className={classes.tooltip}>
                                    <Typography variant="body1">Settings Saved!</Typography>
                                </div>
                                }
                                <Button type='submit' color='primary'
                                        disabled={this.state.allSettingsButton === 'disabled' || alert}
                                        variant='contained' className={classes.button}>
                                    Save Settings
                                </Button>
                            </Grid>
                        </Grid>
                    </div>

                </form>

            </div>
        )
    }
}

export default withStyles(styles)(EditProfile)