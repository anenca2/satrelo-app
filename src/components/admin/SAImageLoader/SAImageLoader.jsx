/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import styles from './SAImageLoader.module.css';
import { FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

class SAImageLoader extends Component {
    render() {
        return(
            <div className={styles.container}>
                <div className={`flex ${styles.innerContainer}`}>
                    <div className={`flex ${styles.iconContainer}`}>
                        { !this.state.encodedImage && <FontAwesomeIcon 
                            className={styles.icon}
                            icon={faImage}
                            size='3x' /> }
                        <canvas
                          style={{ display: this.state.encodedImage ? 'block' : 'none' }} 
                          ref={this.canvasRef} />
                        <img 
                            alt=''
                            className={styles.hiddenImage} 
                            ref={this.imageRef}
                            src='' />
                    </div>
                </div>
                <p className={styles.text}>
                    Si lo deseas puedes agregar una imagen de perfil
                </p>
                <FormGroup>
                    <Input
                        className={styles.hidden}
                        onChange={this.onFileChanged} 
                        type='file' 
                        id='profilePicture' />
                    <Label
                        className={`secondary-btn ${styles.btnFile}`} 
                        for='profilePicture'>
                        Agregar Imagen
                    </Label>
                </FormGroup>
            </div>
        );
    }

    constructor(props) {
      super(props);
      this.state = { encodedImage: null };
      this.canvasRef = React.createRef();
      this.imageRef = React.createRef();

      this.onFileChanged = this.onFileChanged.bind(this);
      this.onFileReaderLoaded = this.onFileReaderLoaded.bind(this);
      this.onImageLoaded = this.onImageLoaded.bind(this);
    }

    /** Métodos extra */
    
    /** Método que detecta cuando hay un cambio en el input de tipo file */
    onFileChanged(e) {
      const file = e.target.files[0];    
      if (!file) return;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = this.onFileReaderLoaded;
    }

    /** Método encargado de detectar la carga de un archivo en el FileReader */
    onFileReaderLoaded(e) {
      this.imageRef.current.src = e.target.result;
      this.imageRef.current.onload = this.onImageLoaded;
    }

    /** Método encargado de detectar la carga de la imagen en el tag img */
    onImageLoaded(e) {
      const MAX_WIDTH = 180;
      const MAX_HEIGHT = 180;

      /** Calcular el valor de la escala para respetar el aspect ratio */
      const scale = e.target.width > e.target.height && e.target.width > MAX_WIDTH ? MAX_WIDTH / e.target.width :
                    e.target.height > MAX_HEIGHT ? MAX_HEIGHT / e.target.height : 
                    1;

      /** Asignar el tamaño del canvas */
      this.canvasRef.current.width = e.target.width * scale;
      this.canvasRef.current.height = e.target.height * scale;

      /** Obtener el contexto 2d del canvas, dibujar la imagen y obtener imagen codificada */
      const context = this.canvasRef.current.getContext('2d');
      context.drawImage(e.target, 0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
      const encodedImage = context.canvas.toDataURL(e.target, 'image/png');

      this.setState({ encodedImage }, () => { 
        this.canvasRef.current.toBlob((blob) => {
          this.props.onImageLoaded(blob);
        }); 
      });
    }
}

export default SAImageLoader;