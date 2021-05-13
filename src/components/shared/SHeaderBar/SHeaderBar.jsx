/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SHeaderBar.module.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import { connect } from 'react-redux';

import SNav from './SNav';
import SUserNav from './SUserNav';

class SHeaderBar extends Component {
    render() {
        const { bar } = this.props.ui;
        let base = styles.bar;
        if (bar === 'patient')
            base = `${base} ${styles.patientBar}`;
        else
            base = `${base} ${styles.standardBar}`;

        return(
            <Navbar 
                className={base} 
                expand='lg'
                fixed='top' 
                light>
                <NavbarBrand className={styles.navbrand}>
                    <img
                        alt=''
                        className={styles.logo}
                        src='/images/logo/logo.png' />
                    SATReLO
                </NavbarBrand>
                {
                    this.props.user !== null ?
                    <SUserNav />
                    :
                    <SNav windowWidth={this.props.ui.windowWidth} />
                }
            </Navbar>
        );
    }
}

/** Eementos del store */
const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        ui: state.ui,
    };
}

export default connect(
    mapStateToProps
)(SHeaderBar);