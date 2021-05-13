/**
 * @author Martin Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STActivityButtons.module.css';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import  { removeActivity, updateActivity } from '@actions/activity';
import { setModal, setNotification } from '@actions/ui';

const serverURL = process.env.REACT_APP_SERVER_URL;

class STActivityButtons extends Component {
    render() {
        const { Activities_Sessions } = this.props.activity;
        const sessions = Object.values(Activities_Sessions);

        return(
            <div className={`flex ${styles.container}`}>
                <Button
                    className={`pdf-btn ${styles.btn}`}
                    onClick={this.onPDFClicked}
                    size='sm'>
                    PDF Ficha
                </Button>
                <div className='flex'>
                    <Button 
                        className={`ghost-btn ${styles.comments} ${styles.mr}`}
                        onClick={this.onCommentsClicked}
                        size='sm'>
                        <FontAwesomeIcon 
                            icon={faCommentAlt} size='2x' />
                    </Button>
                    <Button
                        className={`simple-btn ${styles.btn} ${styles.ml}`}
                        onClick={this.onTutorialClicked}
                        size='sm'>
                        Tutorial
                    </Button>
                    <Button
                        className={`simple-btn ${styles.btn} ${styles.ml}`}
                        onClick={this.onReassignClicked}
                        size='sm'>
                        Reasignar
                    </Button>
                    {sessions.length === 0 && <Button
                        className={`ghost-btn ${styles.delete} ${styles.ml}`}
                        onClick={this.onDeleteClicked}
                        size='sm'>
                        <FontAwesomeIcon 
                            icon={faTimesCircle} size='2x' />
                    </Button>}
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.onCommentsClicked = this.onCommentsClicked.bind(this);
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
        this.onPDFClicked = this.onPDFClicked.bind(this);
        this.onReassignClicked = this.onReassignClicked.bind(this);
        this.onTutorialClicked = this.onTutorialClicked.bind(this);
    }

    /** Métodos extra */
    onCommentsClicked() {
        const modal = {
            title: 'Comentarios',
            type: 'comments',
            data: this.props.activity.Activities_Sessions
        };
        this.props.setModal(modal);
    }

    async onDeleteClicked() {
        const { id } = this.props.activity;
        const response = await this.props.removeActivity(id);
        const { error, message } = response;
        this.props.setNotification({ error, message, slide: true });
    }

    onPDFClicked() {
        const { pdf_path } = this.props.activity.Mechanic;
        const file = `${serverURL}${pdf_path}`;
        window.open(file);
    }

    async onReassignClicked() {
        const { id } = this.props.activity;
        const today = new Date();
        let weekLater = new Date();
        weekLater.setDate(weekLater.getDate() + 7);
        const activityData = {
            id,
            date_from: today,
            date_to: weekLater
        };
        const response = await this.props.updateActivity(activityData);
        const { error, message } = response;
        this.props.setNotification({ error, message, slide: true });
    }

    onTutorialClicked() {
        const { tutorial_path } = this.props.activity.Mechanic;
        let modal = { 
            title: 'Video tutorial', 
            type: 'video',
            videoUrl: tutorial_path,
        }
        this.props.setModal(modal);
    }
}

/** Elementos del store */
const mapActionsToProps = {
    removeActivity,
    setModal,
    setNotification,
    updateActivity,
};

export default connect(
    null,
    mapActionsToProps
)(STActivityButtons);