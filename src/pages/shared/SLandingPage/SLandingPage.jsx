/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SLandingPage.module.css';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { 
    setBar, 
    setParallax,
    showAvatar, 
    showMobileMenu 
} from '@actions/ui';
import { setUser } from '@actions/user';

import SavatarInfo from '@components/landing/SAvatarInfo';
import SDevelop from '@components/landing/SDevelop';
import SFeatures from '@components/landing/SFeatures';
import SFooterBar from '@components/shared/SFooterBar';
import SHero from '@components/landing/SHero';
import SMobile from '@components/landing/SMobile';

import { featuresData } from '@data/features';

class SLandingPage extends Component {
    render() {
        return(
            <Row noGutters>
                <Col xs='12' className={styles.container}>
                    <SHero />
                    <div className={styles.mainPhrase}>
                        ¿Cómo ayuda SATReLO en las terapias de
                        rehabilitación?
                        <p className={styles.mainIdea}>
                            SATReLO ayuda en la mecanización de la 
                            estructuración del lenguaje oral y escrito
                            por medio de la realización de actividades a 
                            modo de juegos
                        </p>
                    </div>
                    <div className={styles.features}>
                        <p className={styles.featuresTitle}>
                            ¿Cómo funciona?
                        </p>
                        <SFeatures 
                            {...this.state.featuresData.therapist} />
                        <SFeatures
                            {...this.state.featuresData.patient} />
                    </div>
                    <SavatarInfo />
                    <SMobile />
                    <SDevelop />
                    <SFooterBar />
                </Col>
            </Row>
        );
    }

    constructor(props) {
        super(props);        
        this.state = { ...this.state, featuresData };
    }

    componentDidMount() {
        this.props.setBar('standard');
        this.props.setParallax(false);
        this.props.showMobileMenu(false);
        this.props.setUser(null);
        this.props.showAvatar(false);
    }
}

const mapActionsToProps = {
    setUser,
    setBar,
    setParallax,
    showAvatar,
    showMobileMenu
}

export default connect(
    null,
    mapActionsToProps
)(SLandingPage);
