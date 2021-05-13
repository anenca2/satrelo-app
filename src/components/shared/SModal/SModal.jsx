/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SModal.module.css';
import { 
    Modal,
    ModalBody,
    ModalHeader,
} from 'reactstrap';
import { connect } from 'react-redux';
import { setModal } from '@actions/ui';

import SComments from '@components/shared/SComments';
import SNewComment from './SNewComment';
import SPasswordRecover from '@components/shared/SPasswordRecover';
import SVideo from '@components/shared/SVideo';

class SModal extends Component {
    render() {
        return(
            <Modal 
                centered={true}
                contentClassName={styles.modal}
                isOpen={this.props.ui.modal !== null}
                size='lg'
                toggle={this.closeModal}>
                <ModalHeader toggle={this.closeModal}>
                    <span className={styles.title}>
                        { this.props.ui.modal.title }
                    </span>
                </ModalHeader>
                <ModalBody className={styles.body}>
                    {
                        this.props.ui.modal.type === 'comments' ?
                        <SComments data={this.props.ui.modal.data} />
                        :
                        this.props.ui.modal.type === 'new_comment' ?
                        <SNewComment 
                          onCancelClicked={this.closeModal}
                          session={this.props.ui.modal.session} />
                        :
                        this.props.ui.modal.type === 'forgot_password' ? 
                        <SPasswordRecover 
                            role={this.props.ui.modal.role}
                            type={this.props.ui.modal.type} />
                        :
                        <SVideo src={this.props.ui.modal.videoUrl} />
                    }
                </ModalBody>
            </Modal>
        );
    }

    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    /** Métodos extra */
    closeModal() {
        this.props.setModal(null);
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        ui: state.ui
    };
}

const mapActionsToProps = {
    setModal
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SModal);