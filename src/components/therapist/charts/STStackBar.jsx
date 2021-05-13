/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './Charts.module.css';
import { Col } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { buildWordHitsData } from '@utils/feedback';

import SContainer from '@components/shared/SContainer';

import charts from '@data/charts';
const { stackBar } = charts;

class STStackBar extends Component {
    render() {
        return(
            <Col 
                sm={this.props.sm} 
                md={this.props.md} 
                lg={this.props.lg} 
                className={styles.container}>
                <SContainer>
                    <p className={styles.title}>
                        {this.props.title}
                    </p>
                    <Bar
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
            options: stackBar()
        }
    }

    componentDidMount() {
        const { color, data, title } = this.props;
        if (data) {
            const chartData = buildWordHitsData(data, title, color);
            this.setState({ chartData });
        }
    }
}

export default STStackBar;