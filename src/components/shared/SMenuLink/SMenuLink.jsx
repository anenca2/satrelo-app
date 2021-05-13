/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SMenuLink.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '@actions/auth';

class SMenuLink extends Component {
    render() {
        return(
            <Link
                className={styles.style}
                to={this.props.to}
                onClick={this.onLinkClicked}>
                {this.props.children}
            </Link>
        );
    }

    constructor(props) {
        super(props);
        this.onLinkClicked = this.onLinkClicked.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    /** Métodos extra */
    onLinkClicked() {
        if (this.props.onClick)
            this.props.onClick();
        
        if (this.props.type === 'logout')
            this.onLogout();
    }

    onLogout() {
        const { role } = this.props;
        this.props.logout(role);
    }
}

/** Elementos del store */
const mapActionsToProps = {
    logout,
}

export default connect(
    null,
    mapActionsToProps
)(SMenuLink);