/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SSkinItem.module.css';
import { Button, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { getPatientSkin, setPatientSkins } from '@actions/collection';
import { getUser, updateUser } from '@actions/user';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class SSkinItem extends Component {
    render() {
        return(
            <div className={styles.container}>
                <img
                    alt=''
                    className={styles.collectableImg}
                    src={SERVER_URL + this.props.img_path} />
                <p className={styles.alt}>
                    { this.props.name }
                </p>
                {
                    this.props.owned ?
                    <div className={styles.owned}>
                        Ya tienes este ítem
                    </div>
                    :
                    this.checkPrice() ?
                    <div className={`flex ${styles.btnContainer}`}>
                        <Button 
                            className={`primary-btn ${styles.btn}`}
                            onClick={this.onBuyClicked}>
                            {
                                this.state.loading ?
                                <Spinner color='light' size='sm' />
                                :
                                <span>
                                    Comprar por { this.state.price } puntos
                                </span>
                            }
                        </Button>
                    </div>
                    :
                    <div className={styles.cannotBuy}>
                        Necesitas { this.state.price } puntos.
                        Aún no puedes comprar este ítem
                    </div>
                }
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { 
            loading: false,
            price: this.props.price + this.props.collectable.price 
        };
        this.onBuyClicked = this.onBuyClicked.bind(this);
    }

    componentDidMount() {
        this.checkUserSkin();
    }

    componentDidUpdate(prevProps) {
        /**
         * Si el coleccionable cambió quiere decir que se detectó que
         * uno de sus aspectos pertenece al usuario, por lo que el 
         * coleccionable en general es propiedad de usuario. Si esto
         * es así el precio es solamente el del aspecto.
         */
        if (prevProps.collectable !== this.props.collectable)
            this.updatePrice();       
    }

    /** Métodos extra */
    buildData(check) {
        let data = {
            collectableId: this.props.collectable.id,
            collectionId: this.props.collectable.id_collection,
            single: false,
        }
        if (check) data.skinId = this.props.id;
        return data;
    }

    async buySkins(skins) {
        let data = this.buildData(false);
        data.skins = skins;

        this.setState({ loading: true });
        /** Actualizar el puntaje del usuario para realizar la compra */
        const { user } = this.props;
        const newScore = user.score - this.state.price;
        await this.props.updateUser({ id: user.id, score: newScore }, user.id);
        await this.props.getUser(user.id); // Actualizar el usuario de forma confiable en el front

        await this.props.setPatientSkins(this.props.userId, data);        
        this.setState({ loading: false });
    }

    checkPrice() {
        return this.props.user.score >= this.state.price;
    }

    async checkUserSkin() {
        const data = this.buildData(true);
        this.setState({ loading: true });
        await this.props.getPatientSkin(this.props.userId, data);
        this.setState({ loading: false });
    }

    onBuyClicked() {
        const { user } = this.props;
        if (user.score >= this.state.price) {
            let _skins = [{ id: this.props.id }];
            /**
             * Si el precio del aspecto es menor al precio calculado en el
             * estado de este componente, entonces el coleccionable no es 
             * propiedad del usuario por lo que se debe agregar el aspecto
             * por defecto a los aspectos para comprar.
             */
            if (this.props.price < this.state.price) {
                const Skins = Object.values(this.props.collectable.Skins);
                Skins.forEach(skin => {
                    if (skin.is_default && skin.id !== this.props.id) {
                        _skins.push({ id: skin.id });
                    }
                });
            }
            this.buySkins(_skins);
        }
    }

    updatePrice() {
        if (this.props.price !== this.state.price)
            this.setState({ price: this.props.price });
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        collectable: state.collection.collectable, 
        user: state.user.user
    };
}

const mapActionsToProps = {
    getPatientSkin, 
    getUser, 
    setPatientSkins, 
    updateUser, 
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SSkinItem);