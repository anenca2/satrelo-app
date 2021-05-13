/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import styles from './SPPassButton.module.css';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const SPPassButton = (props) => {
    let btn = props.kind === 'delete' ? styles.btnInv : styles.btn;
    if (props.kind === 'not')
        btn = `${btn} ${styles.bgWhite}`;

    return(
        <Button 
            className={`ghost-btn ${btn}`}
            onClick={() => {
                if (props.kind === 'delete')
                    props.onDeletePassClicked();
                else if (props.kind === 'select')
                    props.onPassButtonClicked({
                        name: props.name,
                        src: props.src
                    });
            }}
            style={{ cursor: props.kind === 'not' ? 'default' : 'pointer'}}>
            {
                props.kind === 'delete' ?
                <FontAwesomeIcon 
                    icon={faTrash}
                    size='2x' 
                    style={{ color: 'black' }} />
                :
                !props.src || (props.src && props.src.trim() === '') ?
                <div className={styles.icon} />
                :
                <img
                    alt=''
                    className={styles.icon} 
                    src={props.src} />
            }
        </Button>
    );
}

export default SPPassButton; 