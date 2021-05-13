/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import STDynamicField from './STDynamicField';

class STDynamic extends Component {
    render() {
        return(
            <div>
                <STDynamicField {...this.props.dynamic.mechanic} />
                <STDynamicField {...this.props.dynamic.situations} />
                <STDynamicField {...this.props.dynamic.times} />
                <STDynamicField {...this.props.dynamic.reader} />
            </div>
        );
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        dynamic: state.dynamic
    };
}

export default connect(
    mapStateToProps
)(STDynamic);