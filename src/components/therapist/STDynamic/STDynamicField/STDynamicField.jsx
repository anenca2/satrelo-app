/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getDynamicOptions,
    resetDynamicOptions,
    setDynamicSelectedOptions
} from '@actions/dynamic';
import {
    showCreateActivityButton
} from '@actions/ui';

import STField from '@components/therapist/STField';

class STDynamicField extends Component {
    render() {
        return(
            <STField 
                {...this.props} 
                onOptionSelected={this.onOptionSelected} />
        );
    }

    constructor(props) {
        super(props);
        this.onOptionSelected = this.onOptionSelected.bind(this);
    }

    async componentDidMount() {
        /** Obtener las opciones si es el primer field */
        if (this.props.first)
            this.getOptions({ fieldId: this.props.id });
    }

    componentWillUnmount() {
        /** Limpiar configuraciones y selecciones */
        const fields = [
            'mechanic',
            'situations',
            'times',
            'reader'
        ];
        fields.forEach(field => {
            this.props.resetDynamicOptions({ fieldId: field });
        });
        
        this.props.showCreateActivityButton(false);
    }

    /** Métodos extra */
    buildDynamic(option) {
        /** Resetear las opciones relacionadas */
        const { reset } = this.props;
        if (reset)
            reset.forEach(r => {
                this.props.resetDynamicOptions({ fieldId: r });
            });
        
        /** Esconder el botón encargado de mandar a crear la actividad */
        this.props.showCreateActivityButton(false);

        /** Setear la opción seleccionada */
        this.props.setDynamicSelectedOptions({
            fieldId: this.props.id,
            optionId: option.id
        });

        /** Obtener las opciones del siguiente field */
        if (this.props.next) {
            let data = { fieldId: this.props.next };
            /** 
             * Verificar si el siguiente field requiere los ids
             * de las opciones elegidas anteriormente
             */
            const field = this.props.dynamic[this.props.next];
            if (field.required) {
                const requiredIds = this.getRequiredIds(field.required);
                data.required = requiredIds;
            }

            this.getOptions(data);
        }
        else
            this.props.showCreateActivityButton(true);
    }

    async getOptions(data) {
        await this.props.getDynamicOptions(data);
    }

    /** Obtener los ids de los fields requeridos */
    getRequiredIds(required) {
        let rIds = {};
        required.forEach(r => {
            const rField = this.props.dynamic[r];
            const options = Object.values(rField.options);
            options.forEach(option => {
                if (option.selected)
                    rIds[`${rField.id}Id`] = option.id;
            });
        });

        return rIds;
    }

    onOptionSelected(option) {
        this.buildDynamic(option);
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        dynamic: state.dynamic
    };
}

const mapActionsToProps = {
    getDynamicOptions,
    resetDynamicOptions,
    setDynamicSelectedOptions,
    showCreateActivityButton,
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(STDynamicField);