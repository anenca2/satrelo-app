/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SAUsersPage.module.css';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers, setUsers } from '@actions/user';

import SAUser from '@components/admin/SAUser';
import SEmpty from '@components/shared/SEmpty';
import SSearch from '@components/shared/SSearch';
import SSpinner from '@components/shared/SSpinner';
import STLayout from '@components/layout/STLayout';

class SAUsersPage extends Component {
    render() {
        const { tid } = this.props.match.params;
        let { users } = this.props;
        users = users ? Object.values(users) : [];

        return(
            <STLayout pt={50}>
                <div className={styles.title}>Todos los usuarios</div>
                <div className={`flex ${styles.toolsContainer}`}>
                    <SSearch />
                    <Link to={`/terapeuta/${tid}/nuevo`}>
                        <Button 
                            className={`secondary-btn ${styles.btnCreate}`}>
                            Nuevo
                        </Button>
                    </Link>
                </div>
                <div className={styles.listContainer}>
                    {
                        this.state.loading ?
                        <SSpinner color='primary' />
                        :
                        users.length > 0 ?
                        users.map(user => {
                            return <SAUser 
                                admin={true}
                                key={user.id} 
                                user={user}
                                userId={tid} />
                        })
                        :
                        <SEmpty>
                            No se han encontrado usuarios en el sistema.
                            Recuerda que como administrador puedes crear 
                            usuarios nuevos
                        </SEmpty>
                    }
                </div>
            </STLayout>
        );
    }

    constructor(props) {
        super(props);
        this.state = { loading: false }
    }

    componentDidMount() {
        this.getAllUsers();
    }

    componentWillUnmount() {
        this.props.setUsers(null);
    }

    /** Métodos extra */
    async getAllUsers() {
        this.setState({ loading: true });
        await this.props.getUsers();
        
        this.setState({ loading: false });
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        users: state.user.users
    };
}

const mapActionsToProps = {
    getUsers,
    setUsers
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SAUsersPage);