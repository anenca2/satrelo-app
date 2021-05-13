/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SPActivitiesPage.module.css';
import { connect } from 'react-redux';
import { setMessage } from '@actions/avatar';
import { getActivities, setActivities } from '@actions/activity';

import SEmpty from '@components/shared/SEmpty';
import SPActivity from '@components/patient/SPActivity';
import SPLayout from '@components/layout/SPLayout';
import SSpinner from '@components/shared/SSpinner';

import { messages } from '@data/messages';
const { activities } = messages;

class SPActivitiesPage extends Component {
    render() {
        const { pid } = this.props.match.params;
        let { activities } = this.props;
        activities = activities ? Object.values(activities) : [];

        return(
            <SPLayout>
                <p className={styles.title}>
                    Mis actividades
                </p>
                <div className={styles.listContainer}>
                    {
                        this.state.loading ?
                        <SSpinner color='light' />
                        :
                        activities && activities.length > 0 ?
                        activities.map((activity) => {
                            return(
                                <SPActivity
                                    activity={activity}
                                    id={pid} 
                                    key={activity.id} />
                            );
                        })
                        :
                        <SEmpty color='white'>
                            Aún no tienes actividades asignadas...
                        </SEmpty>
                    }
                </div>
            </SPLayout>
        );
    }

    constructor(props) {
        super(props);
        this.state = { loading: false }
    }

    async componentDidMount() {
        const { pid } = this.props.match.params;

        this.setState({ loading: true });
        await this.props.getActivities(pid);
        this.setState({ loading: false });
    }

    componentDidUpdate() {
        if (this.props.user) {
            /** Enviar mensaje al avatar */
            let message = activities[Math.floor(Math.random() * activities.length)];
            message = `!${this.props.user.name}! ${message}`;

            if (message !== this.props.avatar.message)
                this.props.setMessage(message);
        }
    }

    componentWillUnmount() {
        this.props.setActivities(null);
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        activities: state.activity.activities,
        avatar: state.avatar,
        user: state.user.user,
    };
}

const mapActionsToProps = {
    getActivities,
    setActivities,
    setMessage,
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SPActivitiesPage);