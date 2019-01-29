import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class Home extends Component {

  state = {
    loggedIn: false
  };

  render() {
    return (
        <div className="homeBox">
          <h1>Hello World</h1>
          <Link className="loginLink" to="/login"><Button className="loginBtn" color="primary">Login</Button></Link>
        </div>
    );
  }
}

export default Home;