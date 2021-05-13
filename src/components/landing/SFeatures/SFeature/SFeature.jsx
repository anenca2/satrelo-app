/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import styles from './SFeature.module.css';
import { Col } from 'reactstrap';

const SFeature = (props) => {
    return(
        <Col sm='12' md='4'>
            <div className={`flex ${styles.container}`}>
                <img 
                    alt=''
                    className={styles.logo}
                    src={props.feature.logo} />
                <div className={styles.infoContainer}>
                    <div className={styles.title}>
                        {props.feature.title}
                    </div>
                    <div className={styles.description}>
                        {props.feature.description}
                    </div>
                </div>
            </div>
        </Col>
    );
}

export default SFeature;