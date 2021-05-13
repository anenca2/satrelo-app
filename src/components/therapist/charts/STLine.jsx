/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './Charts.module.css';
import { Col } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { 
    buildMatchErrorsData, 
    buildTimes 
} from '@utils/feedback';

import SContainer from '@components/shared/SContainer';

import charts from '@data/charts';
const { line } = charts;

class STLine extends Component {
    render() {
        return(
            <Col 
                sm={this.props.sm} 
                md={this.props.md} 
                className={styles.container}>
                <SContainer>
                    <p className={styles.title}>
                        {
                            this.props.metric === 'match' ?
                            <span>{this.props.title}</span>
                            :
                            <span>Tiempos en minutos</span>
                        }
                    </p>

                    <Line
                        data={this.state.chartData}
                        options={this.state.options}
                        height={this.props.height} />
                </SContainer>
            </Col>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
            options: line(this.props.metric)
        }
    }

    componentDidMount() {
        const { data, metric, title } = this.props;
        if (data) {
            const chartData = metric === 'match' ? 
                                buildMatchErrorsData(data, title)
                                :
                                buildTimes(data);
            this.setState({ chartData });
        }
    }
}

export default STLine;