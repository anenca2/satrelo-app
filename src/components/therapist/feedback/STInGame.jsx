/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @mintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './Feedback.module.css';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { getWords } from '@utils/feedback';

import { STLine } from '@components/therapist/charts';
import SEmpty from '@components/shared/SEmpty';

class STInGame extends Component {
    render() {
        return(
            <div>
                {
                    this.state.words && this.state.words.length > 0 ?
                    <Row noGutters>
                        <Col sm='12'>
                            <div className={styles.subtitle}>
                                Emparejamiento de vocabulario
                            </div>
                        </Col>
                        {this.state.words.map((word, i) => {
                            return <STLine
                                        sm='12'
                                        md='4'
                                        data={this.state.matchesData}
                                        height={230}
                                        key={i}
                                        metric='match'
                                        title={word} />
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
        this.state = { matchesData: null, words: [] };
    }

    componentDidMount() {
        const { feedData } = this.props;
        const matchesData = feedData.Matches_Feeds;
        if (matchesData) {
            const words = getWords(matchesData);
            this.setState({ matchesData, words });
        }
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        feedData: state.feedback.feedData,
        session: state.activity.session
    };
}

export default connect(
    mapStateToProps
)(STInGame);