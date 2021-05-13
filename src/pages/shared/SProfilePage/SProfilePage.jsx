/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SProfilePage.module.css';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { setAvatarVariations } from '@actions/avatar';

import SInfoPanel from '@components/shared/SInfoPanel';
import SSecurityPanel from '@components/shared/SSecurityPanel';
import STAvatarPanel from '@components/therapist/STAvatarPanel';
import STLayout from '@components/layout/STLayout';
import SUserHero from '@components/shared/SUserHero';

import { THERAPIST } from '@data/roles';

class SProfilePage extends Component {
    render() {
        const { user } = this.props;
        let role = null;
        if (user) role = user.Role.name;

        /** Estilos de los botones */
        const base = `ghost-btn ${styles.btn}`;
        const { option } = this.state;

        const btnAvatar = option === 'avatar' ? `${base} ${styles.selected}` : base;
        const btnInfo = option === 'info' ? `${base} ${styles.selected}` : base;
        const btnSecurity = option === 'security' ? `${base} ${styles.selected}` : base;

        return(
            <div className={styles.container}>
                <SUserHero user={user} />
                <STLayout mt={298}>
                    <div className={styles.options}>
                        {
                            role === THERAPIST ?
                            <span className={`flex ${styles.optContainer}`}>
                                <Button
                                    className={btnInfo}
                                    name='info'
                                    onClick={this.onOptionClicked}>
                                    Información
                                </Button>
                                <Button
                                    className={btnAvatar}
                                    name='avatar'
                                    onClick={this.onOptionClicked}>
                                    Avatar
                                </Button>
                                <Button
                                    className={btnSecurity}
                                    name='security'
                                    onClick={this.onOptionClicked}>
                                    Seguridad
                                </Button>
                            </span>
                            :
                            null
                        }
                    </div>
                    {
                        this.state.option === 'avatar' ?
                        <STAvatarPanel />
                        :
                        this.state.option === 'info' ?
                        <SInfoPanel user={user} />
                        :
                        <SSecurityPanel user={user} />
                    }
                </STLayout>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { option: 'avatar' };
        this.onOptionClicked = this.onOptionClicked.bind(this);
    }

    componentWillUnmount() {
        this.props.setAvatarVariations(null);
    }

    /** Métodos extra */
    onOptionClicked(e) {
        this.setState({ option: e.target.name });
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
}

const mapActionsToProps = {
    setAvatarVariations
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SProfilePage);