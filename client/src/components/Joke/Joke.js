import React from "react"
import { Button } from "reactstrap";
import "./Joke.scss";

function Joke(props) {
    return (
        <div class="jokeBox">
            <p>{props.joke}</p>
        </div>
    )
}

export default Joke;