/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { 
    setBar, 
    setParallax,
    showAvatar, 
    showMobileMenu 
} from '@actions/ui';
import { setUser } from '@actions/user';

import STLogin from '@components/therapist/STLogin';

/** Página Landing del terapeuta */
class STLandingPage extends Component {
    render() {
        const { vOffset } = this.props.ui;

        return(
            <Row noGutters>
                <Col sm='12' md='6'>
                </Col>
                <Col sm='12' md='6'>
                    <div 
                        className='flex' 
                        style={{
                            alignItems: 'flex-start', 
                            justifyContent: 'center',
                            height: `calc(100vh - ${vOffset}px)`
                        }}>
                        <STLogin />
                    </div>
                </Col>
            </Row>
        );
    }

    componentDidMount() {
        this.props.setBar('standard');
        this.props.setParallax(false);
        this.props.showMobileMenu(false);
        this.props.setUser(null);
        this.props.showAvatar(false);
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        ui: state.ui
    };
}

const mapActionsToProps = {
    setBar,
    setParallax,
    setUser,
    showAvatar,
    showMobileMenu,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(STLandingPage);