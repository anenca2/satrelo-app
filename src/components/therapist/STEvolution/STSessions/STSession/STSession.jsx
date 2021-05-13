/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STSession.module.css';
import { Button, Col } from 'reactstrap';
import { 
    getDatesDifference,
    getFormattedDate
 } from '@utils/date&time';
import { connect } from 'react-redux';

class STSession extends Component {
    render() {
        /** Configuración del estilo del contenedor */
        const { index, session, sessionSelected } = this.props;
        let container = styles.container;
        let innerContainer = styles.innerContainer;

        /** Aplicar estilo al primer elemento y último elemento */
        if (index === 0) container = `${container} ${styles.first}`;
        else if (index === 2) container = `${container} ${styles.last}`;

        if (sessionSelected && session.id === sessionSelected.id)
            innerContainer = `${innerContainer} ${styles.selected}`;

        return(
            <Col xs='12' sm='6' md='4' className={container}>                
                <Button 
                    className={`ghost-btn ${styles.btn}`}
                    onClick={this.onClicked}>
                    <div className={innerContainer}>
                        <div className={`flex ${styles.title}`}>
                            <span>Sesión</span>
                            <span>ID: {session.id}</span>
                        </div>
                        <div className={styles.date}>
                            Registro del {this.getFormattedDate(session.date_start)}
                        </div>
                        <div className={styles.time}>
                            {this.getDifference(
                                session.date_start, 
                                session.date_end)} minutos
                        </div>
                    </div>
                </Button>                
            </Col>
        );
    }

    constructor(props) {
        super(props);
        this.onClicked = this.onClicked.bind(this);
    }

    /** Métodos extras */
    /** Obtener la diferencia de tiempos en minutos */
    getDifference(date_start, date_end) {
        const diff = getDatesDifference(date_start, date_end);
        return Math.round(diff.minutes);
    }

    getFormattedDate(date) {
        return getFormattedDate(date);
    }

    onClicked() {
        this.props.onClicked(this.props.session);
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        sessionSelected: state.activity.session
    };
}

export default connect(
    mapStateToProps
)(STSession);