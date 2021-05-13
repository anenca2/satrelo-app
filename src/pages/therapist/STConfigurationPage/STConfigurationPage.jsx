/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STConfigurationPage.module.css';
import { Button, Spinner } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createActivity } from '@actions/activity';
import {
    buildConfiguration,
    resetConfiguration
} from '@actions/configuration';
import { getPatient } from '@actions/patient';
import { setNotification } from '@actions/ui';

import STDynamic from '@components/therapist/STDynamic';
import STLayout from '@components/layout/STLayout';
import STStatic from '@components/therapist/STStatic';

class STConfigurationPage extends Component {
    render() {
        if (this.state.redirect) {
            const { tid, pid } = this.props.match.params;
            const url = `/terapeuta/${tid}/pacientes/${pid}/actividades`;
            return <Redirect to={url} push />
        }

        /** Definir las clases para los botones */
        const buttonStatic = `primary-btn-outline left ${styles.btn} 
                                ${this.state.option === 'static' ?
                                styles.btnSelected : ''}`;

        const buttonDynamic = `primary-btn-outline ${styles.btn} 
                                ${this.state.option === 'dynamic' ? 
                                styles.btnSelected : ''}`;

        return(
            <STLayout pt={50}>
                <div className={styles.title}>
                    Configurar una nueva actividad
                </div>
                <div className={`flex ${styles.btnContainer}`}>
                    <Button
                        className={buttonStatic}
                        color='primary'
                        name='static'
                        onClick={this.onOptionClicked}
                        outline>
                        Descripción estática
                    </Button>
                    <Button
                        className={buttonDynamic}
                        color='primary'
                        name='dynamic'
                        onClick={this.onOptionClicked}
                        outline>
                        Descripción dinámica
                    </Button>
                </div>
                <div className={styles.container}>
                    {
                        this.state.option === 'static' ?
                        <STStatic />
                        :
                        <STDynamic />
                    }
                </div>
                {
                    this.props.ui.showCreateActivityButton ?
                    <div className={styles.createContainer}>
                        <Button 
                            className={`secondary-btn ${styles.create}`}
                            onClick={this.onCreateActivityClicked}>
                            {
                                this.state.loading ?
                                <Spinner color='dark' size='sm' />
                                :
                                <span>Crear actividad</span>
                            }
                        </Button>
                    </div> : null
                }
            </STLayout>
        );
    }

    constructor(props) {
        super(props);
        this.state = { 
          loading: false, 
          option: 'static',
          patient: null, 
          redirect: false 
        };
        this.onCreateActivityClicked = this.onCreateActivityClicked.bind(this);
        this.onOptionClicked = this.onOptionClicked.bind(this);
    }

    async componentDidMount() {
        if (this.props.patient === null) {
            const { pid } = this.props.match.params;
            await this.props.getPatient(pid);
        }
        this.setState({ patient: this.props.patient });
    }

    componentWillUnmount() {
        this.props.resetConfiguration();
    }

    /** Métodos */
    async prepareAndCreateActivity() {
        this.setState({ loading: true });

        const fields = this.state.option === 'static' ?
                       this.props.static : this.props.dynamic;

        /** Resetear cualquier configuración previa */
        this.props.resetConfiguration();
        /** Construir la configuración */
        const configuration = this.props.buildConfiguration(
            { fields }, this.state.patient
        );

        /** Crear la actividad */
        const response = await this.props.createActivity(configuration);
        const { error, message } = response;

        this.setState({ loading: false, redirect: true });        
        this.props.setNotification({ error, message, slide: true });
    }

    onCreateActivityClicked() {
        if (!this.state.loading)
            this.prepareAndCreateActivity();
    }

    onOptionClicked(e) {
        this.setState({ option: e.target.name });
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        dynamic: state.dynamic,
        patient: state.patient.patient,
        static: state.static,
        ui: state.ui
    };
}

const mapActionsToProps = {
    buildConfiguration,
    createActivity,
    getPatient,
    resetConfiguration,
    setNotification,
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(STConfigurationPage);