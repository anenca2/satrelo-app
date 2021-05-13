/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STFeedbackPage.module.css';
import { connect } from 'react-redux';
import {
    getActivity,
    setActivity,
    setSessions,
    setSession
} from '@actions/activity';
import { setFeedData } from '@actions/feedback';

import SDatePicker from '@components/shared/SDatePicker';
import SSpinner from '@components/shared/SSpinner';
import STEvolution from '@components/therapist/STEvolution';
import STHistorical from '@components/therapist/STHistorical';
import STLayout from '@components/layout/STLayout';

class STFeedbackPage extends Component {
    render() {
        const { kind, loading } = this.state;
        const title = kind === 'evolución' ?
                        'Evolución por sesiones' : 'Histórico por mes'
        
        const { pid } = this.props.match.params;
        
        return(
            <STLayout page='feedback' pt={50}>
                <div className={`flex ${styles.container}`}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    {kind === 'histórico' && <SDatePicker />}
                </div>
                {
                    loading ?
                    <SSpinner color='primary' />
                    :
                    this.props.sessions && kind === 'evolución' ?
                    <STEvolution />
                    :
                    kind === 'histórico' ?
                    <STHistorical pid={pid} />
                    :
                    null
                }
            </STLayout>
        );
    }

    constructor(props) {
        super(props);
        this.state = { kind: 'evolución', loading: false };
    }

    componentDidMount() {
        const { aid, kind } = this.props.match.params;
        if (kind === 'evolución') 
            this.getActivity(aid);
        
        this.setState({ kind });
    }

    componentWillUnmount() {
        this.props.setActivity(null);
        this.props.setFeedData(null);
        this.props.setSessions(null);
        this.props.setSession(null);       
    }

    /** Métodos extra */
    async getActivity(aid) {
        this.setState({ loading: true });
        await this.props.getActivity(aid);
        this.setFirstSessions();
        this.setState({ loading: false });
    }

    /** Setear las tres primeras sesiones de la actividad */
    setFirstSessions() {
        const { activity } = this.props;
        let sessions = [];
        if (activity) {
            sessions = Object.values(activity.Activities_Sessions);
            sessions.sort((a, b) => { return a.id < b.id ? 1 : -1; });
            sessions = Object.assign({}, ...sessions.slice(0, 3).map(session => {
                return { [session.id]: session };
            }));
        }
        this.props.setSessions(sessions);
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        activity: state.activity.activity,
        sessions: state.activity.sessions
    };
}

const mapActionsToProps = {
    getActivity,
    setActivity,
    setFeedData,
    setSessions,
    setSession
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(STFeedbackPage);