import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import { Link } from "react-router-dom";

class Signup extends Component {
    state = {
        validFirstname: false,
        validLastname: false,
        validEmail: false,
        validUsername: false,
        validPassword: false,
        confirmPassword: false,
        password: "",
        passwordMessage: ""
    }

    componentDidMount() {
        console.log(this.props);
        this.validatePassword();
    }

    componentDidUpdate() {

        // functions to check the input fields, and update the state if they are valid
        this.confirmPassword();
        this.validatePassword();
        this.passwordMessage();
        this.validateEmail();
        this.validUsername();
        this.validFirstname();
        this.validLastname();
    }

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    // make sure firstname is at least 3 characters
    validFirstname = () => {
        if (!this.state.validFirstname && this.props.firstname.length > 2) {
            this.setState({
                validFirstname: true
            });
        }
        if (this.state.validFirstname && this.props.firstname.length < 2) {
            this.setState({
                validFirstname: false
            });
        }
    }

    // make sure lastname is at least 3 characters
    validLastname = () => {
        if (!this.state.validLastname && this.props.lastname.length > 2) {
            this.setState({
                validLastname: true
            });
        }
        if (this.state.validLastname && this.props.lastname.length < 2) {
            this.setState({
                validLastname: false
            });
        }
    }

    // uses regex to check is email is valid
    validateEmail = () => {
        let validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        let valid = validEmail.test(this.props.email);
        if (!this.state.validEmail && valid) {
            this.setState({
                validEmail: true
            });
        }
        if (this.state.validEmail && !valid) {
            this.setState({
                validEmail: false
            });
        }
    }

    // make sure username is at least 5 characters
    validUsername = ()=> {
        if(this.props.username.length > 4  && !this.state.validUsername ) {
            this.setState({
                validUsername: true
            });
        }

        if(this.props.username.length < 4  && this.state.validUsername) {
            this.setState({
                validUsername: false
            });
        }
    }

     // checks is password meets regex test (at least 8 letters, 1 capital and 1 number)
     validatePassword = ()=> {
        let strongPassword = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);
        let valid = strongPassword.test(this.props.password);
        if (!this.state.validPassword && valid) {
            this.setState({
                validPassword: true
            });
        }
        if (this.state.validPassword && !valid) {
            this.setState({
                validPassword: false,
            });
        }
    }

    // checks if 2 password fields match
    confirmPassword = () => {
        if (!this.state.confirmPassword && this.state.password !== "" && this.state.password === this.props.password) {
            this.setState({
                confirmPassword: true
            });
        }
        if (this.state.confirmPassword && this.state.password !== this.props.password) {
            this.setState({
                confirmPassword: false
            });
        }
    }

    // displays the password message if it exists
    passwordMessage = () => {
        let message = "at least 8 letters, 1 capital & 1 number"
        if (this.props.password !== "" && !this.state.validPassword && this.state.passwordMessage !== message) {
            this.setState({
                passwordMessage: message
            });
        }
        if (this.state.validPassword && this.state.passwordMessage !== "") {
            this.setState({
                passwordMessage: ""
            });
        }
        if (this.state.passwordMessage === message && this.props.password === "") {
            this.setState({
                passwordMessage: ""
            });
        } 
    }

    render() {
        return (
            <div>
                <h2 className="loginTitle">Signup</h2>
                <hr />
                {this.props.message?(
                    <Alert type="danger">{this.props.message}</Alert>
                ): (
                    <p></p>
                )}
                <Form>
                    <FormGroup>
                        <Label for="firstname">Firtname</Label>
                        <Input type="text" name="firstname" id="firstname" placeholder="firstname" value={this.props.firstname} onChange={this.props.handleInputChange} valid={this.state.validFirstname} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastname">Lastname</Label>
                        <Input type="text" name="lastname" id="lastname" placeholder="lastname" value={this.props.lastname} onChange={this.props.handleInputChange} valid={this.state.validLastname} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="email@email.com" value={this.props.email} onChange={this.props.handleInputChange} valid={this.state.validEmail} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="username" value={this.props.username} onChange={this.props.handleInputChange} valid={this.state.validUsername} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="password" value={this.props.password} onChange={this.props.handleInputChange} valid={this.state.validPassword} />
                        <FormText>{this.state.passwordMessage}</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input type="password" name="password" id="confirmPassword" placeholder="confirm password" value={this.state.password} onChange={this.handleInputChange} valid={this.state.confirmPassword} />
                    </FormGroup>
                    {/* if all fields are valid, allow the user to submit the form */}
                    {(this.state.validFirstname && this.state.validLastname && this.state.validEmail && this.state.validUsername && this.state.validPassword && this.state.confirmPassword) ? (
                        <Button onClick={this.props.handleSignup} color="success" block>Signup</Button>
                    ) : (
                        <Button onClick={this.props.handleSignup} color="danger" block disabled>Signup</Button>
                    )}
                    <p className="signupLink">
                        <Link to="/login">already have an account?  Sign in here</Link>
                    </p>
                </Form>
            </div>
        );
    }
}

export default Signup;