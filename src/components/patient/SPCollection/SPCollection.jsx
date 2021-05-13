/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import styles from './SPCollection.module.css';
import { Col, Row } from 'reactstrap';

import SPCollectable from './SPCollectable';

const SPCollection = (props) => {
    const collectables = Object.values(props.Collectables);
    
    return(
        <div className={styles.container}>
            <p className={styles.title}>
                Colección de {props.name}
            </p>

            <Row className={styles.rowContainer} noGutters>
                {collectables && collectables.map((collectable) => {
                    return(
                        <Col 
                            className={styles.col}
                            sm='12' 
                            md='4' 
                            key={collectable.id}>
                            <SPCollectable
                                collectable={collectable}
                                userId={props.userId} />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default SPCollection;