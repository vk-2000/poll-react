import React, { Component, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { BASE_URL } from '../App';
import Navbar from './Navbar';
import PollNotActive from './PollNotActive';
import Voted from './Voted';

function Vote() {

    let params = useParams()
    let id = params.id

    const [data, setData] = useState([])
    const [pollNotLive, setPollNotLive] = useState(false)
    const [voted, setVoted] = useState(false)
    const [voteChoices, setVoteChoices] = useState({})
    const navigate = useNavigate()

    let fetchData = () => {
        fetch(BASE_URL + "vote_api/vote/" + id, {
            method: "GET",
            headers: {
                "Content-type": "Application/json"
            }
        }).then(response => response.json()
        .then(data => {
            if(response.status == 403){
                console.log(data);
                setData(data)
                if(data.error_code == 1) setPollNotLive(true)
                else if (data.error_code == 2) setVoted(true)
            }
            else{
                setData(data)
                console.log(data);
            }
        }))
        
    }


    useEffect(() => {
        fetchData()
    }, [])

    let submitVote = (event) => {
        event.preventDefault()
        let id = data.id
        let body = {poll: data.id, choices: []}
        for(let question of data.questions ){
            let choice =document.querySelector(`input[name="Question${question.id}"]:checked`).value;
            body.choices.push(choice)
        }

        fetch(BASE_URL + "vote_api/vote/" + data.id, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "Application/json"
            }
        }).then(response => {
            if(response.status == 200){
                if(data.result_public){
                    navigate("/result/" + data.id)
                }
                else{
                    window.location.reload()
                }
            }
        })
    }
    if(pollNotLive){
        return (
            <div>
                <Navbar></Navbar>
                <PollNotActive></PollNotActive>
            </div>
            )
    }
    if(voted){
        return(
            <div>
                <Navbar></Navbar>
                <Voted></Voted>
            </div>
        )
    }
    return (
        <div>
            <Navbar></Navbar>
            
            
            <div className="container d-flex flex-column justify-content-center align-items-center col col-sm-6">
                <div className="display-5">{data.name}</div>
                <hr />
                <form className="w-100" id="voteForm">
                    {data.questions?.map(question => {
                        return (
                            <div key={question.id} className="w-100 mb-4">
                                <div className="py-2" style={{fontSize: "1.5rem"}}>{question.desc}</div>
                                <div className="form-control">
                                    {question.choices.map(choice => {
                                        return (
                                            <div key={choice.id} className="form-check py-2">
                                                <input className="form-check-input" type="radio" id={`Choice${choice.id}`} name={`Question${question.id}`} value={choice.id} />
                                                <label className="form-check-label" htmlFor={choice.id}>{choice.text}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <button onClick={(event) => submitVote(event)} type="submit" className="btn btn-success mb-3 w-100">Vote</button>
                </form>
                
            </div>
            
        </div>
    );
}

export default Vote;