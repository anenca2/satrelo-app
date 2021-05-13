/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import styles from './SAvatarInfo.module.css';

const DEFAULT_AVATAR = process.env.REACT_APP_DEFAULT_AVATAR;

const SAvatarInfo = () => {
    return(
        <div className={`flex ${styles.container}`}>
            <div className={`flex ${styles.innerContainer}`}>
                <div className={`${styles.sides} ${styles.avatarSide}`}>
                    <img 
                        alt=''
                        className={styles.image}
                        src={DEFAULT_AVATAR} />                    
                </div>
                <div className={styles.sides}>
                    <p className={styles.title}>
                        ¡Avatar para apoyar las terapias!
                    </p>
                    <p className={styles.description}>
                        Cómo terapeuta puedes personalizar un avatar con el que
                        tu paciente podrá interactuar mientras realiza sus 
                        actividades asignadas
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SAvatarInfo;