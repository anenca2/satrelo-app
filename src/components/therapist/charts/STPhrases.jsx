/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './Charts.module.css';
import { Col } from 'reactstrap';

import SContainer from '@components/shared/SContainer';

class STPhrases extends Component {
    render() {
        return(
            <Col sm='12' md='7' className={styles.container}>
                <SContainer>
                    <p className={styles.title}>
                        Palabras correctas por frases
                    </p>

                    {this.state.phrases.map((phrase, i) => {
                        return (
                            <div className='flex' key={i}>
                                <div className={`flex ${styles.wordsContainer}`}>
                                    {phrase.words.map((word, j) => {
                                        return(
                                            <div
                                                className={styles.word} 
                                                key={j}
                                                style={{
                                                    color: word.checked ?
                                                    'black': '#F1948A'
                                                }}>
                                                {word.word}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={styles.phrasePercentage}>
                                    {phrase.percentage}%
                                </div>
                            </div>
                        );
                    })}
                </SContainer>
            </Col>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            phrases: []
        };
    }

    componentDidMount() {
        this.setState({ phrases: this.props.data });
    }
}

export default STPhrases;