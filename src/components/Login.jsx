import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../App';
import "../components/style/login.css"
import Navbar from './Navbar';
import loginImg from "../images/login.png"


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    let updateUsername = (event) => setUsername(event.target.value)
    let updatePassword = (event) => setPassword(event.target.value)
    let submit = (event) => {
        event.preventDefault()
        const data = JSON.stringify({"username":username, "password":password})
        fetch(BASE_URL + "api/token/", {
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
            <Navbar></Navbar>
            <div className='d-flex align-items-center justify-content-center'>
                <div className='row w-100 justify-content-center'>
                    <div className='formContainer col-sm-6 col-md-4 m-3'>
                        <form className='d-flex flex-column'>
                            <div style={{textAlign: "center"}} className='display-6 p-3'>Login</div>
                            <img className='mx-auto p-3' src={loginImg} alt="login img" width="70%"/>
                            <div class="mb-3">
                              <label for="formUsername" class="form-label">Username</label>
                              <div className='input-group'>
                                <span class="input-group-text" id="basic-addon1"><i class="bi bi-person"></i></span>
                                <input className='form-control' id='formUsername' onChange={(event) => updateUsername(event)} placeholder="Username" type="text" />
                              </div>
                            </div>
                            <div class="mb-3">
                              <label for="formPassword" class="form-label">Password</label>
                              <div className='input-group'>
                                <span class="input-group-text" id="basic-addon1"><i class="bi bi-key"></i></span>
                                <input className='form-control' id='formPassword' onChange={(event) => updatePassword(event)} placeholder="Password" type="password" />
                              </div>
                              
                            </div>
                            
                            
                            <button className='btn btn-outline-secondary' type="submit" onClick={(event) => submit(event)}>Submit</button>
                        </form>
                        

                    </div>
                </div>
            </div>
            
        </div>
    );
    
}

export default Login;
