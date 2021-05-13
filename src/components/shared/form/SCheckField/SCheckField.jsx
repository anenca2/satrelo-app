/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const SCheckField = (props) => {
    return(
        <FormGroup check>
            <Input 
                type='checkbox'
                name={props.name}
                checked={props.checked}
                onChange={(e) => { props.onChange(e); }} />
            <Label>{props.children}</Label>
        </FormGroup>
    );
}

export default SCheckField;