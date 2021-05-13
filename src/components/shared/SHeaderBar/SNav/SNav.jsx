/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { useState } from 'react';
import styles from './SNav.module.css';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Nav,
    NavbarToggler,
    NavItem
} from 'reactstrap';

const SNav = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () =>  {
        if (props.windowWidth <= 768)
            setIsOpen(!isOpen);
    }

    return(
        <span className={styles.container}>
            <NavbarToggler className={styles.toggler} onClick={toggle} />
            <Collapse className={styles.collapse} isOpen={isOpen} navbar>
                <Nav className={styles.nav} navbar>
                    <NavItem className={styles.navItem}>
                        <Link
                            className={styles.link}
                            onClick={toggle}
                            to='/'>
                            Inicio
                        </Link>
                    </NavItem>
                </Nav>
            </Collapse>
        </span>
    );
}

export default SNav;