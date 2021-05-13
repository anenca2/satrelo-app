/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import { Col, Form, Row } from 'reactstrap';

import SCheckField from '@components/shared/form/SCheckField';
import SDateField from '@components/shared/form/SDateField';
import SInputField from '@components/shared/form/SInputField';
import SSelectField from '@components/shared/form/SSelectField';
import SSubmitField from '@components/shared/form/SSubmitField';

import { genders, users } from '@data/form';
import { checkUserFields } from '@utils/user';

class SAUserForm extends Component {
    render() {
        const disabled = this.props.update ? true : false;
        return(
            <Form>
                <Row form>
                    <Col md={6}>
                        <SInputField 
                            error={this.state.name.error}
                            name='name'
                            onChange={this.onChange}
                            value={this.state.name.value}>
                            Nombre *
                        </SInputField>
                    </Col>
                    <Col md={6}>
                        <SInputField 
                            error={this.state.last_name.error}
                            name='last_name'
                            onChange={this.onChange}
                            value={this.state.last_name.value}>
                            Apellido *
                        </SInputField>
                    </Col>
                </Row>
                <SInputField 
                    error={this.state.email.error} 
                    name='email' 
                    onChange={this.onChange}
                    value={this.state.email.value}>
                    Email *
                </SInputField>
                <Row form>
                    <Col md={6}>
                        <SInputField
                            disabled={disabled} 
                            error={this.state.id.error}
                            name='id'
                            onChange={this.onChange}
                            value={this.state.id.value}>
                            Identificación *
                        </SInputField>
                    </Col>
                    <Col md={6}>
                        <SDateField
                            date={this.state.birthday_date.value}
                            name='birthday_date'
                            onChange={this.onChange}>
                            Fecha de nacimiento *
                        </SDateField>
                    </Col>
                </Row>
                <SSelectField
                    name='gender'
                    onChange={this.onChange}
                    options={genders}
                    value={this.state.gender.value}>
                    Género *
                </SSelectField>
                <Row form>
                    <Col md={6}>
                        <SInputField 
                            error={this.state.username.error}
                            name='username'
                            onChange={this.onChange}
                            value={this.state.username.value}>
                            Nombre de usuario *
                        </SInputField>
                    </Col>
                    <Col md={6}>
                        <SSelectField
                            name='id_role'
                            onChange={this.onChange}
                            options={users}
                            value={this.state.id_role.value}>
                            Tipo de usuario *
                        </SSelectField>
                    </Col>
                </Row>
                <SInputField
                    error={this.state.password.error}
                    form='admin'
                    name='password'
                    onChange={this.onChange}
                    value={this.state.password.value}>
                    Contraseña *
                </SInputField>
                <SCheckField 
                    name='active'
                    checked={this.state.active.value}
                    onChange={this.onChange}>
                    ¿Este usuario está activo?
                </SCheckField>
                {this.state.id_role.value === 2 && <SCheckField 
                    name='is_admin'
                    checked={this.state.is_admin.value}
                    onChange={this.onChange} >
                    ¿Este usuario es administrador?
                </SCheckField>}
                <SSubmitField
                    className='secondary-btn mt-4 w-100'
                    loading={this.props.loading}
                    onClick={this.onSaveClicked}>
                    Guardar
                </SSubmitField>
            </Form>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            active: { value: true },
            birthday_date: { value: new Date() },
            email: { value: '', error: null },
            gender: { value: 'F' },
            id: { value: '', error: null },
            is_admin: { value: false },
            last_name: { value: '', error: null },
            name: { value: '', error: null },
            password: { value: '', error: null },
            username: { value: '', error: null },
            id_role: { value: 1 },
        };
        this.onChange = this.onChange.bind(this);
        this.onSaveClicked = this.onSaveClicked.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.user && this.props.user !== prevProps.user)
            this.setState({...this.props.user});
    }

    /** Métodos extra */
    buildUserData() {
        const keys = Object.keys(this.state);
        let userData = {};
        keys.forEach(key => {
            let { value } = this.state[key];
            if (key === 'name' || key === 'last_name' || key === 'email' ||
                key === 'id' || key === 'username' || key === 'password')
                value = value.trim();

            userData[key] = value;
        });

        return userData;
    }

    onChange(e) {
        let { name, value } = e.target;
        if (name === 'active' || name === 'is_admin')
            value = !this.state[name].value;
        else if (name === 'id_role') 
            value = parseInt(value, 10);

        /** Asignar el valor y resetear el error */
        let field = this.state[name];
        field.value = value;
        if (field.error) field.error = null;
        
        this.setState({ [name]: field });
    }

    onSaveClicked(e) {
        e.preventDefault();
        if (!this.props.loading) {
            const { update } = this.props;
            const check = checkUserFields(this.state, update);
            if (!check.hasErrors) {
                const userData = this.buildUserData();
                this.props.onSave(userData);
            }
            else
                this.setState({...check.user});
        }
    }
}

export default SAUserForm;