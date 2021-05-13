/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintianer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SPLayout.module.css';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';

class SPLayout extends Component {
    render() {
        const { vOffset } = this.props.ui;
        
        return(
            <div className={`flex ${styles.outerContainer}`}>
                <Row className={styles.rowContainer} noGutters>
                    <Col
                        xs='12' 
                        sm='12' 
                        md={{ size: 7, offset: 5 }}
                        style={{ '--vOffset': `${vOffset}px` }}>
                        <div className={styles.container}>
                            { this.props.children }
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        ui: state.ui,
    };
}

export default connect(
    mapStateToProps
)(SPLayout);