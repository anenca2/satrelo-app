/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STActivitiesPage.module.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getActivities, setActivities } from '@actions/activity';
import { getPatient, setPatient } from '@actions/patient';

import SEmpty from '@components/shared/SEmpty';
import STActivity from '@components/therapist/STActivity';
import STLayout from '@components/layout/STLayout';
import SSpinner from '@components/shared/SSpinner';
import SUserHero from '@components/shared/SUserHero';

class STActivitiesPage extends Component {
    render() {
        let { activities, patient, user } = this.props;
        const id = user ? user.id : null;
        const pid = patient ? patient.id : null;

        activities = activities ? Object.values(activities) : [];
        
        /** Obtener ids del route path */
        const { tid } = this.props.match.params;

        return(
            <div className={styles.container}>
                <SUserHero user={patient} />
                <STLayout pt={0} mt={298}>
                    <div className={`flex ${styles.titleContainer}`}>
                        <div className={styles.title}>
                            Actividades asignadas
                        </div>
                        <div className={`flex ${styles.btnContainer}`}>
                            <Link
                                className={styles.link}
                                to={`/terapeuta/${tid}/pacientes/${pid}` +
                                    `/actividades/histórico`}>
                                <Button 
                                    className={`primary-btn left ${styles.btn}`}>
                                    Histórico
                                </Button>
                            </Link>
                            {
                                this.state.createActivityEnabled ? 
                                <Link
                                    className={styles.link}
                                    to={`/terapeuta/${id}/pacientes/${pid}/configuracion`}>
                                    <Button className={`secondary-btn ${styles.btn}`}>
                                        Agregar actividad
                                    </Button>
                                </Link>
                                :
                                <Button 
                                    className={`secondary-btn ${styles.btn} ${styles.btnDisabled}`} 
                                    disabled>
                                    Agregar actividad
                                </Button>
                            }
                        </div>
                    </div>
                    <div className={styles.listContainer}>
                        {
                            this.state.loading ?
                            <SSpinner color='primary' />
                            :
                            activities && activities.length > 0 ?
                            activities.map((activity) => {
                                return(
                                    <STActivity
                                        activity={activity} 
                                        key={activity.id}
                                        pid={pid}
                                        tid={tid} />
                                );
                            })
                            :
                            <SEmpty>
                                Este paciente aún no tiene actividades asignadas.
                                Recuerda que puedes asignarle una actividad
                                seleccionando la opción Agregar actividad.
                            </SEmpty>
                        }
                    </div>
                </STLayout>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { createActivityEnabled: false, loading: false };
    }

    async componentDidMount() {
        const { pid } = this.props.match.params;
        /** Obtener las actividades del paciente */
        this.setState({ loading: true });
        await this.props.getActivities(pid);     
        this.setState({ loading: false });
        
        /** Obtener la información del paciente */
        await this.props.getPatient(pid);
        this.setState({ createActivityEnabled: true });
    }

    componentWillUnmount() {
        this.props.setActivities(null);
        this.props.setPatient(null);
        this.setState({ createActivityEnabled: false });
    }
}

/** Funciones para el store */
const mapStateToProps = (state) => {
    return {
        activities: state.activity.activities,
        patient: state.patient.patient,
        user: state.user.user,
    };
}

const mapActionsToProps = {
    getActivities,
    getPatient,
    setActivities,
    setPatient
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(STActivitiesPage);