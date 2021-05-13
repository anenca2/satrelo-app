/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STACustomizer.module.css';
import { Button, Col, Row } from 'reactstrap';

import SContainer from '@components/shared/SContainer';

import { options, eye, hair, torso } from '@data/customizer';

class STACustomizer extends Component {
    render() {
        return(
            <SContainer padding={0}>
                <div className={`${styles.container} ${styles.header}`}>
                    <Row noGutters>
                        {this.buildOptions()}
                    </Row>
                </div>                
                {this.buildSections()}
            </SContainer>
        );
    }
    
    constructor(props) {
        super(props);
        this.state = { options, eye, hair, torso, option: 'eye' };
        this.onOptionClicked = this.onOptionClicked.bind(this);
        this.onSectionOptionClicked = this.onSectionOptionClicked.bind(this);
    }

    /** Métodos extra */
    /** Métodos de construcción de la UI */
    buildOptions() {
        const options = Object.values(this.state.options);
        return options.map(option => {
            let styleClass = `ghost-btn ${styles.btn}`;
            if (option.dbalias === this.state.option)
                styleClass = `${styleClass} ${styles.selected}`;

            return(
                <Col xs='2' className={styles.col} key={option.id}>
                    <Button
                        className={styleClass}
                        name={option.dbalias}
                        onClick={this.onOptionClicked}
                        style={{ 
                            backgroundImage: `url(${option.icon})`, 
                            backgroundSize: 'contain' }}>                        
                    </Button>
                </Col>
            );
        });
    }

    buildSections() {
        const { option } = this.state;
        const sections = Object.values(this.state[option]);
        return sections.map((section, i) => {
            return( 
                <div className={styles.container} key={i}>
                    <div className={styles.title}>
                        {section.title}
                    </div>
                    <Row noGutters>
                        {this.buildSectionsOptions(section)}
                    </Row>
                </div>
            );
        });
    }

    buildSectionsOptions(section) {
        const { kind, name } = section;
        const options = Object.values(section.options);
        return options.map(option => {
            let styleClass = `ghost-btn ${styles.btn} ${styles[kind]}`;
            if (option.selected) styleClass = `${styleClass} ${styles.selected}`;

            let inStyle = {};
            if (option.colorHex)
                inStyle = { "--btnColor": option.colorHex, backgroundColor: option.colorHex };

            return(
                <Col xs='2' className={styles.col} key={option.id}>
                    <Button
                        className={styleClass}
                        name={`${name}-${option.button}-${option.name}`}
                        onClick={this.onSectionOptionClicked}
                        style={inStyle}>
                    </Button>
                </Col>
            );
        });
    }

    /** Eventos */
    onOptionClicked(e) {
        this.setState({ option: e.target.name });
    }

    onSectionOptionClicked(e) {
        const { name } = e.target;
        /** Obtener el nombre de la sección y el nombre del botón */
        const names = name.split('-');
        const section = names[0];
        const sectionOpt = names[1];
        const optionName = names[2];

        /** Marcar como seleccionado en el estado */
        const { option } = this.state;
        let options = this.state[option];
        let soptions = Object.values(options[section].options);
        soptions.forEach(soption => {
            soption.selected = soption.button === sectionOpt ? true : false;
        });

        this.setState({ [option]: options });

        /** Mandar a traer la imagen con las características seleccionadas */
        this.props.onOptionSelected({ 
            option, section, selected: optionName 
        });
    }
}

export default STACustomizer;