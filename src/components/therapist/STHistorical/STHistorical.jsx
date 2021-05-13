/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STHistorical.module.css';
import { connect } from 'react-redux';
import {
    getLevels, 
    getMatches, 
    getPhrases,
    getSecuences,
    getSessions 
} from '@actions/feedback';
import { getDateBoundaries } from '@utils/date&time';

import { 
    STInGame,
    STLevels,
    STTimes,
    STVocalization 
} from '@components/therapist/feedback';
import SEmpty from '@components/shared/SEmpty';
import SSpinner from '@components/shared/SSpinner';
import STFeedOptions from '@components/therapist/feedback/STFeedOptions';
import STMechanics from './STMechanics';

class STHistorical extends Component {
    render() {
        return(
            <div className={styles.container}>
                <STMechanics onMechanicClicked={this.onMechanicClicked} />
                <STFeedOptions
                    feedback='historical'
                    mechanic={this.state.mid}
                    onOptionClicked={this.onOptionClicked} />
                {
                    this.state.loading ?
                    <SSpinner color='primary' />
                    :
                    this.props.feedData === null ?
                    <SEmpty>
                        No existen registros que permitan construir las
                        estadísticas solicitadas.
                    </SEmpty>
                    :
                    this.state.option === 'vocalization' ?
                    <STVocalization feedback='historical' />
                    :
                    this.state.option === 'inGame' ?
                    <STInGame />
                    :
                    this.state.option === 'levels' ?
                    <STLevels />
                    :
                    <STTimes />                        
                }
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { 
            description: 1,
            loading: false, 
            mid: 1,
            option: 'vocalization' 
        };
        this.onOptionClicked = this.onOptionClicked.bind(this);
        this.onMechanicClicked = this.onMechanicClicked.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const { date } = this.props;
        const { mid } = this.state;
        if (date !== prevProps.date || mid !== prevState.mid)
            this.getFeedback();
    }

    /** Métodos extras */
    async getFeedback() {
        const { date, pid } = this.props;
        const { description, mid, option } = this.state;
        /** Calcular las fechas límites */
        const { startDate, endDate } = getDateBoundaries(date.toISOString());
        const data = { pid, startDate, endDate, mid };

        this.setState({ loading: true });
        if (option === 'vocalization')
            await this.props.getPhrases(data, true);
        else if (option === 'inGame')
            await this.props.getMatches(data, true);
        else if (option === 'levels') {
            if (description === 1)
                await this.props.getLevels(data, true);
            else
                await this.props.getSecuences(data, true);
        }
        else if (option === 'times')
            await this.props.getSessions(data, true);
        
        this.setState({ loading: false });
    }

    onOptionClicked(data) {
        this.setState({ description: data.description, option: data.option }, 
            () => this.getFeedback());
    }

    onMechanicClicked(mechanic) {
        this.setState({ mid: mechanic });
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        feedData: state.feedback.feedData,
        date: state.feedback.feedDate
    };
}

const mapActionsToProps = {
    getLevels,
    getMatches,
    getPhrases,
    getSecuences,
    getSessions
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(STHistorical);