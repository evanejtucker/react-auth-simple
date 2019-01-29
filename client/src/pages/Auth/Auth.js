import React, { Component } from "react";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import API from "../../utils/API";
import "./Auth.scss";

class Auth extends Component {

  state = {
    loggedIn: false,
    username: "",
    password: "",
    user: null,
    message: ""
  }

  componentDidMount() {
    console.log(this.props.action);
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleLogin = event => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.username && this.state.password) {
      API.login({
        username: this.state.username,
        password: this.state.password
      }).then(user => {
        console.log(user);
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true,
            user: user.data.user
          });
          console.log("log in successful");
          window.location.href = '/profile';
        } 
        // else {
        //   console.log("Something went wrong :(")
        //   console.log(user);
        // }
        else if (user.data.message) {
          this.setState({
            message: user.data.message
          })
        }
      });
    }
  }

  render() {
    return (
      <div className="authBox">
        {(this.props.action === "login") ? (
          <Login
            username={this.state.username}
            password={this.state.password}
            handleLogin={this.handleLogin}
            handleInputChange={this.handleInputChange}
            message={this.state.message}
          />
        ) : (
            <h1>signup page</h1>
          )}
      </div>
    )
  }
}



export default Auth;