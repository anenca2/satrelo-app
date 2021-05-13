/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STActivity.module.css';
import { Link } from 'react-router-dom';
import { getFormattedDate } from '@utils/date&time';

import STActivityButtons from './STActivityButtons';
import STSynctaticCircle from './STSyntacticCircle';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class STActivity extends Component {
    render() {
        const aid = this.props.activity.id;
        const date = this.props.activity.date_from.split('T')[0];
        const sid = this.props.activity.Syntactic_Structure ? 
                    this.props.activity.Syntactic_Structure.id : null;

        const { pid, tid } = this.props;

        const { logo_path } = this.props.activity.Activity;

        return(
            <div className={styles.container}>
                <div className={`flex ${styles.innerContainer}`}>
                    <img
                        alt=''
                        className={styles.aimage}
                        src={SERVER_URL + logo_path} />
                    <div className={styles.rightContainer}>
                        <div className={`flex ${styles.nameContainer}`}>
                            <div className={styles.title}>
                                { this.props.activity.Activity.name }
                            </div>
                            <div className={styles.date}>
                                { this.getFormattedDate(date) }
                            </div>
                        </div>
                        {sid && <div className={`flex ${styles.syntContainer}`}>
                                <STSynctaticCircle letter='S' id={sid} />
                                <STSynctaticCircle letter='AD' id={sid} />
                                <STSynctaticCircle letter='V' id={sid} />
                            </div>
                        }
                        <div className={styles.description}>
                            { this.props.activity.Activity.description }
                        </div>
                        <Link 
                            to={
                                `/terapeuta/${tid}/pacientes/${pid}/` + 
                                `actividades/${aid}/evolución`
                            }
                            className={`ghost-btn ${styles.btnEvolution}`}>
                            Ver evolución
                        </Link>
                        <STActivityButtons activity={this.props.activity} />
                    </div>
                </div>
            </div>
        );
    }

    /** Métodos extra */
    getFormattedDate = (date) => {
        return getFormattedDate(date);
    }
}

export default STActivity;