/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SMobileAvatar.module.css';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import Speaker from '@utils/Speaker';

class SMobileAvatar extends Component {
    render() {
        const { soundEnabled, showMessage } = this.state;
        return(
            <div className={styles.container}>
                <div className='flex'>
                    <div className={styles.image} />
                    <p className={styles.message}>
                        { showMessage && this.props.avatar.message }
                    </p>
                </div>

                <div className={`flex ${styles.buttons}`}>
                    <Button className='ghost-btn' onClick={this.onSoundClicked}>
                        <img
                            alt='' 
                            className={styles.buttonIcon}
                            src={`/images/other/sound_${soundEnabled ? 'enabled' : 'disabled'}.png`}/>
                    </Button>
                    <Button className={`ghost-btn ${styles.buttonMargin}`} onClick={this.onMessageClicked}>
                        <img 
                            alt=''
                            className={styles.buttonIcon}
                            src={`/images/other/message_${showMessage ? 'enabled' : 'disabled'}.png`}/>
                    </Button>
                    <Button className='ghost-btn' onClick={this.onRepeatClicked}>
                        <img 
                            alt=''
                            className={styles.buttonIcon}
                            src='/images/other/repeat.png' />
                    </Button>
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { soundEnabled: true, showMessage: true };
        
        this.onMessageClicked = this.onMessageClicked.bind(this);
        this.onRepeatClicked = this.onRepeatClicked.bind(this);
        this.onSoundClicked = this.onSoundClicked.bind(this);
    }

    componentDidMount() {
        this.speak();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.avatar.message !== this.props.avatar.message)
            this.speak();
    }

    /** Métodos extra */
    onMessageClicked() {
        this.setState({ showMessage: !this.state.showMessage });
    }

    onRepeatClicked() {
        this.speak();
    }

    onSoundClicked() {
        this.setState({ soundEnabled: !this.state.soundEnabled });
    }

    speak() {
        if (this.state.soundEnabled)
            Speaker.speak(this.props.avatar.message);
    }
}

/** Elementos del store */
const mapStateToProps = (state) => {
    return {
        avatar: state.avatar
    };
}

export default connect(
    mapStateToProps
)(SMobileAvatar);