/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SPCollectableInfoPage.module.css';
import { connect } from 'react-redux';
import { setMessage } from '@actions/avatar';
import { getCollectable, setCollectable } from '@actions/collection';

import SEmpty from '@components/shared/SEmpty';
import SCarousel from '@components/shared/SCarousel';
import SPLayout from '@components/layout/SPLayout';
import SSpinner from '@components/shared/SSpinner';

import { messages } from '@data/messages';
const { collectable } = messages;

class SPCollectableInfoPage extends Component {
    render() {
        const { collectable } = this.props;

        return(
            <SPLayout>
                {
                    this.state.loading ?
                    <SSpinner color='light' />
                    :
                    collectable ?
                    <div className={styles.container}>
                        <div className='flex'>
                            <div className={styles.title}>
                                { collectable.name }
                            </div>
                            <div className={`flex ${styles.score}`}>
                                <div>Tienes {this.props.user && this.props.user.score}</div>
                                <img 
                                    alt=''
                                    className={styles.scoreIcon}
                                    src='/images/other/star.png' />
                            </div>
                        </div>
                        <SCarousel 
                            items={Object.values(collectable.Skins)}
                            onCarouselChanged={this.onCarouselChanged}
                            userId={this.state.userId} />
                        <p className={styles.descriptionTitle}>
                            Resumen
                        </p>
                        <p className={styles.description}>
                            { this.state.currentSkin && 
                                this.state.currentSkin.summary }
                        </p>
                    </div>
                    :
                    <SEmpty color='white'>
                        No se encontró información del coleccionable.
                    </SEmpty>
                }
            </SPLayout>
        );
    }

    constructor(props) {
        super(props);
        this.state = { 
            currentSkin: null, loading: true, userId: null 
        };

        this.onCarouselChanged = this.onCarouselChanged.bind(this);
    }

    componentDidMount() {
        /** Enviar mensaje al avatar */
        const message = collectable[Math.floor(Math.random() * collectable.length)];
        this.props.setMessage(message);

        this.setState({ userId: this.props.match.params.pid }, () => {
            this.getCollectableInfo();
        });
    }

    componentWillUnmount() {
        this.props.setCollectable(null);
    }

    /** Métodos extra */
    async getCollectableInfo() {
        this.setState({ loading: true });
        let { id, cid } = this.props.match.params;

        const response = await this.props.getCollectable(id, cid);
        const { data, error } = response;
        const skins = Object.values(data.Skins);
        const skin = error ? null : skins[0];

        this.setState({ currentSkin: skin, loading: false });
    }

    onCarouselChanged(itemSelected) {
        this.setState({ currentSkin: itemSelected });
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        collectable: state.collection.collectable,
        user: state.user.user,
    };
}

const mapActionsToProps = {
    getCollectable,
    setCollectable,
    setMessage,
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SPCollectableInfoPage);