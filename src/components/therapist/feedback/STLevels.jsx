/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './Feedback.module.css';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';

import STLevel from '@components/therapist/charts/STLevel';

class STLevels extends Component {
    render() {
        return(
            <Row noGutters>
                <Col xs='12'>
                    <div className={styles.subtitle}>
                        Niveles en la sesión
                    </div>
                </Col>
                {this.state.levels.map(level => {
                    return(
                        <STLevel 
                            sm='12'
                            md='6'
                            lg='4'
                            data={level} 
                            key={level.id} />
                    );
                })}
            </Row>
        );
    }

    constructor(props) {
        super(props);
        this.state = { levels: [] };
    }

    componentDidMount() {
        this.setLevels();
    }

    componentDidUpdate() {
        this.setLevels();
    }

    /** Métodos extra */
    setLevels() {
        const { Levels_Feeds } = this.props.feedData;
        const { levels } = this.state;
        if (Levels_Feeds && levels.length === 0) {
            const levels = Object.values(Levels_Feeds);
            this.setState({ levels });
        }
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
)(STLevels);