/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STEvolution.module.css';
import { connect } from 'react-redux';
import { getLevels, getMatches, getPhrases, getSecuences } from '@actions/feedback';

import { 
    STInGame,
    STLevels,
    STVocalization 
} from '@components/therapist/feedback';
import SEmpty from '@components/shared/SEmpty';
import SSpinner from '@components/shared/SSpinner';
import STFeedOptions from '@components/therapist/feedback/STFeedOptions';
import STSessions from './STSessions';

class STEvolution extends Component {
    render() {        
        const sessions = Object.values(this.props.sessions);
        sessions.sort((a, b) => { return a.id < b.id ? 1 : -1; });
        
        return(
            <div className={styles.container}>
                <STSessions sessions={sessions} />
                <STFeedOptions
                    feedback='evolution'
                    onOptionClicked={this.onOptionClicked} />
                {
                    this.props.feedData === null ?
                    <SEmpty>
                        No existen registros que permitan construir las
                        estadísticas solicitadas.
                    </SEmpty>
                    :
                    this.state.loading ?
                    <SSpinner color='primary' />
                    :                    
                    this.state.option === 'vocalization' ?
                    <STVocalization feedback='evolution' />
                    :
                    this.state.option === 'inGame' ?
                    <STInGame />
                    :
                    <STLevels />
                }
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { loading: false, option: 'vocalization' };        
        this.onOptionClicked = this.onOptionClicked.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.session !== this.props.session)
            this.getFeedback();
    }

    /** Métodos extra */
    async getFeedback() {
        const { session } = this.props;
        if (session) {
            const { id } = session;
            const { option } = this.state;
            
            this.setState({ loading: true });
            if (option === 'vocalization')
                await this.props.getPhrases({ id });
            else if (option === 'inGame')
                await this.props.getMatches({ id });
            else if (option === 'levels') {
                const { activity: { Mechanic: { semantic_description }}} = this.props;
                if (semantic_description === 1)
                    await this.props.getLevels({ id });
                else
                    await this.props.getSecuences({ id });
            }
            
            this.setState({ loading: false });
        }
    }

    onOptionClicked(data) {
        this.setState({ option: data.option }, () => this.getFeedback());
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        activity: state.activity.activity,
        feedData: state.feedback.feedData,
        sessions: state.activity.sessions,
        session: state.activity.session
    };
}

const mapActionsToProps = {
    getLevels,
    getMatches,
    getPhrases,
    getSecuences,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(STEvolution);