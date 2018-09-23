import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login-component';

import './style.scss';
import config from '../../config';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.googleResponse = this.googleResponse.bind(this);
  }

  googleResponse = (response) => {
    const authResponse = response.getAuthResponse();
    this.props.onSignIn(authResponse.access_token);
  };

  render() {
    const btnText = this.props.signingIn ? 'Loading' : 'Login With Google';
    return (
      <div className="login_container">
        <div className="login_inner">
          <GoogleLogin 
            socialId={config.GOOGLE_CLIENT_ID}
            className="loginBtn loginBtn--google"
            scope="profile email"
            prompt="select_account"
            fetchBasicProfile={false}
            responseHandler={this.googleResponse}
            buttonText={btnText}
          />

          <p>Click to log in to Riotly Chat</p>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  signingIn: PropTypes.bool.isRequired,
  className: PropTypes.string,
};
