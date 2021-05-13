/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STSessions.module.css';
import { Row } from 'reactstrap';
import { connect } from 'react-redux';
import { setSession } from '@actions/activity';

import STSession from './STSession';

class STSessions extends Component {
    render() {
        return(
            <Row className={styles.container} noGutters>
                {
                    this.props.sessions.map((session, i) => {
                        return <STSession 
                                    index={i}
                                    key={session.id}
                                    onClicked={this.onSessionClicked}
                                    session={session} />
                    })
                }                
            </Row>
        );
    }

    constructor(props) {
        super(props);
        this.onSessionClicked = this.onSessionClicked.bind(this);
    }

    componentDidMount() {
        const session = this.props.sessions[0];
        this.setSession(session);
    }

    /** Métodos extra */
    onSessionClicked(session) {
        this.setSession(session);
    }

    setSession(session) {
        this.props.setSession(session);
    }
}

/** Elementos del store */
const mapActionsToProps = {
    setSession
};

export default connect(
    null,
    mapActionsToProps
)(STSessions);