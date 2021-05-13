/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SMenu.module.css';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from 'reactstrap';
import { connect } from 'react-redux';

import { THERAPIST } from '@data/roles';

import SMenuHeader from '@components/shared/SMenuHeader';
import SMenuLink from '@components/shared/SMenuLink';

const serverURL = process.env.REACT_APP_SERVER_URL;

class SMenu extends Component {
    render() {
        const { id, Role } = this.props.user;
        const role = Role.name;

        return(
            <Dropdown
                className={styles.container}
                isOpen={this.state.isOpen}
                toggle={this.toggle}>
                <DropdownToggle className={`flex ghost-btn ${styles.toggle}`}>
                    <span className={styles.name}>
                        { this.props.user.name }
                    </span>
                    {
                        this.props.user.profile_img ? 
                        <img 
                            alt=''
                            className={styles.image}
                            src={`${serverURL}${this.props.user.profile_img}`} />
                        :
                        <div
                            className={`flex ${styles.image} ${styles.thumb}`}
                            style={{ backgroundColor: this.props.user.color }}>
                            { this.props.user.thumbnail_alias }
                        </div>
                    }
                </DropdownToggle>

                <DropdownMenu className={styles.menu}>
                    <DropdownItem header>
                        <SMenuHeader user={this.props.user} />
                    </DropdownItem>
                    <DropdownItem divider />
                    {
                        role === THERAPIST ?
                        <span>
                            <DropdownItem className={styles.item}>
                                <SMenuLink to={`/${role}/${id}/perfil`}>
                                    Perfil
                                </SMenuLink>
                            </DropdownItem>
                        </span>
                        : null
                    }
                    <DropdownItem className={styles.item}>
                        <SMenuLink 
                            role={role}
                            to={`/${role}`}
                            type='logout'>
                            Salir
                        </SMenuLink>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggle = this.toggle.bind(this);
    }

    /** Métodos extra */
    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
}

export default connect(
    mapStateToProps
)(SMenu);