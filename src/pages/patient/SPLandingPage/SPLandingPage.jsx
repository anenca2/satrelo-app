/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMessage } from '@actions/avatar';
import { 
    setBar,
    setParallax, 
    showAvatar, 
    showMobileMenu 
} from '@actions/ui';
import { setUser } from '@actions/user';

import SPLayout from '@components/layout/SPLayout';
import SPLogin from '@components/patient/SPLogin';

import { messages } from '@data/messages';
const { landing } = messages;

/** Página Landing del paciente */
class SPLandingPage extends Component {
    render() {
        const vOffset = this.props.ui.vOffset + 60;

        return(
            <SPLayout>
                <div 
                    className='flex' 
                    style={{
                        alignItems: 'center',
                        height: `calc(100vh - ${vOffset}px)`,
                        justifyContent: 'center' 
                    }}>
                    <SPLogin />
                </div>
            </SPLayout>
        );
    }

    componentDidMount() {
        /** Enviar mensaje al avatar */
        const message = landing[Math.floor(Math.random() * landing.length)];
        this.props.setMessage(message);

        this.props.setBar('patient');
        this.props.setParallax(true);
        this.props.showMobileMenu(false);
        this.props.setUser(null);
        this.props.showAvatar(true);
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        ui: state.ui
    };
}

const mapActionsToProps = {
    setBar,
    setMessage,
    setParallax,
    setUser,
    showAvatar,
    showMobileMenu,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SPLandingPage);