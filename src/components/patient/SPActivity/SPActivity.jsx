/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SPActivity.module.css';
import { Button, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createActivitySession, setActivity } from '@actions/activity';
import { setFullScreen, setModal, setNotification } from '@actions/ui';
import { getFormattedDate } from '@utils/date&time';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class SPActivity extends Component {
    render() {
        const { activity, id } = this.props;
        if (this.state.session) {
            const path = `/paciente/${id}/actividades/${activity.id}` +
                          `/sesiones/${this.state.session.id}`;
            return <Redirect to={path} push />
        }

        const date = activity.date_from.split('T')[0];
        const { logo_path } = activity.Activity;

        return(
            <div className={`flex ${styles.container}`}>
                <img 
                    alt=''
                    className={styles.gameImage}
                    src={SERVER_URL + logo_path} />
                <div className={styles.gameContainer}>
                    <div className='flex'>
                        <p className={styles.gameTitle}>
                            { activity.Activity.name }
                        </p>
                        <p style={{ fontWeight: 600, marginBottom: 0 }}>
                            { this.getFormattedDate(date) }
                        </p>
                    </div>
                    {activity.Syntactic_Structure && <p style={{ fontWeight: 600 }}>
                        {activity.Syntactic_Structure.name}
                    </p>}
                    <p className={styles.gameDescription}>
                        { activity.Activity.description }
                    </p>

                    <div className={`flex ${styles.btnContainer}`}>
                        <Button 
                            className={`simple-btn ${styles.btn}`}
                            onClick={this.onTutorialClicked}>
                            Tutorial
                        </Button>
                        <Button 
                            className={`${styles.btn} pdf-btn`}
                            onClick={this.onPlayClicked}>
                            { 
                                this.state.loading ? 
                                <Spinner color='light' size='sm' />
                                :
                                <span>Jugar</span>
                            }
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { 
          loading: false,
          session: null, 
        };

        this.onPlayClicked = this.onPlayClicked.bind(this);
        this.onTutorialClicked = this.onTutorialClicked.bind(this);
    }

    /** Métodos extra */
    getFormattedDate = (date) => {
        return getFormattedDate(date);
    }

    async onPlayClicked() {
        this.setState({ loading: true });
        /** Crear una nueva sesión de juego */
        const { activity } = this.props;
        const response = await this.props.createActivitySession(activity.id);
        const { data, error, message } = response;

        this.setState({ loading: false });
        if (error)
            this.props.setNotification({ error, message, slide: true });
        else {
            this.setState({ session: data }, () => {
                this.props.setActivity(activity);
                this.props.setFullScreen(true);
            });
        }
    }

    onTutorialClicked() {
        const { tutorial_path } = this.props.activity.Mechanic;
        const modal = {
            title: 'Video tutorial',
            type: 'video',
            videoUrl: tutorial_path
        }
        this.props.setModal(modal);
    }
}

/** Elementos del store */
const mapActionsToProps = {
    createActivitySession,
    setActivity,
    setFullScreen,
    setModal,
    setNotification,
};

export default connect(
    null,
    mapActionsToProps
)(SPActivity);