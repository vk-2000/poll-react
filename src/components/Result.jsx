import React, { Component, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { BASE_URL } from '../App';
import Navbar from './Navbar';
import "../components/style/question.css"
import Graphs from './Graphs';

function Result() {

    const params = useParams()
    const poll_id = params.id
    const [data, setData] = useState()
    const [status, setStaus] = useState(200)

    let fetchPoll = () => {
        fetch(BASE_URL + "vote_api/result/" + poll_id, {
            method: "GET"
        }).then(response => response.json()
        .then(data => {
            if(response.status == 200){
                setData(data)
            }
            else if(response.status >= 400){
                setStaus(response.status)
            }
        }))
    }

    useEffect(() => {
        fetchPoll()
    }, [])

    let textStyle = {
        borderBottom: "1px solid rgb(238, 238, 238)",
        borderLeft: "1px solid rgb(238, 238, 238)",
        margin: ".5rem",
        borderRadius: "0 0 0 .5rem",
        padding: ".5rem"
    }

    

    if(status == 404){
        return (
            
            <div>
                <Navbar></Navbar>
                Poll not found
            </div>
        )
    }
    if(status == 403){
        return (
            <div>
                <Navbar></Navbar>
                Result not available
            </div>
        )
    }


    return (
        <div>
            <Navbar></Navbar>

            

            <div className="col col-md-8 mx-auto">
                <div className="w-100 container">
                    <div className="display-5" style={textStyle}>
                        {data?.name}
                    </div>

                    <ol style={{padding: "0"}}>
                        {data?.questions?.map((question) => {
                            const chartData = []
                            let totalVotes = 0
                            let i = 0
                            question.choices.map((choice) => {
                                chartData.push({index: String.fromCharCode(97 + i++), votes: choice.votes})
                                totalVotes += choice.votes
                            })
                            return (
                                <li key={question.id} style={{listStyleType: "none"}}>
                                    <div className='questionBody'>
                                        <div>
                                            <div className='display-6' style={textStyle}>
                                                {question.desc}
                                            </div>
                                            <hr />
                                            <ol type="a">
                                                {question.choices.map((choice) => {
                                                    let voteBarStyle = {
                                                        position: "absolute",
                                                        height: "100%",
                                                        width: `${parseInt(choice.votes/totalVotes*100)}%`,
                                                        backgroundColor: "green",
                                                        top: "0",
                                                        left: ".5rem",
                                                        opacity: ".1",
                                                        borderRadius: "0 0 0 .5rem",
                                                        pointerEvents: "none"
                                                    }
                                                    return (
                                                        <li key={choice.id}>
                                                            <div className="choiceContainer" style={{position: "relative"}}>
                                                                <div style={textStyle}>{choice.text}</div>
                                                                <div style={voteBarStyle}></div>
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ol>
                                            <hr />
                                            { question.choices.length != 0 &&
                                                <Graphs chartData={chartData}></Graphs>
                                            }
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default Result;