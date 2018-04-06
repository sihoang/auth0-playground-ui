import React, { Component }  from 'react';
import './App.css';
import Auth from './Auth.js';

class Home extends Component {
  login = () => {
    const auth = new Auth();
    auth.login();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Auth0 Playground UI</h1>
          <p className="App-intro">
            <button onClick={this.login} >Log In</button>
          </p>
        </header> 
      </div>
    )
  }
}

export default Home;