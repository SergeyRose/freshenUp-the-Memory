// Модальное окно для просмотра видео

import React, {Component} from 'react';
import {Dialog, FloatingActionButton, FontIcon, GridList, Subheader, GridTile, IconButton,RaisedButton} from 'material-ui';
import {pinkA200} from "material-ui/styles/colors";
import {setVideoForConference} from '../actions/Cameras.js'
import CamsVideo from './CamsVideo.jsx'

const styles = {
    cancelBtn: {
        float: 'right',
        marginTop: -16,
        marginBottom: 8
    },
    gridList: {
        width: '100%',
        height: 'auto',
        overflowY: 'auto',
        margin: 0,
    },
    button:{
        color:'#fff'
    }
};

const initState = {
    rec: {}
};

export default class dlgVideocams extends Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    handleClose = () => {
        this.setState(initState);
        this.props.onClose();
    };

    handleRec = (id) => (e) => {
        this.setState({rec: Object.assign({}, this.state.rec, {[id]: !this.state.rec[id]})})
    };
    onСhoice = (sipId) => {
        setVideoForConference(this.props.currGroup, sipId);
    };

    render() {
        return (
            <Dialog
                contentStyle={{width: '100%'}}
                open={this.props.open}
                autoScrollBodyContent={true}
                bodyStyle={{minHeight: '500px'}}
            >
                <FloatingActionButton
                    backgroundColor="#757575"
                    mini
                    zDepth={0}
                    onTouchTap={this.handleClose}
                    style={styles.cancelBtn}
                >
                    <FontIcon className="material-icons">cancel</FontIcon>
                </FloatingActionButton>

                <GridList
                    cols={3}
                    cellHeight={150}
                    padding={10}
                    style={styles.gridList}
                >
                    <Subheader style={{fontSize: 24, paddingLeft: 5}}>{this.props.title || ''}</Subheader>
                    {this.props.videoParams.map((item) => (
                        <GridTile
                            key={item.id}
                            title={item.get('Camera').get('name')}
                            subtitle={<div><RaisedButton secondary={true} buttonStyle={styles.button}>Start Record</RaisedButton>
                                <RaisedButton primary={true} buttonStyle={styles.button}>Screenshot</RaisedButton></div>}
                            actionIcon={<IconButton style={{marginRight: 0}} onTouchTap={this.handleRec(item.id)}>
                                <FontIcon color={pinkA200} className="material-icons"
                                          style={{marginRight: 5}}
                                          onClick={() => this.onСhoice(item.id)}>
                                    {this.state.rec && this.state.rec[item.id] ? "radio_button_checked" : "radio_button_unchecked"}
                                </FontIcon>

                            </IconButton>}
                        >
                            <CamsVideo item={item}/>
                        </GridTile>
                    ))}
                </GridList>
            </Dialog>
        )
    }
};