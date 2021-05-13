/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './STAvatarPanel.module.css';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { 
    getAvatarVariation, 
    getAvatarVariations
} from '@actions/avatar';
import { getUser, updateUser } from '@actions/user';

import SCarousel from '@components/shared/SCarousel';
import STACustomizer from './STACustomizer';

class STAvatarPanel extends Component {
    render() {
        let { variations } = this.props;
        variations = variations ? Object.values(variations) : [];
        
        return(
            <Row className={styles.container} noGutters>
                <Col className={styles.carousel} sm='12' md='7'>
                    {variations && <SCarousel 
                        items={variations}
                        kind='avatar'
                        onCarouselChanged={this.onCarouselChanged} />}
                </Col>
                <Col sm='12' md='5'>
                    <STACustomizer
                        onOptionSelected={this.onOptionSelected} />
                </Col>
            </Row>
        );
    }

    constructor(props) {
        super(props);
        this.state = { current: null, eye: null, hair: null, torso: null };
        this.onCarouselChanged = this.onCarouselChanged.bind(this);
        this.onOptionSelected = this.onOptionSelected.bind(this);
    }

    componentDidMount() {
        if (this.props.user) this.getVariations();
    }

    componentDidUpdate() {
        if (this.props.user && !this.props.variations) 
            this.getVariations();

        if (this.props.variations) {
            const variations = Object.values(this.props.variations);
            if (this.state.current !== variations[0])
                this.setState({ current: variations[0] });
        }
    }

    /** Métodos extra */
    /** Obtener una variación determinada */
    async getVariation() {
        let state = Object.assign({}, this.state);
        let current = Object.assign({}, state.current);
        delete state.current;
        /** Construir el data para el request */
        const keys = Object.keys(state);
        let data = { id_avatar: current.id_avatar };
        keys.forEach(key => {
            const value = this.state[key];
            if (value) data[key] = value;
        });
        /** Borrar los valores que no se necesitan en current */
        delete current.id;
        delete current.img_path;
        delete current.thumbnail_path;
        data = { ...current, ...data };
        /** Realizar el request para obtener la variación */
        const response = await this.props.getAvatarVariation(data);
        const variationData = response.data;

        /** Guardar la variación del avatar en el usuario */
        const userData = { 
            id: this.props.user.id,
            id_avatar_variation: variationData.id 
        };
        await this.props.updateUser(userData, this.props.user.id);
        await this.props.getUser(this.props.user.id); // Actualizar el usuario de manera confiable
    }

    /** Obtener una variación dependiendo del género */
    async getVariations() {
        const { Avatar_Variation, gender } = this.props.user;
        await this.props.getAvatarVariations(gender, Avatar_Variation);
    }

    onCarouselChanged(selected) {
        if (selected !== this.state.current)
            this.setState({ current: selected });
    }

    onOptionSelected(data) {
        /** Actualizar el valor de la opción seleccionada en el estado */
        const { option, section, selected } = data;
        let current = this.state[option];
        if (current) 
            current[section] = selected;
        else
            current = { [section]: selected };
        
        this.setState({ [option]: current }, () => {
            this.getVariation();
        });
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        variations: state.avatar.variations
    };
}

const mapActionsToProps = {
    getAvatarVariation,
    getAvatarVariations,
    getUser,
    updateUser
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(STAvatarPanel);