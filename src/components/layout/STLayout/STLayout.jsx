/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import styles from './STLayout.module.css';
import { Col, Row } from 'reactstrap';

const STLayout = (props) => {
    /** Calcular el tamaño del layout dependiendo del page */
    const xlSize = props.page === 'feedback' ? '10' : '9';
    const mt = props.mt ? props.mt : 62;

    return(
        <div className={`flex ${styles.outerContainer}`}>
            <Row 
                className={`justify-content-center ${styles.rowContainer}`} 
                noGutters>
                <Col
                    xs='12' 
                    sm='12' 
                    md='12' 
                    lg='12' 
                    xl={xlSize}>
                    <div 
                        className={styles.container}
                        style={{ '--mt': `${mt}px`, '--pt': `${props.pt}px` }}>
                        { props.children }
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default STLayout;