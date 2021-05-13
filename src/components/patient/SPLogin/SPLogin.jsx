/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.1
 */

import React, { Component } from 'react';
import styles from './SPLogin.module.css';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Spinner
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '@actions/auth';
import { setModal } from '@actions/ui';

import { PATIENT } from '@data/roles';

import SPassword from '@components/shared/SPassword';

class SPLogin extends Component {
    render() {
        /** Redireccionar a las actividades */
        const { userId } = this.state;
        if (userId)
            return <Redirect to={`/paciente/${userId}/actividades`} push />

        return(
            <div className={styles.container}>
                {this.state.error && <div className={styles.error}>
                    {this.state.error}
                </div>}
                <Form>
                    <FormGroup>
                        <Label className={styles.label}>
                            Escribe tu nombre de usuario
                        </Label>
                        <Input
                            bsSize='lg'
                            onChange={this.onInputChanged}
                            placeholder='Por ejemplo, mvsierra' 
                            type='text' />
                    </FormGroup>
                    <FormGroup>
                        <Label className={styles.label}>
                            Marca tu clave
                        </Label>
                        <SPassword setPassword={this.setPassword} />
                        <Button
                            className={`ghost-btn ${styles.btnForgot}`}
                            onClick={this.onForgotClicked}>
                            ¿Olvidaste tu clave?
                        </Button>
                    </FormGroup>
                    <Button
                        className={`primary-btn ${styles.btn}`}
                        onClick={this.onLoginClicked}>
                        {
                            this.state.loading ?
                            <Spinner color='light' size='sm' /> 
                            : 
                            <span>Entrar</span>
                        }
                    </Button>
                </Form>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            password: null,
            userId: null,
            username: ''
        };

        this.onInputChanged = this.onInputChanged.bind(this);
        this.onForgotClicked = this.onForgotClicked.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onLoginClicked = this.onLoginClicked.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    /** Métodos extra */
    onInputChanged(e) {
        this.setState({ username: e.target.value });
    }

    onForgotClicked(e) {
        e.preventDefault();
        const modal = {
            title: 'Recuperación de la clave',
            type: 'forgot_password',
            role: 1,
        };
        this.props.setModal(modal);
    }

    async onLogin(username, password) {
        this.setState({ loading: true });
        const credentials = { username, password };
        const response = await this.props.login(credentials, PATIENT);
        let { error, message, userId } = response;
        if (error) error = message;

        this.setState({ error, loading: false, userId });
    }

    onLoginClicked(e) {
        e.preventDefault();
        if (!this.state.loading) {
            const { username, password } = this.state;
            if (username.trim() !== '' && password) {
                if (password.length === 4)
                    this.onLogin(username, password.join());
                else
                    this.setState({ error: 'La clave debe tener 4 elementos'});
            }
            else
                this.setState({
                    error: 'El usuario y la clave son obligatorios'
                });
        }
    }

    setPassword(words) {
        this.setState({ password: words });
    }
}

/** Elementos del store */
const mapActionsToProps = {
    login,
    setModal
}

export default connect(
    null,
    mapActionsToProps
)(SPLogin);