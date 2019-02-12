import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoApp} from "./component/TodoApp";
import {Login} from "./component/Login";
import axios from 'axios';


class App extends Component {


    constructor(props) {
        super(props);
        this.state = {token: localStorage.getItem("token")};
        this.handleLogin = this.handleLogin.bind(this);
    }


    render() {

        if (!this.state.token) {
            return <Login onLoginClicked={this.handleLogin}/>;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">TODO React App</h1>
                </header>

                <br/>
                <br/>

                <div>
                    <TodoApp/>
                </div>
            </div>
        );
    }

    updateToken(token) {

    }

    handleLogin(e, email, password) {

        let that = this;

        e.preventDefault();

        axios.post('http://localhost:8080/user/login', {
            username: email,
            password: password
        })
            .then(function (response) {
                let token = response.data.accessToken
                console.log("token:  ", token);
                localStorage.setItem("token", token);
                that.setState({token: token});
            })
            .catch(function (error) {
                console.log(error);
            });
    }


}

export default App;
