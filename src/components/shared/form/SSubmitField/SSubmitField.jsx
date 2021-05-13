/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';

const SSubmitField = (props) => {
    return(
        <FormGroup>
            <Button
                className={props.className}
                style={{ minWidth: 90 }}
                onClick={(e) => { props.onClick(e); }}>
                {
                    props.loading ?
                    <Spinner color='light' size='sm' />
                    :
                    <span>{props.children}</span>
                }
            </Button>
        </FormGroup>
    );
}

export default SSubmitField;