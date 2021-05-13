/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import { FormGroup, Label } from 'reactstrap';

import SDatePicker from '@components/shared/SDatePicker';

const SDateField = (props) => {
    return(
        <FormGroup>
            <Label>{props.children}</Label>
            <SDatePicker
                date={props.date}
                form={true}
                name={props.name}
                onChange={(e) => { props.onChange(e); }} />
        </FormGroup>
    );
}

export default SDateField;