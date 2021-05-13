/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import styles from './SMobile.module.css';

const SMobile = () => {
    return(
        <div className={`flex ${styles.container}`}>
            <div className={styles.innerContainer}>
                <p className={styles.title}>
                    ¡En todos tus dispositivos!
                </p>
                <p className={styles.description}>
                    SATReLO está cuidadosamente diseñado para que se vea y funcione
                    bien en todos tus dispositivos, ya sean computadores, tablets o 
                    smartphones.
                </p>
                <div className={`flex ${styles.imageContainer}`}>
                    <img 
                        alt=''
                        className={styles.image}
                        src='images/landing/mobile.png' />
                </div>
            </div>
        </div>
    );
}

export default SMobile;