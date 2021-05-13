/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STLogin.module.css';
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

import { THERAPIST } from '@data/roles';

/** Login para el terapeuta */
class STLogin extends Component {
    render() {
        /** Redireccionar a los pacientes */
        const { userId } = this.state;
        if (userId)
            return <Redirect to={`/terapeuta/${userId}/pacientes`} push />

        return(
            <div className={styles.container}>
                <div className={styles.title}>Ingreso</div>
                {this.state.error && <div className={styles.error}>
                    {this.state.error}
                </div>}
                <Form>
                    <FormGroup>
                        <Label className={styles.label}>Nombre de usuario</Label>
                        <Input 
                            name='username'
                            onChange={this.onInputChanged}
                            type='text' />
                    </FormGroup>
                    <FormGroup>
                        <Label className={styles.label}>Contraseña</Label>
                        <Input
                            name='password'
                            onChange={this.onInputChanged} 
                            type='password' />
                        <Button 
                            className={`ghost-btn ${styles.btnForgot}`}
                            onClick={this.onForgotClicked}>
                            ¿Olvidaste tu contraseña?
                        </Button>
                    </FormGroup>
                    <Button
                        className={`secondary-btn ${styles.btn}`}
                        onClick={this.onLoginClicked}>
                        {
                            this.state.loading ?
                            <Spinner color='dark' size='sm' />
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
            password: '', 
            userId: null,
            username: '',
        };

        this.onInputChanged = this.onInputChanged.bind(this);
        this.onForgotClicked = this.onForgotClicked.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onLoginClicked = this.onLoginClicked.bind(this);
    }

    /** Métodos */
    onInputChanged(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onForgotClicked(e) {
        e.preventDefault();
        const modal = {
            title: 'Recuperación de la contraseña',
            type: 'forgot_password',
            role: 2
        };
        this.props.setModal(modal);
    }

    async onLogin(username, password) {
        this.setState({ loading: true });
        const credentials = { username, password };
        const response = await this.props.login(credentials, THERAPIST);
        let { error, message, userId } = response;
        if (error) error = message;

        this.setState({ error, loading: false, userId });
    }

    onLoginClicked(e) {
        e.preventDefault();
        if (!this.state.loading) {
            const { username, password } = this.state;
            if (username.trim() !== '' && password.trim() !== '')
                this.onLogin(username, password);
            else
                this.setState({ 
                    error: 'El usuario y la contraseña son obligatorios' 
                });
        }
    }
}

/** Elementos del store */
const mapActionsToProps = {
    login,
    setModal
};

export default connect(
    null,
    mapActionsToProps
)(STLogin);