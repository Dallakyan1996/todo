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
import SideBar from './Components/SideBar/SideBar';
import Header from './Components/Header/Header';
import UserProfile from './Components/UserProfile/UserProfileComponent';
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

  render() {
    return (
      <Router history={history}>
        <div className="App">
          {
            this.state.currentUser ?
              <>
                <div className="appHeader">
                  <Header />
                </div>
                <div className="sideBarContent">
                  <SideBar />
                  <div className="content">
                    <Route path="/todo" component={ToDoApp} />
                    <Route exact path="/" component={UserProfile} />
                  </div>
                </div>
              </> :
              <div className="loginPage">
                <Route path="/login" component={LoginPage} />
                <Route path="/registration-page" component={RegistrationPage} />
              </div>
          }
        </div>
      </Router>
    );
  }
}

export default App;