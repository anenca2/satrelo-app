/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    addStaticSelectedOption,
    getStaticOptions,
    resetStaticOptions, 
    setStaticSelectedOptions
} from '@actions/static';
import {
    showCreateActivityButton
} from '@actions/ui';

import STField from '@components/therapist/STField';

class STStaticField extends Component {
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

    componentDidMount() {
        /** Obtener las opciones si es el primer field */
        if (this.props.first)
            this.getOptions({ fieldId: this.props.id });
    }

    componentWillUnmount() {
        /** Limpiar todas las opciones y selecciones configuradas */
        const fields = [ 
            'category', 
            'subcategory', 
            'sintactic', 
            'vocabulary',
            'mechanic' 
        ];
        fields.forEach(field => {
            this.props.resetStaticOptions({ fieldId: field });
        });
        
        this.props.showCreateActivityButton(false);
    }

    /** Métodos extra */
    buildStatic(option) {
        /** Resetear las opciones relacionadas */
        const { reset } = this.props;
        if (reset)
            reset.forEach(r => {
                this.props.resetStaticOptions({ fieldId: r });
            });
        
        /** Esconder el botón encargado de mandar a crear la actividad */
        this.props.showCreateActivityButton(false);

        let getNextOptions = true;
        if (this.props.multichoice) {
            /** Adicionar opciones seleccionadas */
            this.props.addStaticSelectedOption({
                fieldId: this.props.id,
                optionId: option.id
            });

            getNextOptions = this.checkMinimun();
        }
        else {
            /** Setear opciones como seleccionadas */
            this.props.setStaticSelectedOptions({ 
                fieldId: this.props.id, 
                optionId: option.id 
            });
        }

        /** Pedir la información del siguiente field */
        if (getNextOptions) {
            if (this.props.next) {
                let data = { fieldId: this.props.next };
                /** 
                 * Verificar si el próximo field requiere ids
                 * de las opciones elegidas
                 */
                const field = this.props.static[this.props.next];
                if (field.required) {
                    const requiredIds = this.getRequiredIds(field.required);
                    data.required = requiredIds;
                }
                
                this.getOptions(data);
            }
            else
                this.props.showCreateActivityButton(true);
        }
    }

    /** Chequear si se cumple el mínimo de selecciones necesarias */
    checkMinimun() {
        let { options } = this.props;
        options = Object.values(options);
        let selected = 0;
        options.forEach(option => {
            if (option.selected) selected += 1;
        });

        return selected >= this.props.minimum;
    }

    async getOptions(data) {
        await this.props.getStaticOptions(data);
    }

    /** Obtener los ids de los fields requeridos */
    getRequiredIds(required) {
        let rIds = {};
        required.forEach(r => {
            const rField = this.props.static[r];
            const options = Object.values(rField.options);
            options.forEach(option => {
                if (option.selected)
                    rIds[`${rField.id}Id`] = option.id;
            });
        });

        return rIds;
    }

    onOptionSelected(option) {
        this.buildStatic(option);
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        static: state.static
    };
}

const mapActionsToProps = {
    addStaticSelectedOption,
    getStaticOptions,
    resetStaticOptions,
    setStaticSelectedOptions,
    showCreateActivityButton,
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(STStaticField);