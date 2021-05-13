/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STMechanics.module.css';
import { Button, UncontrolledTooltip } from 'reactstrap';

import { mechanics } from '@data/mechanics';

class STMechanics extends Component {
    render() {
        return(
            <div className={`flex ${styles.container}`}>
                {this.state.mechanics.map(mechanic => {
                    let base = styles.btn;
                    if (mechanic.id === this.state.selected)
                        base = `${base} ${styles.selected}`;

                    return (
                        <div key={mechanic.id}>
                            <Button
                                className={`ghost-btn ${base}`}
                                id={`utooltip${mechanic.name}`}
                                name={mechanic.id}
                                onClick={this.onMechanicClicked}>
                                {mechanic.alias}
                            </Button>
                            <UncontrolledTooltip
                                placement='right'
                                target={`utooltip${mechanic.name}`}>
                                {mechanic.name}
                            </UncontrolledTooltip>
                        </div>
                    );
                })}
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { 
            mechanics: Object.values(mechanics),
            selected: 1
        };
        this.onMechanicClicked = this.onMechanicClicked.bind(this);
    }

    /** Métodos extra */
    onMechanicClicked(e) {
        let { name } = e.target;
        name = parseInt(name, 10);
        this.setState({ selected: name });
        this.props.onMechanicClicked(name);
    }
}

export default STMechanics;