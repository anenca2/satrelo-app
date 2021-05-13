/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STPatient.module.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { createPatient, removePatient } from '@actions/patient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { getFormattedDate } from '@utils/date&time';

const serverURL = process.env.REACT_APP_SERVER_URL;

class STPatient extends Component {
    render() {
        const { userId, patient } = this.props;
        const { id } = patient;

        return(
            <div className={styles.container}>
                <Link
                    className={`ghost-btn ${styles.link}`}
                    to={`/terapeuta/${userId}/pacientes/${id}/actividades`}>
                    <div className={`flex ${styles.height} ${styles.padding}`}>
                        <div className='flex'>
                            {
                                patient.profile_img ?
                                <img
                                    alt=''
                                    className={styles.uimage}
                                    src={`${serverURL}${patient.profile_img}`} />
                                :
                                <div
                                    className={`flex ${styles.uimage} ${styles.thumb}`}
                                    style={{ backgroundColor: patient.color}}>
                                    { patient.thumbnail_alias }
                                </div>
                            }
                            <div className={styles.padding}>
                                <div className={styles.uname}>
                                    { patient.name }&nbsp; 
                                    { patient.last_name }
                                </div>
                                <div className={styles.uinfo}>
                                    Paciente desde el {this.getFormattedDate(patient.createdAt)}
                                </div>
                            </div>
                        </div>
                        <Button 
                            className={`ghost-btn ${this.state.check}`}
                            onClick={this.onAssignPatientClicked}>
                            <FontAwesomeIcon 
                                icon={faCheckCircle} 
                                size='2x' />
                        </Button>
                    </div>
                </Link>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { check: styles.btn };
        this.onAssignPatientClicked = this.onAssignPatientClicked.bind(this);
    }

    componentDidMount() {
        this.setCheck();
    }

    componentDidUpdate() {
        this.setCheck();
    }

    /** Métodos */
    checkTherapist(userId, patient) {
        /** 
         * Verificar si el terapeuta asignado es el mismo terapeuta
         * logueado 
         */
        if (patient.Therapists) {
            if (patient.Therapists[userId])
                return true;
        }
        else if (patient.Therapists_Patients) {
            if (userId === patient.Therapists_Patients.id_therapist)
                return true;
        }

        return false;
    }

    getFormattedDate = (date) => {
        return getFormattedDate(date);
    }

    async onAssignPatientClicked(e) {
        e.stopPropagation();
        e.preventDefault();
        const { userId, patient } = this.props;
        if (this.checkTherapist(userId, patient))
            await this.props.removePatient(userId, patient.id);
        else
            await this.props.createPatient(userId, patient.id);
    }

    setCheck() {
        const { userId, patient } = this.props;
        const check = this.checkTherapist(userId, patient) ?
                      styles.btnActive : styles.btn;

        if (check !== this.state.check)
            this.setState({ check });
    }
}

/** Elementos del store */
const mapActionsToProps = {
    createPatient,
    removePatient,
}

export default connect(
    null,
    mapActionsToProps
)(STPatient);