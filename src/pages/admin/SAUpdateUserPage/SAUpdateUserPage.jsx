/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SAUpdateUserPage.module.css';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { 
    getUser,
    updateUser,
    setToUpdate 
} from '@actions/user';
import { register } from '@actions/auth';
import { uploadProfileImage } from '@actions/plugin';
import { setNotification } from '@actions/ui';

import SAImageLoader from '@components/admin/SAImageLoader';
import SAUserForm from '@components/admin/SAUserForm';
import STLayout from '@components/layout/STLayout';

import { buildRandomColor, buildUserAlias } from '@utils/user';

class SAUpdateUserPage extends Component {
    render() {
        const { uid } = this.props.match.params;
        const title = uid ? 'Editar usuario' : 'Crear usuario';
        const { update, user } = this.state;
        
        return(
            <STLayout pt={50}>
                <div className={styles.title}>{title}</div>
                <div className={styles.container}>
                    <div className={styles.formContainer}>
                        <Row>
                            <Col md={4}>
                                <SAImageLoader onImageLoaded={this.onImageLoaded} />
                            </Col>
                            <Col md={8}>
                                <p className={styles.userData}>
                                    Datos del usuario
                                </p>
                                <SAUserForm 
                                    loading={this.state.loading}
                                    onSave={this.onSave}
                                    update={update}
                                    user={user} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </STLayout>
        );
    }

    constructor(props) {
        super(props);
        this.state = { image: null, loading: false, update: false, user: null };
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        const { uid } = this.props.match.params;
        if (this.props.toUpdate)
            this.prepareUserForUpdate();
        else if (uid)
            this.getUserToUpdate(uid);
    }

    componentDidUpdate() {
        if (this.props.toUpdate && !this.state.user)
            this.prepareUserForUpdate();
    }

    componentWillUnmount() {
        this.props.setToUpdate(null);
    }

    /** Métodos extra */
    getUserToUpdate(id) {
        this.props.getUser(id, true);
    }

    prepareUserForUpdate() {
        const { toUpdate } = this.props;
        const user = {
            id: { value: toUpdate.id, error: null },
            active: { value: toUpdate.active },
            birthday_date: { value: new Date(toUpdate.birthday_date) },
            email: { value: toUpdate.email, error: null },
            gender: { value: toUpdate.gender },
            is_admin: { value: toUpdate.is_admin },
            last_name: { value: toUpdate.last_name, error: null },
            name: { value: toUpdate.name, error: null },
            username: { value: toUpdate.username, error: null },
            id_role: { value: toUpdate.Role.id },
        };
        this.setState({ update: true, user });
    }        

    /** Eventos */
    onImageLoaded(image) {
      this.setState({ image });
    }

    async onSave(formData) {
        let userData = Object.assign({}, formData);
        if (userData.password.trim() === '') delete userData.password;

        /** Completar algunos campos */
        const alias = buildUserAlias(userData.name, userData.last_name);
        userData['thumbnail_alias'] = alias;
            
        const { update } = this.state;
        if (!update) { /** Crear usuario */
            userData['color'] = buildRandomColor();
            if (userData.id_role === 2)
                userData['id_avatar_variation'] = 1;
        }

        this.setState({ loading: true });
        /** Si se seleccionó una imagen, guardarla en el backend y obtener el path */
        if (this.state.image) {
          const blob = this.state.image;
          const name = `${formData.username}.png`;
          const res = await this.props.uploadProfileImage(blob, name);
          if (!res.error) {
            const { path } = res.data;
            userData['profile_img'] = path;
          }
        }

        const { tid } = this.props.match.params;        
        const response = update ? 
                         await this.props.updateUser(userData, tid) 
                         :
                         await this.props.register(userData);
            
        const { error, message } = response;
        
        this.setState({ loading: false });
        this.props.setNotification({ error, message, slide: true });
        this.props.history.goBack();
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        toUpdate: state.user.toUpdate
    };
}

const mapActionsToProps = {
    getUser,
    register,
    updateUser,
    uploadProfileImage,
    setNotification,
    setToUpdate
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SAUpdateUserPage);