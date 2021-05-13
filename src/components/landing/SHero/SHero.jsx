/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React from 'react';
import styles from './SHero.module.css';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import SVideo from '@components/shared/SVideo';

const SHero = () => {
    return(
        <div className={styles.container}>
            <div className={styles.outerContainer}>
                <div className={`flex ${styles.innerContainer}`}>
                    <div className={styles.title}>
                        La Aplicación de Apoyo a la Rehabilitación 
                        del Lenguaje Oral
                    </div>
                    <div className={styles.subtitle}>
                        Generación de actividades personalizadas para atender 
                        las necesidades particulares de los pacientes
                    </div>
                    <div className={`flex ${styles.btnContainer}`}>
                        <Link className={styles.link} to='/paciente'>
                            <Button 
                                className={`secondary-btn ${styles.btn}`}
                                size='lg'>
                            
                                Ingresa como paciente
                            </Button>
                        </Link>
                        <Link className={styles.link} to='terapeuta'>
                            <Button
                                className={`primary-btn ${styles.btn}`} 
                                size='lg'>
                                    Ingresa como terapeuta
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <SVideo absolute={true} width='700px' />
        </div>
    );
}

export default SHero;