import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    let updateUsername = (event) => setUsername(event.target.value)
    let updatePassword = (event) => setPassword(event.target.value)
    let submit = (event) => {
        event.preventDefault()
        const data = JSON.stringify({"username":username, "password":password})
        fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "Application/json"
            }
        }).then(response => {
            response.json()
            .then(data => {
                if(response.status === 200){
                    localStorage.setItem("access-token", data.access)
                    localStorage.setItem("refresh-token", data.refresh)
                    navigate("/home")
                }
                else if(response.status === 401){
                    console.log(data);
                }
            })
        })
    }
    return (
        <div>
            <input onChange={(event) => updateUsername(event)} placeholder="username" type="text" />
            <input onChange={(event) => updatePassword(event)} placeholder="password" type="password" />
            <button type="submit" onClick={(event) => submit(event)}>Submit</button>
        </div>
    );
    
}

export default Login;
