/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import styles from './SDevelop.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const SDevelop = () => {
    return(
        <div className={`flex ${styles.container}`}>
            <div className={`flex ${styles.innerContainer}`}>
                <p className={styles.text}>
                    Ideado y desarrollado con 
                    <FontAwesomeIcon 
                        className={styles.icon}
                        icon={faHeart} />
                    por un equipo interdisciplinar de
                </p>
                <div className={`flex ${styles.logoContainer}`}>
                    <img 
                        alt=''
                        className={styles.logoImage}
                        src='/images/landing/logo_incs.png' />
                    <img
                        alt=''
                        className={styles.logoImage}
                        src='/images/landing/logo_pujc.png' /> 
                </div>
            </div>
        </div>
    );
}

export default SDevelop;