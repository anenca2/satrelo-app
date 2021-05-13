/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SMobileMenu.module.css';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { showMobileMenu } from '@actions/ui';

import { THERAPIST } from '@data/roles';

import SMenuHeader from '@components/shared/SMenuHeader';
import SMenuLink from '@components/shared/SMenuLink';

class SMobileMenu extends Component {
    render() {
        const { id, is_admin, Role } = this.props.user;
        const role = Role.name;
        
        return(
            <div className={styles.container}>
                <Button
                    onClick={this.onAnimatedCloseClicked}
                    className={`ghost-btn ${styles.btn}`}>
                </Button>

                <div className={`${styles.menu} ${this.state.animation}`}>
                    <SMenuHeader user={this.props.user} />
                    <br/>
                    <div className='h-delimiter'></div>
                    <div className={styles.linksContainer}>
                        {
                            role === THERAPIST ?
                            <span>
                                <SMenuLink 
                                    onClick={this.onSimpleCloseClicked}
                                    to={`/${role}/${id}/perfil`}>
                                    Perfil
                                </SMenuLink>
                                <SMenuLink 
                                    onClick={this.onSimpleCloseClicked}
                                    to={`/${role}/${id}/pacientes`}>
                                    Pacientes
                                </SMenuLink>
                                {is_admin && <SMenuLink
                                    onClick={this.onSimpleCloseClicked}
                                    to={`/${role}/${id}/admin`}>
                                    Administrar
                                </SMenuLink>}
                            </span>
                            :
                            <span>
                                <SMenuLink
                                    onClick={this.onSimpleCloseClicked} 
                                    to={`/${role}/${id}/actividades`}>
                                    Actividades
                                </SMenuLink>
                                <SMenuLink
                                    onClick={this.onSimpleCloseClicked}
                                    to={`/${role}/${id}/colecciones`}>
                                    Colecciones
                                </SMenuLink>
                            </span>
                        }
                        <SMenuLink
                            role={role}
                            to={`/${role}`}
                            type='logout'>
                            Salir
                        </SMenuLink>
                    </div>
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { animation: styles.menuAppear };
        this.onAnimatedCloseClicked = this.onAnimatedCloseClicked.bind(this);
        this.onSimpleCloseClicked = this.onSimpleCloseClicked.bind(this);
    }

    /** Métodos extra */
    /** 
     * Métodos encargados de cerrar el menú móvil
     * Nota: Para el logout, el action showMobileMenu(false) se ubica
     * en las páginas de login de cada rol debido a que el menú debe 
     * cerrarse antes de cambiar el usuario de la app a null, esto 
     * con el fin de evitar conflictos.
     */
    onAnimatedCloseClicked() {
        this.setState({ animation: styles.menuDissapear }, () => {
            setTimeout(() => {
                this.props.showMobileMenu(false)
            }, 210);
        })
    }

    onSimpleCloseClicked() {
        this.props.showMobileMenu(false);
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
}

const mapActionsToProps = {
    showMobileMenu
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SMobileMenu);