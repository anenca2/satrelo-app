/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

const SSelectField = (props) => {
    return(
        <FormGroup>
            <Label>{props.children}</Label>
            <Input
                type='select'
                name={props.name}
                onChange={(e) => { props.onChange(e); }}
                value={props.value}>
                {props.options.map((opt, i) => {
                    return <option key={i} value={opt.value}>
                        {opt.title}
                    </option>
                })}
            </Input>
        </FormGroup>
    );
}

export default SSelectField;