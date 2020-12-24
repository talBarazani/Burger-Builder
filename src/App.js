import React, { Component } from 'react';
import './App.css';
import './containers/BurgerBuilder/BurgerBuilder'

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component{
  render(){
    return (
      <div className="App">
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;
