/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SNewComment.module.css';
import { Button, Form, FormFeedback, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { updateActivitySession } from '@actions/activity';
import { uploadAudioFile } from '@actions/plugin';
import { setNotification } from '@actions/ui';

import SSubmitField from '@components/shared/form/SSubmitField';

class SNewComment extends Component {
    render() {
        const recordState = this.state.audio ? styles.recorded : 
                            this.state.recording ? styles.recording : styles.notRecording;
        return(
            <Form>
                <FormGroup className='mt-2'>
                    <Input 
                        type='textarea'
                        onChange={this.onTextChanged}
                        placeholder='Escribe tu comentario aquí...' 
                        rows='8' 
                        style={{ resize: 'none' }}
                        invalid={this.state.error !== null} />
                    {this.state.error && 
                      <FormFeedback>{this.state.error}</FormFeedback>}
                </FormGroup>
                <p className={styles.microphoneText}>
                    Si quieres puedes grabar tu comentario. Para hacerlo, presiona el micrófono y habla.
                </p>
                <div className={`flex ${styles.recorderContainer}`}>
                    <Button className='ghost-btn' onClick={this.onRecordAudioClicked}>
                        <img 
                            alt=''
                            className={`${styles.microphone} ${recordState}`}
                            src='/images/other/microphone.png' />
                    </Button>
                    { this.state.audio && <audio src={URL.createObjectURL(this.state.audio)}
                                                 style={{ marginLeft: 7 }}
                                                 type='video.webm'
                                                 controls
                                                 controlsList='nodownload' /> }
                </div>
                <div className='flex mt-4' style={{ justifyContent: 'center' }}>
                    <SSubmitField
                        className='primary-btn w-100'
                        loading={this.state.loading}
                        onClick={this.onSaveClicked}>
                        Guardar
                    </SSubmitField>
                    <FormGroup>
                        <Button 
                            className='simple-btn ml-2'
                            onClick={this.onCancelClicked}>
                            Cancelar
                        </Button>
                    </FormGroup>
                </div>
            </Form>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            audio: null,
            comment: '',
            error: null,
            loading: false,
            recording: false,
        };

        this.onCancelClicked = this.onCancelClicked.bind(this);
        this.onTextChanged = this.onTextChanged.bind(this);
        this.onRecordAudioClicked = this.onRecordAudioClicked.bind(this);
        this.onSaveClicked = this.onSaveClicked.bind(this);
    }

    /** Métodos extra */
    onCancelClicked() {
        this.props.onCancelClicked();
    }

    onTextChanged(e) {
        this.setState({ comment: e.target.value, error: null });
    }

    async onRecordAudioClicked() {
        if (!this.state.recording) {
            this.setState({ audio: null });
            /** Iniciar los componentes para obtener el audio */
            this.audioChunks = [];
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.recorder = new MediaRecorder(this.stream);
            this.recorder.ondataavailable = e => {
                this.audioChunks.push(e.data);
            }
            this.recorder.start(100);
        }
        else {
            const blob = new Blob(this.audioChunks, { type: 'audio/mpeg' });
            this.setState({ audio: blob });
            this.recorder.stop();
            this.stream.getTracks()[0].stop();
        }

        this.setState({ recording: !this.state.recording });
    }

    async onSaveClicked() {
        if (this.state.comment.trim() === '' && !this.state.audio)
            this.setState({ error: 'Escribe o graba un comentario para poder guardarlo.' });
        else {
            this.setState({ loading: true });

            const { session, user } = this.props;
            const { audio, comment } = this.state;

            // Si el comentario tiene una grabación, enviar el archivo al servidor para
            // obtener el path que se guardará en la sesión
            let audioError = false;
            let audioPath = null;
            if (audio) {
                const response = await this.props.uploadAudioFile(audio, user.id);
                let audioError = response.error;
                if (!audioError)
                    audioPath = response.data.path;
            }

            // Guardar el comentario actualizando la sesión            
            const { error } = await this.props.updateActivitySession({
                id: session, audio: audioPath, comment
            });
            
            const saveError = error || (audioError && comment.trim() === '');
            // Mostrar notificación de la acción de guardar el comentario
            const message = saveError ?
                            'Error al realizar la acción: guardar el comentario' :
                            'Se realizó exitosamente la acción: guardar el comentario';
            this.props.setNotification({ error, message, slide: true });
            // Cerrar la ventana modal
            this.setState({ comment: '', loading: false });
            this.props.onCancelClicked();
        }
    }
}

/** Elementos del store */
const mapActionsToProps = {
  setNotification,
  updateActivitySession,
  uploadAudioFile,
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
}

export default connect(
  mapStateToProps, 
  mapActionsToProps
)(SNewComment);