/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import React, { Component } from 'react';
import { Form } from 'reactstrap';
import { connect } from 'react-redux';
import { setNotification } from '@actions/ui';
import { getUser, updateUser } from '@actions/user';

import SInputField from '@components/shared/form/SInputField';
import SSubmitField from '@components/shared/form/SSubmitField';

class SSecurityPanel extends Component {
  render() {
    return(
      <div style={{ padding: 25 }}>
        <p style={{ fontSize: 'large', fontWeight: 'bold' }}>
          Cambio de contraseña
        </p>
        <Form>
          <SInputField
            error={this.state.password.error}
            name='password'
            onChange={this.onChange} 
            type='password'
            value={this.state.password.value}>
            Ingresa tu contraseña nueva  
          </SInputField>
          <SSubmitField
            className='secondary-btn'
            loading={this.state.password.loading}
            onClick={this.onSaveClicked}>
            Guardar
          </SSubmitField>
        </Form>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = { 
      password: {
        error: null, 
        loading: false,
        value: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSaveClicked = this.onSaveClicked.bind(this);
  }

  /** Métodos extra */
  onChange(e) {
    const { name, value } = e.target;
    let field = this.state[name];
    field.error = null;
    field.value = value;
    this.setState({ [name]: field });
  }

  async onSaveClicked(e) {
    if (this.state.password.value.trim() === '')
      this.setState({ password: { ...this.state.password, error: 'La contraseña es obligatoria' }});
    else {
      this.setState({ password: { ...this.state.password, loading: true }});

      const { user } = this.props;
      const userData = { id: user.id, password: this.state.password.value };
      const response = await this.props.updateUser(userData, user.id);

      const { error, message } = response;
      if (!error) await this.props.getUser(user.id);

      this.setState({ password: { ...this.state.password, loading: false }});
      this.props.setNotification({ error, message, slide: true });
    }
  }
}

/** Elementos del store */
const mapActionsToProps = {
  getUser, 
  setNotification, 
  updateUser
};

export default connect(null, mapActionsToProps)(SSecurityPanel);