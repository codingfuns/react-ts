import React, { Component } from 'react';
import './App.css';
import Login from './views/Login/Login'
import Home from './views/Home/Home'
import { BrowserRouter , Route, Switch } from 'react-router-dom';



const PrimaryLayout = () => (
  <div className="primary-layout">
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Home} />
    </Switch>
  </div>
)
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <PrimaryLayout />
      </BrowserRouter>
    );
  }
}

export default App;
