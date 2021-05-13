/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import { FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap';

const SInputField = (props) => {
    const type = props.name === 'email' ? 'email' : 
                 props.type ? props.type : 'text';
    
    return(
        <FormGroup>
            <Label>{props.children}</Label>
            {props.form === 'admin' && props.name === 'password' && 
            <FormText>
                Recuerda que la contraseña para el paciente debe 
                contener cuatro palabras del conjunto árbol, corazón,
                flor, nube y sol, separadas por coma y sin espacios. Ej.: 
                árbol,flor,nube,sol.
            </FormText>}
            <Input
                disabled={props.disabled}
                type={type}
                name={props.name}
                onChange={(e) => { props.onChange(e); }}
                value={props.value}
                invalid={props.error !== null} />
            {props.error && <FormFeedback>{props.error}</FormFeedback>}
        </FormGroup>
    );
}

export default SInputField;