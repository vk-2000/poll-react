import React, { useState }  from 'react'
import EditText from './EditText';
import "../components/style/question.css"
import Choice from './Choice';
import { BASE_URL } from '../App';
import Graphs from './Graphs';

function Question(props) {

    const chartData = []
    const [newChoice, setNewChoice] = useState()
    let totalVotes = 0
    let i = 0
    props.question.choices.map((choice) => {
        chartData.push({index: String.fromCharCode(97 + i++), votes: choice.votes})
        totalVotes += choice.votes
    })

    let updateQuestion = (desc, pk) => {
        fetch(BASE_URL + "vote_api/question/" + pk, {
            method: "PATCH",
            body: JSON.stringify({desc: desc}),
            headers: {
                "Content-type": "Application/json",
                "Authorization": "Bearer " + props.token
            }
        }).then(response => response.json())
        .then(data => console.log(data))
    }

    let addChoice = () => {
        console.log(props.question.id);
        fetch(BASE_URL + "vote_api/choice/" + props.question.id, {
            method: "POST",
            body: JSON.stringify({text: newChoice}),
            headers: {
                "Content-type": "Application/json",
                "Authorization": "Bearer " + props.token
            }
        }).then(response => response.json())
        .then(data => props.fetchData())
    }

    let deleteQuestion = () => {
        fetch(BASE_URL + "vote_api/question/" + props.question.id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + props.token,
                "Accept": "Application/json",
                "Content-type": "Application/json"
            }
        }).then(response => {
            if(response.status == 204){
                console.log("Deleted");
                props.fetchData()
            }
        })
    }

    return (
        <div className="questionBody">

            <div className="questionDelete btn btn-danger" onClick={deleteQuestion}><i class="bi bi-trash"></i></div>


            <div>
                <EditText canEdit={!props.result} textSize="2rem" pk={props.question.id} value={props.question.desc} onSave={updateQuestion}></EditText>
                <hr />
                <ol type="a">
                    {props.question.choices.map((choice) => {
                        return (
                            <li key={choice.id}>
                                <Choice result={props.result} totalVotes={totalVotes} token={props.token} choice={choice} fetchData={props.fetchData} ></Choice>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target={`#addChoiceModal${props.question.id}`}>+</button>
            </div>
            <hr />


            { props.question.choices.length != 0 &&
                <Graphs chartData={chartData}></Graphs>
            }

            {/* Modal for adding a new choice */}

            <div class="modal fade" id={`addChoiceModal${props.question.id}`} tabindex="-1" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add choice</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="input-group">
                        <input onChange={(event) => setNewChoice(event.target.value)} type="text" class="form-control" placeholder="Choice" />
                        </div>
                    </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button onClick={addChoice} data-bs-dismiss="modal" type="button" class="btn btn-primary">Add</button>
                  </div>
                </div>
              </div>
            </div>
        </div>

        
        
    );
}

export default Question;