/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import styles from './SAvatarItem.module.css';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const SAvatarItem = (props) => {
    const { item } = props;
    const avatarPath = SERVER_URL + item.img_path;
    
    return(
        <div className={`flex ${styles.container}`}>
            <img 
                alt=''
                className={styles.image}
                src={avatarPath} />
        </div>
    );
}

export default SAvatarItem;