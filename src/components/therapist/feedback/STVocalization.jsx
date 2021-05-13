/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './Feedback.module.css';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { getStructures, groupPhrases } from '@utils/feedback';

import SEmpty from '@components/shared/SEmpty';
import { 
    STDoughnut,
    STPhrases,
    STStackBar 
} from '@components/therapist/charts';

class STVocalization extends Component {
    render() {
        const { groupedPhrases } = this.state;        
        return(
            <div>
                {
                    groupedPhrases && groupedPhrases.length > 0 ?
                    <Row noGutters>
                        <Col sm='12'>
                            <div className={styles.subtitle}>
                                Frases trabajadas en la actividad
                            </div>
                        </Col>
                        {groupedPhrases && <STDoughnut 
                            sm='12'
                            md='5'
                            data={groupedPhrases}
                            height={160}
                            title='Resumen de las frases' />}
                        {this.props.feedback === 'evolution' && groupedPhrases &&
                            <STPhrases data={groupedPhrases} />}

                        <Col sm='12'>
                            <div className={styles.subtitle}>
                                Discriminación por estructura sintáctica
                            </div>
                        </Col>
                        {this.state.structures.map((structure, i) => {
                            return (
                                <STStackBar
                                    sm='12'
                                    md='6'
                                    lg='4'
                                    color={structure.color}
                                    data={this.state.phrasesData}
                                    height={230}
                                    key={i} 
                                    title={structure.title} />
                            );
                        })}
                    </Row>
                    :
                    <SEmpty>
                        No existe información suficiente que permita construir la información 
                        solicitada.
                    </SEmpty>
                }
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            groupedPhrases: null, 
            phrasesData: null, 
            structures: [] 
        };
    }

    componentDidMount() {
        const { feedData } = this.props;
        const phrasesData = feedData.Phrases_Feeds;
        if (phrasesData) {
            const groupedPhrases = groupPhrases(phrasesData);
            const structures = getStructures(phrasesData);
            this.setState({ 
                groupedPhrases,
                phrasesData, 
                structures 
            });
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
)(STVocalization);