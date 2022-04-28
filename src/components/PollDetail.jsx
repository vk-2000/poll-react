import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../App';
import { Authentication } from './Authentication';
import EditText from './EditText';
import Navbar from './Navbar';
import Question from './Question';
import "../components/style/poll_detail.css"

function PollDetail() {
    const [data, setData] = useState([])
    const [token, setToken] = useState("")
    const [newQuestion, setNewQuestion] = useState("")
    const [redirect, setRedirect] = useState(null)
    const [newChoice, setNewChoice] = useState()
    const navigate = useNavigate()

    
    let authenticate = () => {
        auth.verifyOrUpdateToken()
        .then(data => {
            if(data.redirect !== null){
                setRedirect(data.redirect)
            }
            else{
                setToken(data.token)
            }
        })
    }
    
    useEffect(() => {
        authenticate()
        console.log("this " + this);
    }, [])

    useEffect(() => {
        if(redirect != null){
            navigate(redirect)
        }
    }, [redirect])

    useEffect(() => {
        fetchData()
    }, [token])


    let auth = new Authentication()
    let params = useParams()
    const poll_id = params.id


    let fetchData = () => {
        if(token == "") return
        fetch(BASE_URL + "vote_api/poll_detail/" + poll_id, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(response => response.json())
        .then(data => {
            setData(data)
            console.log(data);
        })
    }

    let addQuestion = () => {
        fetch(BASE_URL + "vote_api/question/" + data.id, {
            method: "POST",
            body: JSON.stringify({"desc": newQuestion, "poll": data.id}),
            headers: {
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            fetchData()
        })
    }

    let updatePollName = (name, pk) => {
        fetch(BASE_URL + "vote_api/poll/" + pk, {
            method: "PATCH",
            body: JSON.stringify({name: name}),
            headers: {
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        }).then(response => response.json())
        .then(data => console.log(data))
    }

    let updatePollCheckboxes = () => {
        let active = document.querySelector("#pollActiveCheck").checked
        let result_public = document.querySelector("#publicResultCheck").checked

        let body = {
            active: active,
            result_public: result_public
        }
        fetch(BASE_URL + "vote_api/poll/" + data.id, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        }).then(response => response.json())
        .then(data => console.log(data))
        
    }

    let deletePoll = () => {
        fetch(BASE_URL + "vote_api/poll/" + data.id, {
            method: "DELETE",
            headers: {
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        }).then(response => {
            if(response.status == 204){
                console.log("Poll deleted");
                navigate("/home")
            }
        })
    }

    

    
    

    
    

    
    return (
        <div>
            <Navbar></Navbar>

            

            <div className="col col-md-8 mx-auto">
                <div className="w-100 container">
                    <EditText pk={data.id} onSave={updatePollName} textSize="2rem" value={data.name}></EditText>

                    <div className=" container controlPanel d-flex justify-content-between flex-column flex-sm-row">
                        <div class="form-check form-switch m-2">
                            <input onClick={updatePollCheckboxes} class="form-check-input" type="checkbox" id="pollActiveCheck" defaultChecked={data.active} />
                            <label class="form-check-label" htmlFor="pollActiveCheck">Active</label>
                        </div>
                        <div class="form-check form-switch m-2">
                            <input onClick={updatePollCheckboxes} class="form-check-input" type="checkbox" id="publicResultCheck" defaultChecked={data.result_public} />
                            <label class="form-check-label" htmlFor="publicResultCheck">Make results public</label>
                        </div>
                        <button className="btn btn-success m-1" data-bs-toggle="modal" data-bs-target="#addQuestionModal">Add question</button>
                        <button className="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#deletePollModal">Delete poll</button>
                    </div>
                    <ol style={{padding: "0"}}>
                        {data.questions?.map((question) => {
                            return (
                                <li key={question.id} style={{listStyleType: "none"}}>
                                    <Question token={token} question={question} fetchData={fetchData}></Question>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>

            {/* Modal for adding a new question */}

            <div class="modal fade" id="addQuestionModal" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add question</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="input-group">
                        <input onChange={(event) => setNewQuestion(event.target.value)} type="text" class="form-control" placeholder="Question" />
                        </div>
                    </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={addQuestion} data-bs-dismiss="modal" type="button" class="btn btn-primary">Add</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal for deleting the poll */}

            <div class="modal fade" id="deletePollModal" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Delete Poll</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      Delete this poll ?
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                    <button onClick={deletePoll} data-bs-dismiss="modal" type="button" class="btn btn-danger">Yes</button>
                  </div>
                </div>
              </div>
            </div>
            
        </div>
        
    );
}

export default PollDetail;