import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Home from './home';

class RouteNavigation extends PureComponent {
  render() {
    return (
      <Router>
        <div className="App" style={{ minHeight: '100Vh', height: '100% !important' }}>
          <Switch>
            <Route exact path="/"  component={Home} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default RouteNavigation;
