import React, { Component, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { BASE_URL } from '../App';
import Navbar from './Navbar';
import PollNotActive from './PollNotActive';

function Vote() {

    let params = useParams()
    let id = params.id

    const [data, setData] = useState([])
    const [pollLive, setPollLive] = useState(true)
    const [voteChoices, setVoteChoices] = useState({})

    let fetchData = () => {
        fetch(BASE_URL + "vote_api/vote/" + id, {
            method: "GET",
            headers: {
                "Content-type": "Application/json"
            }
        }).then(response => response.json()
        .then(data => {
            if(response.status == 403){
                setPollLive(false)
            }
            else{
                setData(data)
            }
        }))
        
    }


    useEffect(() => {
        fetchData()
    }, [])

    let submitVote = (event) => {
        event.preventDefault()
        let choices = []
        for(let question of data.questions ){
            let choice =document.querySelector(`input[name="Question${question.id}"]:checked`).value;
            choices.push(choice)
        }

        fetch(BASE_URL + "vote_api/vote/" + data.id, {
            method: "POST",
            body: JSON.stringify(choices),
            headers: {
                "Content-type": "Application/json"
            }
        }).then(response => response.json())
        .then(data => console.log(data))
    }
    if(! pollLive){
        return (
            <div>
                <Navbar></Navbar>
                <PollNotActive></PollNotActive>
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