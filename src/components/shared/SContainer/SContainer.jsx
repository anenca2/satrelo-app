/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';

const SContainer = (props) => {
    let padding = 20;
    if (props.padding !== undefined) padding = props.padding;
     
    return(
        <div style={{
            border: '1px solid #E0E0E0',
            borderRadius: '3px',
            boxShadow: '3px 3px 10px -3px #E0E0E0',
            padding: `15px ${padding}px`,
            width: '100%'
            }}>
            {props.children}
        </div>
    );
}

export default SContainer;