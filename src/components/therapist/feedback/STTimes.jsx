/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './Feedback.module.css';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { STLine } from '@components/therapist/charts';

class STTimes extends Component {
    render() {
        const { sessionsData } = this.state;
        return(
            <Row noGutters>
                <Col sm='12'>
                    <div className={styles.subtitle}>
                        Tiempos por sesiones de la actividad
                    </div>
                </Col>
                {sessionsData &&
                <STLine
                    sm='12'
                    md='6'
                    data={sessionsData}
                    height={200}
                    metric='time' />}
            </Row>
        );
    }

    constructor(props) {
        super(props);
        this.state = { sessionsData: null };
    }

    componentDidMount() {
        const { feedData } = this.props;
        const sessionsData = feedData.Sessions_Feeds;
        if (sessionsData)
            this.setState({ sessionsData });
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        feedData: state.feedback.feedData
    };
}

export default connect(
    mapStateToProps
)(STTimes);