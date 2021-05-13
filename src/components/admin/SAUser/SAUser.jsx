/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SAUser.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setToUpdate } from '@actions/user';

const serverURL = process.env.REACT_APP_SERVER_URL;

class SAUser extends Component {
    render() {
        const { userId, user } = this.props;
        return(
            <div className={`flex ${styles.container}`}>
                <div className={`flex`}>
                    {
                        user.profile_img ?
                        <img
                            alt=''
                            className={styles.uimage}
                            src={`${serverURL}${user.profile_img}`} />
                        :
                        <div
                            className={`flex ${styles.uimage} ${styles.thumb}`}
                            style={{ backgroundColor: user.color }}>
                            { user.thumbnail_alias }
                        </div>
                    }
                    <div className={styles.infoContainer}>
                        <div className={styles.name}>
                            { user.name } {user.last_name}
                        </div>
                        <div className={styles.identification}>
                            ID { user.id }
                        </div>
                    </div>
                </div>
                <Link
                    className={`ghost-btn ${styles.btnEdit}`}
                    onClick={this.onLinkClicked}
                    to={`/terapeuta/${userId}/editar/${user.id}`}>
                    <FontAwesomeIcon icon={faEdit} size='lg' />
                </Link>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.onLinkClicked = this.onLinkClicked.bind(this);
    }

    /** Métodos extra */
    onLinkClicked() {
        this.props.setToUpdate(this.props.user);
    }
}

/** Elementos del store */
const mapActionsToProps = {
    setToUpdate
};

export default connect(
    null,
    mapActionsToProps
)(SAUser);