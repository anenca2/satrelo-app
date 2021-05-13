/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SPPlayPage.module.css';
import { connect } from 'react-redux';
import SFullScreen from '@components/shared/SFullScreen';
import { getActivity, updateActivitySession } from '@actions/activity';
import { setFullScreen, setModal, showAvatar } from '@actions/ui';
import { getUser } from '@actions/user';

const FILE_SERVER_URL = process.env.REACT_APP_FILE_SERVER;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class SPPlayPage extends Component { 
    render() {        
        const { activity, user } = this.props;
        let gamePath = null;
        if (activity && user) {
            const { sid } = this.props.match.params;
            const { build_path } = activity;
            gamePath = `${FILE_SERVER_URL}/${build_path}/index.html` +
                        `?portal=paciente` +
                        `&session=${sid}` +
                        `&score=${user.score}` +
                        `&token=${this.props.auth.pacienteToken}` +
                        `&file_server=${FILE_SERVER_URL}` + 
                        `&server=${SERVER_URL}`;
            
            // Agregar al path el avatar asociado al terapeuta
            if (user.Therapists) {
                const therapists = Object.values(user.Therapists);
                if (therapists.length > 0) {
                    const avatarURL = therapists[0].Avatar_Variation.img_path;
                    gamePath += `&avatar=${avatarURL}`;
                }
            }
        }

        return(
            <SFullScreen
                fullScreen={this.props.ui.fullScreen}
                onClosed={this.onClosed}
                onChange={this.onChange}>
                <div className={`flex ${styles.container}`}> 
                    <iframe 
                        height={window.outerHeight}
                        src={gamePath}
                        title='game'
                        width={window.outerWidth}></iframe>
                </div>
            </SFullScreen>
        );
    }

    constructor(props) {
        super(props);
        this.onClosed = this.onClosed.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if (!this.props.ui.fullScreen) this.redirectBack();

        this.hideAvatar();
        if (this.props.activity === null) {
            const { aid } = this.props.match.params
            this.props.getActivity(aid);
        }
    }

    componentDidUpdate() {
        this.hideAvatar();
    }

    componentWillUnmount() {
        this.props.showAvatar(true);

        /** Guardar fecha y hora de finalización de la sesión */
        const { sid } = this.props.match.params;
        const session = { date_end: new Date(), id: sid };
        this.props.updateActivitySession(session);
        
        /** Abrir modal para enviar un comentario */
        const modal = {
          title: 'Comenta sobre el desempeño del paciente en el juego',
          type: 'new_comment',
          session: sid
        };
        this.props.setModal(modal);

        /** Actualizar el usuario para ver reflejado el cambio del puntaje */
        const { user } = this.props;
        this.props.getUser(user.id);
    }

    /** Métodos extra */
    hideAvatar() {
        if (this.props.ui.showAvatar)
            this.props.showAvatar(false);
    }

    onClosed() {
        this.redirectBack();
    }

    onChange(fullScreen) {
        if (!fullScreen) this.redirectBack();
    }

    redirectBack() {
        this.props.history.goBack();
    }
}

/** Elementos del store */
const mapActionsToProps = {
    getActivity,
    getUser,
    setFullScreen,
    setModal,
    showAvatar,
    updateActivitySession,
}

const mapStateToProps = (state) => {
    return {
        activity: state.activity.activity,
        auth: state.auth,
        ui: state.ui,
        user: state.user.user,
    };
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SPPlayPage);