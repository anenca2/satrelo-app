/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import STStaticField from './STStaticField';

class STStatic extends Component {
    render() {
        return(
            <div>
                <STStaticField {...this.props.static.category} />
                <STStaticField {...this.props.static.subcategory} />
                <STStaticField {...this.props.static.sintactic} />
                <STStaticField {...this.props.static.vocabulary} />
                <STStaticField {...this.props.static.mechanic} />
            </div>
        );
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        static: state.static,
    };
}

export default connect(
    mapStateToProps
)(STStatic);