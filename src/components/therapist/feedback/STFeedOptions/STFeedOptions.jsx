/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STFeedOptions.module.css';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

import { mechanics } from '@data/mechanics';

class STFeedOptions extends Component {
    render() {
        const { option } = this.state;
        const base = `secondary-btn-outline ${styles.btn}`;
        /** Definición de los estilos de los botones */
        let btnVocal = option === 'vocalization' ? 
                         `${base} ${styles.selected}` : base;

        let btnMecha = option === 'inGame' ? 
                         `${base} ${styles.selected}` : base;

        let btnLevel = option === 'levels' ? 
                         `${base} ${styles.selected}` : base;

        let btnTimes = option === 'times' ? 
                         `${base} ${styles.selected}` : base;

        /** Deshabilitar botones de acuerdo a la descripción semántica */
        if (this.state.description === 2) {
            btnVocal = `${btnVocal} ${styles.disabled}`;
            btnMecha = `${btnMecha} ${styles.disabled}`;
        }
        
        const { feedback } = this.props;
        let contWidth = 400;
        let btnWidth = 32.5;
        if (feedback === 'historical') {
            contWidth = 500;
            btnWidth = 24.5;
        }

        return(
            <div 
                className={`flex ${styles.btnContainer}`}
                style={{ '--contWidth': `${contWidth}px` }}>
                <Button
                    className={btnVocal}
                    name='vocalization'
                    onClick={this.onOptionClicked}
                    style={{ '--btnWidth': `${btnWidth}%` }}>
                    {
                        this.props.windowWidth < 767 &&
                        feedback === 'historical' ?
                        <span className={styles.span}>
                            Vocaliza...
                        </span>
                        :
                        <span className={styles.span}>
                            Vocalización
                        </span>
                    }
                </Button>
                <Button
                    className={btnMecha}
                    name='inGame'
                    onClick={this.onOptionClicked}
                    style={{ '--btnWidth': `${btnWidth}%` }}>
                    Juego
                </Button>
                <Button
                    className={btnLevel}
                    name='levels'
                    onClick={this.onOptionClicked}
                    style={{ '--btnWidth': `${btnWidth}%` }}>
                    Niveles
                </Button>
                {feedback === 'historical' && <Button
                    className={btnTimes}
                    name='times'
                    onClick={this.onOptionClicked}
                    style={{ '--btnWidth': `${btnWidth}%` }}>
                    Tiempos
                </Button>}
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { description: 1, option: 'vocalization' }
        this.onOptionClicked = this.onOptionClicked.bind(this);
    }

    componentDidMount() {
        this.setStateValues();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mechanic !== this.props.mechanic)
            this.setStateValues();
    }

    /** Métodos extra */
    onOptionClicked(e) {
        const { name } = e.target;
        const { description } = this.state;
        this.setState({ option: name });
        this.props.onOptionClicked({ description, option: name });
    }

    setStateValues() {
        const { feedback } = this.props;
        let description = 1;
        if (feedback === 'historical')
            description = mechanics[this.props.mechanic].semantic_description;
        else
            description = this.props.activity.Mechanic.semantic_description;

        const option = description === 1 ? 'vocalization' : 'levels';
        this.setState({ description, option });
        this.props.onOptionClicked({ description, option });
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        activity: state.activity.activity,
        windowWidth: state.ui.windowWidth
    };
}

export default connect(
    mapStateToProps
)(STFeedOptions);