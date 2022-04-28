import React from 'react'
import { BASE_URL } from '../App';
import EditText from './EditText';


function Choice(props) {

    let voteBarStyle = {
        position: "absolute",
        height: "100%",
        width: `${parseInt(props.choice.votes/props.totalVotes*100)}%`,
        backgroundColor: "green",
        top: "0",
        left: ".5rem",
        opacity: ".1",
        borderRadius: "0 0 0 .5rem",
        pointerEvents: "none"
    }

    let updateChoice = (text, pk) => {
        if(text === ""){
            fetch(BASE_URL + "vote_api/choice/" + pk, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + props.token,
                }
            }).then(response => {
                if(response.status == 204){
                    console.log("choice deleted");
                    props.fetchData()
                }
            })
        }
        else{
            fetch(BASE_URL + "vote_api/choice/" + pk, {
                method: "PATCH",
                body: JSON.stringify({text: text}),
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": "Bearer " + props.token
                }
            }).then(response => response.json())
            .then(data => console.log(data))
        }
        
    }
    

    return (
        <div className="choiceContainer" style={{position: "relative"}}>
            <EditText onSave={updateChoice} pk={props.choice.id} value={props.choice.text}></EditText>
            <div style={voteBarStyle}></div>
        </div>
    );
}

export default Choice;