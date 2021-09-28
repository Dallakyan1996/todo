import React from 'react';
import ToDoApp from './Components/ToDoList/TodoList';
import { Router, Route } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
import { history } from './helpers/history';
import { apiObject } from './service/API';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import RegistrationPage from './Components/RegistrationPage/RegistrationPage';
import './App.css';
import HomePage from './Components/HomePage/HomePage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    apiObject.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }

  logout() {
    apiObject.logout();
    history.push('/login');
  } 

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <PrivateRoute path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/registration-page" component={RegistrationPage} />
        </div>
      </Router>
    );
  }
}

export default App;