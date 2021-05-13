/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';

const structures = {
    1: { letter: 'S', color: '#FF7043' },
    2: { letter: 'AD', color: '#42A5F5' },
    3: { letter: 'V', color: '#26A69A' }
}

const SSyntacticCircle = (props) => {
    const sid = props.id;
    const structure = structures[sid];

    let bgColor = 'darkgray';
    if (structure.letter === props.letter)
        bgColor = structure.color;

    return(
        <div style={{
            alignItems: 'center',
            backgroundColor: `${bgColor}`,
            borderRadius: '50%',
            color: 'white',
            display: 'flex',
            fontWeight: '600',
            height: 37,
            justifyContent: 'center',
            width: 37
        }}>
            {props.letter}
        </div>
    );
}

export default SSyntacticCircle;