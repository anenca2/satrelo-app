/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './Charts.module.css';
import { Col } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';
import { buildPhrasesSummary } from '@utils/feedback';

import SContainer from '@components/shared/SContainer';

import charts from '@data/charts';
const { doughnut } = charts;

class STDoughnut extends Component {
    render() {
        return(
            <Col 
                sm={this.props.sm}
                md={this.props.md} 
                className={styles.container}>
                <SContainer>
                    <p className={styles.title}>
                        {this.props.title}
                    </p>

                    <Doughnut 
                        data={this.state.chartData}
                        options={this.state.options}
                        height={this.props.height} />

                    <div className={styles.percentage}>
                        {this.state.percentage}%
                    </div>
                    <p className={styles.description}>
                        {this.state.description}
                    </p>
                </SContainer>
            </Col>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
            description: '',
            options: doughnut(),
            percentage: 0
        };
    }

    componentDidMount() {
        const { data } = this.props;
        const { chartData, hits, total } = buildPhrasesSummary(data);
        /** Obtener porcentaje de correctas */
        const { datasets } = chartData;
        const percentage = datasets[0].data[0];

        const description = `El paciente pronunció correctamente ${hits} ` +
                            `de un total de ${total} frases`;

        this.setState({ 
            chartData,
            description,
            percentage,
        });
    }
}

export default STDoughnut;