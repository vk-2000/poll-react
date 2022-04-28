import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password:'',
            age: ''
        }
    }
    render() { 
        return (
            <div>
                <input onChange={(event) => this.updateUsername(event)} placeholder="username"></input>
                <input onChange={(event) => this.updateEmail(event)} placeholder="email"></input>
                <input onChange={(event) => this.updatePassword(event)} placeholder="password"></input>
                <input onChange={(event) => this.updateAge(event)} placeholder="age"></input>
                <button type="submit" onClick={(event) => this.submit(event)}>Submit</button>
            </div>
        );
    }
    updateUsername(event){
        this.setState({
            username : event.target.value
        })
    }
    updatePassword(event){
        this.setState({
            password : event.target.value
        })
    }
    updateEmail(event){
        this.setState({
            email: event.target.value
        })
    }
    updateAge(event){
        this.setState({
            age: event.target.value
        })
    }
    submit(event){
        event.preventDefault()

        let data = JSON.stringify(this.state)
        fetch("http://127.0.0.1:8000/test_api/register",{
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'Application/json'
            }
        }).then(response => response.json())
        .then(data => console.log(data))
    }
}
 
export default Register;