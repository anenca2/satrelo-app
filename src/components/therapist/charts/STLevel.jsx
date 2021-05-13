/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './Charts.module.css';
import { Col } from 'reactstrap';
import { getDatesDifference } from '@utils/date&time';

import SContainer from '@components/shared/SContainer';

class STLevel extends Component {
    render() {
        const { data } = this.props;
        return(
            <Col
                sm={this.props.sm}
                md={this.props.md}
                lg={this.props.lg} 
                className={styles.container}>
                <SContainer>
                    <div className='flex'>
                        <div style={{ width: '100%' }}>
                            <div className='flex'>
                                <div className={styles.title}>
                                    Nivel {data.level}
                                </div>
                                <div className={styles.title}>
                                    Sesión {data.id_session}
                                </div>
                            </div>
                            <div className={styles.score}>{data.score}</div>
                            <div className={styles.subtitle}>Puntos ganados</div>
                            <div className={`${styles.score} ${styles.mt20}`}>
                                {this.setLevelTime()}
                            </div>
                            <div className={styles.subtitle}>
                                Minutos para terminar nivel
                            </div>
                        </div>
                    </div>
                </SContainer>
            </Col>
        );
    }

    /** Métodos extra */
    setLevelTime() {
        const { date_start, date_end } = this.props.data;
        const diff = getDatesDifference(date_start, date_end).minutes;
        return diff ? Math.round(diff) : 0;
    }
}

export default STLevel;