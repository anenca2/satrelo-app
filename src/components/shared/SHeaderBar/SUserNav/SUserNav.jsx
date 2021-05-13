/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SUserNav.module.css';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showMobileMenu } from '@actions/ui';

import { PATIENT } from '@data/roles';

import SMenu from './SMenu';

class SUserNav extends Component {
    render() {
        const { id, is_admin, Role } = this.props.user;
        const role = Role.name;

        return(
            <div className={`flex ${styles.container}`}>
                <div className={styles.linksContainer}>
                    {
                        role === PATIENT ?
                        <span>
                            <Link
                                className={styles.link} 
                                to={`/${role}/${id}/actividades`}>
                                Actividades
                            </Link>
                            <Link 
                                className={styles.link}
                                to={`/${role}/${id}/colecciones`}>
                                Colecciones
                            </Link>
                        </span>
                        : 
                        <span>
                            {is_admin && <Link
                                className={styles.link}
                                to={`/${role}/${id}/admin`}>
                                Administrar
                            </Link>}
                            <Link 
                                className={styles.link}
                                to={`/${role}/${id}/pacientes`}>
                                Pacientes
                            </Link>
                        </span>
                    }
                </div>
                {
                    this.props.ui.windowWidth >= 768 ?
                    <SMenu />
                    :
                    <Button
                        className='ghost-btn'
                        onClick={this.onMenuButtonClicked}>
                        {
                            this.props.user.profile_img ? 
                            <div className={styles.uimage} />
                            :
                            <div
                                className={`flex ${styles.uimage} ${styles.thumb}`}
                                style={{ backgroundColor: this.props.user.color }}>
                                { this.props.user.thumbnail_alias }
                            </div>
                        }
                    </Button>
                }
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.onMenuButtonClicked = this.onMenuButtonClicked.bind(this);
    }

    /** Métodos extra */
    onMenuButtonClicked() {
        this.props.showMobileMenu(true);
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        ui: state.ui,
        user: state.user.user
    };
}

const mapActionsToProps = {
    showMobileMenu
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SUserNav);