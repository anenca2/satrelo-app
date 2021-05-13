/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SPCollectable.module.css';
import { Button, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPatientSkin, setPatientSkins } from '@actions/collection';
import { getUser, updateUser } from '@actions/user';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class SPCollectable extends Component {
    render() {
        const { userId } = this.props;
        const { collectable } = this.props;
        const { id, id_collection } = collectable;
        const cid = id_collection;
        const { img_path } = collectable.Skins;
        
        return(
            <div className={styles.container}>
                <Link 
                    className={`ghost-btn ${styles.btn}`}
                    to={`/paciente/${userId}/colecciones/${cid}/coleccionable/${id}`}>
                </Link>
                <img
                    alt='' 
                    className={styles.collectableImg}
                    src={SERVER_URL + img_path} />
                <div className={styles.info}>
                    <p className={styles.name}>
                        { collectable.name }
                    </p>
                    <p className={styles.points}>
                        Necesitas { collectable.price } puntos
                    </p>
                </div>
                {
                    collectable.Skins.owned ?
                    <div className={styles.owned}>
                        Adquirido
                    </div>
                    :
                    this.checkPrice() ?
                    <Button 
                        className={`primary-btn ${styles.btnBuy}`}
                        onClick={this.onBuyClicked}>
                        {
                            this.state.loading ?
                            <Spinner color='' size='sm' /> 
                            : <span>Comprar</span>
                        }
                    </Button>
                    :
                    <div className={styles.cannotBuy}>
                        Aún no puedes comprar este ítem
                    </div>
                }
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { loading: false };
        this.onBuyClicked = this.onBuyClicked.bind(this);
    }

    componentDidMount() {
        if (this.props.userId) this.checkUserSkin();
    }

    /** Métodos extra */
    buildData(check) {
        const { collectable } = this.props;
        let data = { 
            collectableId: collectable.id,
            collectionId: collectable.id_collection,
            single: true
        };
        if (check) data.skinId = collectable.Skins.id;
        return data;
    }

    async buySkin(skins) {
        let data = this.buildData(false);
        data.skins = skins;

        this.setState({ loading: true });
        /** Actualizar el puntaje del usuario para realizar la compra */
        const { collectable, user } = this.props;
        const newScore = user.score - collectable.price;
        await this.props.updateUser({ id: user.id, score: newScore }, user.id);
        await this.props.getUser(user.id); // Actualizar el usuario de forma confiable en el front

        await this.props.setPatientSkins(this.props.userId, data);
        this.setState({ loading: false });
    }

    checkPrice() {
        const { collectable, user } = this.props;
        return user.score >= collectable.price;
    }

    async checkUserSkin() {
        const data = this.buildData(true);
        
        this.setState({ loading: true });
        await this.props.getPatientSkin(this.props.userId, data);
        this.setState({ loading: false });
    }

    onBuyClicked() {
        const { collectable, user } = this.props;
        if (user.score >= collectable.price) {
            const skin = this.props.collectable.Skins;
            this.buySkin([skin]);
        }
    }
}

/** Elementos del store */
const mapActionsToProps = {
    getPatientSkin, 
    getUser, 
    setPatientSkins, 
    updateUser, 
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SPCollectable);