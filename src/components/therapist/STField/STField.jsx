/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import styles from './STField.module.css';
import { Col, Row } from 'reactstrap';

import SSpinner from '@components/shared/SSpinner';
import STOption from './STOption';

const STField = (props) => {
    let { options } = props;
    options = options ? Object.values(options) : [];

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                { props.title }
            </div>
            <div className={styles.subtitle}>
                { props.subtitle }
            </div>
            {
                props.loading ?
                <SSpinner color='primary' />
                :
                options && options.length > 0 ?
                <Row className={styles.optionRow} noGutters>
                    {options.map(option => {
                        return(
                            <Col
                                className={styles.optionCol}
                                key={option.id} 
                                sm={{ size: 12 }}
                                md={{ size: 4 }}>
                                <STOption
                                    onOptionSelected={(option) => {
                                        onOptionSelected(props, option);
                                    }} 
                                    option={option} />
                            </Col>
                        );
                    })}
                </Row> 
                : null
            }
        </div>
    );
}

/** Métodos extra */
const onOptionSelected = (props, option) => {
    props.onOptionSelected(option);
}

export default STField;