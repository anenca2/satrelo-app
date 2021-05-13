/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';

class SFullScreen extends Component {
    render() {
        return(
            <div 
                onKeyDown={this.onKeyHandler}
                ref={this.fullRef}
                tabIndex={0}>
                {this.props.children}
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = { fullScreen: false };
        this.fullRef = React.createRef();
        this.onClosed = this.onClosed.bind(this);
        this.onKeyHandler = this.onKeyHandler.bind(this);
    }

    componentDidMount() {
        document.addEventListener('fullscreenchange', this.onClosed);
        document.addEventListener('mozfullscreenchange', this.onClosed);
        document.addEventListener('webkitfullscreenchange', this.onClosed);
    }

    componentDidUpdate() {
        if (this.props.fullScreen !== this.state.fullScreen) {
            if (this.props.fullScreen)
                this.enterFullScreen();
            else
                this.exitFullScreen();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('fullscreenchange', this.onClosed);
        document.removeEventListener('mozfullscreenchange', this.onClosed);
        document.removeEventListener('webkitfullscreenchange', this.onClosed);
    }

    /** Métodos extra */
    async enterFullScreen() {
        if (this.fullRef.current.requestFullRequest) {
            await this.fullRef.current.requestFullRequest();
        }
        else if (this.fullRef.current.mozRequestFullScreen) {
            await this.fullRef.current.mozRequestFullScreen();
        }
        else if (this.fullRef.current.webkitRequestFullScreen) {
            await this.fullRef.current.webkitRequestFullScreen();
        }

        this.setState({ fullScreen: true });
        this.props.onChange(true);
    }

    async exitFullScreen() {
        const isFull = document.fullscreenElement || 
                       document.mozFullScreenElement ||
                       document.webkitFullScreenElement;
        
        if (isFull) {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                await document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullScreen) {
                await document.webkitExitFullScreen();
            }
        }

        this.setState({ fullScreen: false });
        this.props.onChange(false);
    }

    onClosed() {
        const full = document.fullscreenElement ||
                     document.mozFullScreenElement ||
                     document.webkitFullScreenElement;
        if (!full && this.state.fullScreen)
            this.props.onClosed();
    }

    onKeyHandler(event) {
        if (event.keyCode === 8) event.preventDefault();
    }
}

export default SFullScreen;