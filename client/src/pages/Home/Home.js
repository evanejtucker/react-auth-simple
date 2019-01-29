import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import API from "../../utils/API";
import Joke from "../../components/Joke"
import "./Home.scss";

class Home extends Component {

  state = {
    loggedIn: false,
    joke: ""
  };

  componentDidMount() {
    this.getJoke();
    this.loggedIn();
  }

  getJoke = () => {
    API.ChuckNorris().then(joke => {
      console.log(joke.data.value.joke);
      this.setState({
        joke: joke.data.value.joke
      })
    }).catch(err => {
      console.log(err)
    });
  }

  getNewJoke = () => {
    // e.preventDefault();
    this.getJoke()
  }

  loggedIn = () => {
    API.isLoggedIn().then(user => {
      if (user.data.loggedIn) {
        this.setState({
          loggedIn: true
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="homeBox">
        <Joke joke={this.state.joke}/>
        {this.state.loggedIn ? (
          <Button onClick={e=> {this.getNewJoke()}} color="warning" block>Get New Joke</Button>
        ) : (<></>)}
      </div>
    );
  }
}

export default Home;