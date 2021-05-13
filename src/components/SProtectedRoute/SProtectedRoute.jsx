/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.1
 */

import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
    setBar, 
    setNotification,
    setParallax, 
    showAvatar 
} from '@actions/ui';
import { getUser } from '@actions/user';
import { 
    setCheckServerStatus, 
    setConnectedId, 
    setConnectSocket 
} from '@actions/connection';

import { PATIENT } from '@data/roles';

class SProtectedRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props;
        const { role } = this.state;

        return(
            <Route {...rest} render={(props) => (
                this.hasToken(role) ?
                <Component {...props} />
                :
                <Redirect to={`/${role}`} />
            )} />
        );
    }

    constructor(props) {
        super(props);
        this.state = { role: this.getRoleFromPath() };
        this.hasToken = this.hasToken.bind(this);
    }

    async componentDidMount() {
        const { role } = this.state;
        this.showAvatar(role);
        this.setBar(role);
        this.setParallax(role);
        this.checkServerStatus(true);
                
        if (this.hasToken(role) && this.props.user === null) {
            /** 
             * Obtener el parámetro relacionado al id del usuario 
             * de acuerdo al rol
             */
            const { computedMatch } = this.props;
            const letter = role === PATIENT ? 'p' : 't';
            const id = computedMatch.params[`${letter}id`];
            
            const { error, user } = await this.props.getUser(id);
            if (!error) this.connectSocket(role, user.id);
        }
    }

    componentWillUnmount() {
        this.disconnectSocket();
        this.checkServerStatus(false);
        this.props.setNotification(null);
    }

    /** Métodos extra */
    checkServerStatus(check) {
        this.props.setCheckServerStatus(check);
    }

    connectSocket(role, userId) {
        if (role === PATIENT) {
            this.props.setConnectedId(userId);
            this.props.setConnectSocket(true);
        }
    }

    disconnectSocket() {
        this.props.setConnectSocket(false);
    }

    getRoleFromPath() {
        const { path } = this.props;
        const role = path.split('/')[1];
        return role;
    }

    hasToken(role) {
        const token = this.props.auth[`${role}Token`];
        if (token) {
            if (!axios.defaults.headers.common['Auth-Token'])
                axios.defaults.headers.common['Auth-Token'] = token;

            return true;
        }
        return false;
    }

    setBar(role) {
        const bar = role === PATIENT ? 'patient' : 'standard';
        this.props.setBar(bar);
    }

    setParallax(role) {
        const parallax = role === PATIENT;
        this.props.setParallax(parallax);
    }

    /** Mandar a mostrar avatar dependiendo del rol */
    showAvatar(role) {
        const show = role === PATIENT ? true : false;
        this.props.showAvatar(show);
    }
}

/** Elementos del store */
const mapActionsToProps = {
    getUser,
    setBar,
    setCheckServerStatus,
    setConnectedId,
    setConnectSocket,
    setNotification,
    setParallax,
    showAvatar
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.user.user
    };
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SProtectedRoute);