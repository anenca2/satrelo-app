/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SPCollectionsPage.module.css';
import { connect } from 'react-redux';
import { setMessage } from '@actions/avatar';
import { getCollections, setCollections } from '@actions/collection';

import SEmpty from '@components/shared/SEmpty';
import SPCollection from '@components/patient/SPCollection';
import SPLayout from '@components/layout/SPLayout';
import SSpinner from '@components/shared/SSpinner';

import { messages } from '@data/messages';
const { collections } = messages;

class SPCollectionsPage extends Component {
    render() {
        let { collections } = this.props;
        collections = collections ? Object.values(collections) : [];

        return(
            <SPLayout>
                <div className={styles.container}>
                    <div className='flex'>
                        <div className={styles.title}>Colecciones</div>
                        <div className={`flex ${styles.score}`}>
                            <div>Tienes {this.props.user && this.props.user.score}</div>
                            <img
                                alt=''
                                className={styles.scoreIcon}
                                src='/images/other/star.png' />
                        </div>
                    </div>
                    {
                        this.state.loading ?
                        <SSpinner color='light' />
                        :
                        collections &&
                        collections.length > 0 ?
                        collections.map((collection) => {
                            return(
                                <SPCollection
                                    {...collection}
                                    key={collection.id}
                                    userId={this.state.userId} />
                            );
                        })
                        :
                        <SEmpty color='white'>
                            No se encontraron colecciones.
                        </SEmpty>
                    }
                </div>
            </SPLayout>
        );
    }

    constructor(props) {
        super(props);
        this.state = { loading: false, userId: null };
    }

    componentDidMount() {
        /** Enviar mensaje al avatar */
        const message = collections[Math.floor(Math.random() * collections.length)];
        this.props.setMessage(message);
        
        this.setState({ userId: this.props.match.params.pid }, () => {
            this.getCollectionsList();
        });
    }

    componentWillUnmount() {
        this.props.setCollections(null);
    }

    /** Métodos extra */
    async getCollectionsList() {
        this.setState({ loading: true });
        await this.props.getCollections();
        this.setState({ loading: false });
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        collections: state.collection.collections,
        user: state.user.user
    };
}

const mapActionsToProps = {
    getCollections,
    setCollections,
    setMessage,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SPCollectionsPage);