import './App.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import MyProvider from './contexts/MyProvider';
import Login from './components/LoginComponent';
import Main from './components/MainComponent';
import MyContext from './contexts/MyContext';

class App extends Component {
  static contextType = MyContext;

  renderContent = (context) => {
    // CHƯA LOGIN → HIỆN LOGIN
    if (!context.token || context.token === '') {
      return <Login />;
    }

    // ĐÃ LOGIN → HIỆN MAIN (ADMIN)
    return <Main />;
  };

  render() {
    return (
      <MyProvider>
        <MyContext.Consumer>
          {(context) => (
            <BrowserRouter>
              {this.renderContent(context)}
            </BrowserRouter>
          )}
        </MyContext.Consumer>
      </MyProvider>
    );
  }
}

export default App;
