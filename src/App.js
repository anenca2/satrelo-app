/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { 
  showMobileMenu, 
  setFullScreen, 
  setNotification,
  setWindowWidth, 
  setVOffset 
} from '@actions/ui';
import { ping, setConnectedId } from '@actions/connection';
import Speaker from '@utils/Speaker';
import Messenger from '@utils/Messenger';
import ServerStatus from '@utils/ServerStatus';

/** Import de componentes */
import SAvatar from '@components/shared/SAvatar';
import SBubbleNotification from '@components/shared/SBubbleNotification';
import SHeaderBar from '@components/shared/SHeaderBar';
import SMobileAvatar from '@components/mobile/SMobileAvatar';
import SMobileMenu from '@components/mobile/SMobileMenu';
import SModal from '@components/shared/SModal';
import SProtectedRoute from '@components/SProtectedRoute';

/** Importar pages */
import SLandingPage from '@pages/shared/SLandingPage';
import SProfilePage from '@pages/shared/SProfilePage';
import SPActivitiesPage from '@pages/patient/SPActivitiesPage';
import SPCollectableInfoPage from '@pages/patient/SPCollectableInfoPage';
import SPCollectionsPage from '@pages/patient/SPCollectionsPage';
import SPLandingPage from '@pages/patient/SPLandingPage';
import SPPlayPage from '@pages/patient/SPPlayPage';
import STActivitiesPage from '@pages/therapist/STActivitiesPage';
import STConfigurationPage from '@pages/therapist/STConfigurationPage';
import STFeedbackPage from '@pages/therapist/STFeedbackPage';
import STLandingPage from '@pages/therapist/STLandingPage';
import STPatientsPage from '@pages/therapist/STPatientsPage';
import SAUsersPage from '@pages/admin/SAUsersPage';
import SAUpdateUserPage from '@pages/admin/SAUpdateUserPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.ui.parallax && <div className='App-parallax-bg'></div>}
        <SHeaderBar />
        {
          /** Bloque para mostrar el avatar */
          this.props.ui.showAvatar ?
            this.props.ui.windowWidth >= 768 ?
            <div 
              className='flex avatar-container'
              style={{'--vOffset': `${this.props.ui.vOffset}px`}}>
              <SAvatar />
            </div>
            : <SMobileAvatar />
          : null
        }
        { this.props.ui.modal && <SModal /> }
        { /** Bloque para mostrar el menú móvil */
          this.props.ui.showMobileMenu && <SMobileMenu /> }
        
        { /** Bloque para mostrar las notificaciones */ 
          this.props.ui.notification &&
          <SBubbleNotification /> }
        
        {/** Rutas */}
        <Container 
          className='App-container' 
          fluid 
          style={{'--vOffset': `${this.props.ui.vOffset}px`}}>
          <Switch>
            <Route exact path='/' component={SLandingPage} />

            {/** Rutas para paciente */}
            <Route
              exact 
              path='/paciente' 
              component={SPLandingPage} />
            <SProtectedRoute 
              exact
              path='/paciente/:pid/actividades'
              component={SPActivitiesPage} />
            <SProtectedRoute
              exact
              path='/paciente/:pid/colecciones'
              component={SPCollectionsPage} />
            <SProtectedRoute
              exact
              path='/paciente/:pid/colecciones/:id/coleccionable/:cid'
              component={SPCollectableInfoPage} />
            <SProtectedRoute 
              exact
              path='/paciente/:pid/actividades/:aid/sesiones/:sid'
              component={SPPlayPage} />

            {/** Rutas para terapeuta */}
            <SProtectedRoute 
              exact
              path='/terapeuta/:tid/perfil'
              component={SProfilePage} />
            <SProtectedRoute
              exact 
              path='/terapeuta/:tid/pacientes/:pid/actividades'
              component={STActivitiesPage} />
            <SProtectedRoute 
              exact
              path='/terapeuta/:tid/pacientes/:pid/configuracion' 
              component={STConfigurationPage} />
            <SProtectedRoute 
              exact
              path='/terapeuta/:tid/pacientes/:pid/actividades/:aid/:kind'
              component={STFeedbackPage} />
            <SProtectedRoute 
              exact
              path='/terapeuta/:tid/pacientes/:pid/actividades/:kind'
              component={STFeedbackPage} />
            <Route
              exact 
              path='/terapeuta' 
              component={STLandingPage} />
            <SProtectedRoute
              exact 
              path='/terapeuta/:tid/pacientes' 
              component={STPatientsPage} />
            
            {/** Rutas relacionadas al administrador */}
            <SProtectedRoute 
              exact
              path='/terapeuta/:tid/admin'
              component={SAUsersPage} />
            <SProtectedRoute 
              exact
              path='/terapeuta/:tid/nuevo'
              component={SAUpdateUserPage} />
            <SProtectedRoute
              exact
              path='/terapeuta/:tid/editar/:uid'
              component={SAUpdateUserPage} />
          </Switch>
        </Container>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.calculateVOffset = this.calculateVOffset.bind(this);
    this.setWindowSize = this.setWindowSize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.setWindowSize);
    this.calculateVOffset(window.innerWidth);
    Speaker.init('es-MX');
    this.status = new ServerStatus(this);
  }

  componentDidUpdate(prevProps) { 
      this.calculateVOffset(window.innerWidth);

      const { connectSocket, checkServerStatus } = this.props.connection;
      if (connectSocket !== prevProps.connection.connectSocket)
        Messenger.handleConnection(this.props.connection, this);
      
      if (checkServerStatus !== prevProps.connection.checkServerStatus)
        this.checkServerStatus(checkServerStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWindowSize);
  }

  /** Métodos extra */
  calculateVOffset(windowWidth) {
    const vOffset = this.props.ui.showAvatar && windowWidth < 768 ? 182 : 62;
    if (!this.props.ui.vOffset || vOffset !== this.props.ui.vOffset) 
      this.props.setVOffset(vOffset);
  }

  checkServerStatus(check) {
    this.status.checkServerStatus(check, false, Messenger);
  }

  setWindowSize() {
    const windowWidth = window.innerWidth;
    this.props.setWindowWidth(windowWidth);
    if (windowWidth >= 768) this.props.showMobileMenu(false);
    this.calculateVOffset(windowWidth);
  }
}

/** Elementos del store */
const mapStateToProps = (state) => {
  return {
    connection: state.connection,
    ui: state.ui,
  };
}

const mapActionsToProps = {
  ping,
  setConnectedId,
  showMobileMenu,
  setFullScreen,
  setNotification,
  setVOffset,
  setWindowWidth,
};

export default connect(mapStateToProps, mapActionsToProps)(App);