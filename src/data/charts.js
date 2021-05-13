/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

const chartOptions = {
    doughnut: () => {
        return {
            legend: {
                labels: {
                    boxWidth: 10,
                    usePointStyle: true
                }
            },
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: (tooltipItem, data) => {
                        const label = data.labels[tooltipItem.index];
                        const value = data.datasets[0].data[tooltipItem.index];
                        return `${value}% de ${label.toLowerCase()}`;
                    }
                }
            }
        }
    },

    line: (metric) => {
        return {
            legend: {
                align: 'end',
                labels: {
                    boxWidth: 10,
                    usePointStyle: true
                }
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: metric === 'match' ? 
                                    'Apariciones del vocabulario' : 'Sesiones'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: metric === 'match' ? 
                                    'Número de errores' : 'Minutos'
                    },
                    ticks: {
                        beginAtZero: true,
                        steps: 10,
                        stepSize: metric === 'match' ? 1 : 10,
                        max: metric === 'match' ? 10 : 60
                    }
                }]
            },
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: (tooltipItem, data) => {
                        let label = tooltipItem.yLabel;
                        label = label + `${metric === 'match' ?
                                ' error(es)' : ' minuto(s)'}`;
                                    
                        return label;

                    },
                    title: (tooltipItems, data) => {
                        if (metric === 'match') {
                            const label = tooltipItems[0].yLabel;
                            return `${label} error(es) de ${label + 1} intento(s)`
                        }
                        else {
                            const label = tooltipItems[0].xLabel;
                            return `Sesión ${label}`;
                        }
                    }
                }
            }
        }
    },

    stackBar: () => {
        return {
            legend: {
                align: 'end',
                labels: {
                    boxWidth: 10,
                    usePointStyle: true
                }
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Palabras asociadas'
                    },
                    stacked: true
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: '% de aciertos/desaciertos'
                    },
                    ticks: {
                        beginAtZero: true,
                        steps: 10,
                        stepSize: 10,
                        max: 100
                    },
                    stacked: true
                }]
            },
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: (tooltipItem, data) => {
                        let yLabel = data.datasets[tooltipItem.datasetIndex].label;
                        return tooltipItem.yLabel + '% de ' +
                                yLabel.toLowerCase();
                                
                    },
                    title: (tooltipItems, data) => {
                        const split = tooltipItems[0].xLabel.split('(');
                        const word = split[0];
                        const right = split[1];
                        const total = parseInt(right.split(')')[0], 10);
                        const part = Math.round((tooltipItems[0].yLabel) * total / 100);

                        return `${word}(${part} de ${total})`;
                    }
                }
            }
        }
    }
}

export default chartOptions;