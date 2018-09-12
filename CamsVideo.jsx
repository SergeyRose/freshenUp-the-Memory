import React, {Component} from 'react';
import {Dialog, FloatingActionButton, FontIcon, GridList, Subheader, GridTile, IconButton} from 'material-ui';
import {pinkA200} from "material-ui/styles/colors";
import {Sip as sipModel} from "../utils/Models";
import Sip from "../utils/sip";
import HeaderControls from "../actions/HeaderControls";

const styles = {};

const dummyParseObj = {
    get: () => {
    }
};

const sessionConfig = {
    sessionDescriptionHandlerOptions: {
        constraints: {
            audio: true,
            video: true,
        }
    }
};


export default class CamsVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            callUser: '',
            volume: true,
            mic: true,
            callStatus: props.session ? 'Invite' : 'Accept',
            video_on: true,
            sip: props.item.get('sip') + '',
        };

        this.timeInterval = null;
        this.monted = false;
        this.session = props.session;

        let query = sipModel.query();
        query.equalTo('sip', parseInt(props.sip));
        query.include('User');

        query.first()
            .then(data => {
                data = data || dummyParseObj;
                if (data.get('User') && this.monted)
                    this.setState({callUser: (data.get('User') || dummyParseObj).get('name')})
            })
            .catch(console.log)


    }

    componentDidMount() {
        const {sip, video_on} = this.state;
        this.monted = true;

        if (this.state.callStatus === 'Accept') {
            sessionConfig.sessionDescriptionHandlerOptions.constraints.video = video_on;
        }

        sessionConfig.sessionDescriptionHandlerOptions.constraints.video = video_on;

        if (!this.session) this.session = Sip.invite(sip, sessionConfig);

        this.session.on('terminated', data => {
            clearInterval(this.timeInterval);
            HeaderControls.setSipCall(null);
        });

        this.session.on('accepted', data => {
            HeaderControls.setSipCall(this.state.sip + '');
            let currentTime = 0;
            this.timeInterval = setInterval(() => {

                let el = document.getElementById(`call_time_${this.props.sip}`);
                if (el) {
                    currentTime++;

                    let m = Math.floor(currentTime / 60);
                    let s = currentTime % 60;
                    el.innerHTML = `${('00' + m).slice(-2)}:${('00' + s).slice(-2)}`;
                }
            }, 1000);
        });

        this.session.on('trackAdded', track => {
            setTimeout(() => {
                // We need to check the peer connection to determine which track was added
                const remoteVideo = document.getElementById(`video_call_${this.state.sip}`);

                const pc = this.session.sessionDescriptionHandler.peerConnection;

                // Gets remote tracks
                let remoteStream = new MediaStream();
                let isRemote = false;
                pc.getReceivers().forEach(function (receiver) {
                    console.log('trackAdded receiver', receiver);
                    remoteStream.addTrack(receiver.track);
                    isRemote = true;
                });

                if (isRemote) {
                    remoteVideo.srcObject = remoteStream;
                    remoteVideo.onloadedmetadata = (data) => {
                        console.log('play', data);
                        remoteVideo.play();
                    };
                }
            }, 1000);
        });
    }

    // /** Закрыть окно и завершить просмотр камеры */
    // handleClose = () => {
    //     this.setState({});
    //     this.session.bye();
    //     return this.props.onClose();
    // };

    render() {
        return (
            <div>
                <video id={`video_call_${this.state.sip}`} width={'100%'}
                       style={{display: "block", margin: 0}} muted={!this.state.volume}/>
            </div>
        )
    }
};