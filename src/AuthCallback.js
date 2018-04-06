import React, { Component } from 'react';
import Auth from './Auth';

const auth = new Auth();
class AuthCallback extends Component {

  state = {
    host: 'sihoang.auth0.com',
    authResult: {},
  }

  async componentDidMount() {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      try {
        const authResult = await auth.handleAuthentication();
        this.setState({authResult});
        return;
      }
      catch (e) {
        // get from the cache
      };
    }

    this.setState({authResult: this.getCachedTokens()});
  }

  onChangeHost = (event) => {
    this.setState({host: event.target.value});
  }

  fetchToken = () => {
    this.setState({isTokenFetched: true});
  }

  getCachedTokens = () => {
    const accessToken = localStorage.getItem('access_token');
    const idToken = localStorage.getItem('id_token');
    const expiresAt = localStorage.getItem('expires_at');
    return {accessToken, idToken, expiresAt};
  }

  printTokens = () => {
    const {accessToken, idToken, expiresAt} = this.state.authResult;
    return (
      <ul>
        <li>Access Token: {accessToken}</li>
        <li>Id Token: {idToken}</li>
        <li>Expires At: {expiresAt}</li>
      </ul>
    )
  }

  render() { 
    return (
      <div>
        <div>
          {this.printTokens()}
        </div>
        <br/>
        <div>
          <h2>Now on server, to validate the API request, make the call below</h2>
          <p>Server endpoint: <input type='text' value={this.state.host} onChange={this.onChangeHost} /></p>
          <p>
          curl --request GET \<br/>
            --url 'https://{this.state.host}/userinfo' \<br/>
            --header 'Authorization: Bearer {this.state.authResult.accessToken}' \<br/>
            --header 'Content-Type: application/json'
          </p>
        </div>
      </div>
    )
  }
} 

export default AuthCallback;