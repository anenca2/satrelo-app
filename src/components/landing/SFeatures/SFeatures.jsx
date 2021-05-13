/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import styles from './SFeatures.module.css';
import { Row } from 'reactstrap';

import SFeature from './SFeature';

const SFeatures = (props) => {
    return(
        <div>
            <div className={styles.title}>
                Si eres {props.role}
            </div>
            <div className={`flex ${styles.container}`}>
                <div className={styles.innerContainer}>
                    <Row noGutters>
                        {
                            props.features.map((feature) => {
                                return(
                                    <SFeature
                                        feature={feature}
                                        key={feature.id} />
                                );
                            })
                        }
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default SFeatures;