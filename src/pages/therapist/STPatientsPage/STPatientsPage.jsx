/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STPatientsPage.module.css';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getPatients, setPatients } from '@actions/patient';

import SEmpty from '@components/shared/SEmpty';
import SSearch from '@components/shared/SSearch';
import SSpinner from '@components/shared/SSpinner';
import STLayout from '@components/layout/STLayout';
import STPatient from '@components/therapist/STPatient';

class STPatientsPage extends Component {
    render() {
        /** Definir las clases para los botones */
        const buttonMy = `primary-btn-outline left ${styles.btn} 
                            ${this.state.option === 'my' ? 
                            styles.btnSelected : ''}`;

        const buttonAll = `primary-btn-outline ${styles.btn} 
                            ${this.state.option === 'all' ?
                            styles.btnSelected : ''}`;

        let { patients } = this.props;
        patients = patients ? Object.values(this.props.patients) : [];

        return(
            <STLayout pt={50}>
                <div className={styles.title}>Pacientes</div>
                <div className={`flex ${styles.searchContainer}`}>
                    <div className={`flex ${styles.btnContainer}`}>
                        <Button
                            className={buttonMy}
                            name='my'
                            onClick={this.onOptionSelected}
                            outline>
                            Mis pacientes
                        </Button>
                        <Button
                            className={buttonAll}
                            name='all'
                            onClick={this.onOptionSelected}
                            outline>
                            Todos los pacientes
                        </Button>
                    </div>
                    <SSearch 
                        patients={this.state.option}
                        userId={this.state.userId} />
                </div>
                <div className={styles.listContainer}>
                    {
                        this.state.loading ?
                        <SSpinner color='primary' />
                        :
                        patients && patients.length > 0 ?
                        patients.map(patient => {
                            return(
                                <STPatient
                                    key={patient.id} 
                                    patient={patient}
                                    userId={this.state.userId} />
                            );
                        })
                        : 
                        <SEmpty>
                            No se encontraron pacientes. Recuerda que puedes
                            asignarte pacientes en la opción Todos los pacientes.
                        </SEmpty>
                    }
                </div>
            </STLayout>
        );
    }

    constructor(props) {
        super(props);
        this.state = { loading: false, option: 'my', userId: null };
        this.onOptionSelected = this.onOptionSelected.bind(this);
    }

    async componentDidMount() {
        this.setState({ userId: this.props.match.params.tid }, () => {
            this.getPatientsList(this.state.userId);
        });
    }

    componentWillUnmount() {
        this.props.setPatients(null);
    }

    /** Métodos */
    async getPatientsList(userId) {
        this.setState({ loading: true });
        await this.props.getPatients(userId);

        this.setState({ loading: false });
    }

    onOptionSelected(e) {
        this.setState({ option: e.target.name }, () => {
            let userId = this.state.option === 'my' ? this.state.userId : null;
            this.getPatientsList(userId);
        });
    }
}

/** Funciones para el store */
const mapStateToProps = (state) => {
    return {
        patients: state.patient.patients,
    };
}

const mapActionsToProps = {
    getPatients,
    setPatients
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(STPatientsPage);