/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import styles from './STOption.module.css';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const STOption = (props) => {
    const selected = props.option.selected ? styles.selected : '';

    return(
        <Button 
            className={`ghost-btn ${styles.container}`}
            onClick={() => {
                onOptionClicked(props);
            }}>
            <div className={`flex ${styles.inner} ${selected}`}>
                <div className={styles.name}>
                    { props.option.name }
                </div>
                <FontAwesomeIcon
                    icon={faCheckCircle}
                    size='2x' />
            </div>
        </Button>
    );
}

/** Métodos extra */
const onOptionClicked = (props) => {
    props.onOptionSelected(props.option);
}

export default STOption;