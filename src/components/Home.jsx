import React, { Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../App';
import { Authentication } from './Authentication';
import Navbar from './Navbar';
import PollCard from './PollCard';
import "../components/style/poll_card.css"


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            token: "",
            redirect: null,
            pollName: ""
        }
        this.addPoll = this.addPoll.bind(this)
        this.auth = new Authentication()
    }
    authenticate(){
        this.auth.verifyOrUpdateToken()
        .then(data => {
            if(data.redirect !== null){
                this.setState({redirect: data.redirect})
            }
            else{
                this.setState({token: data.token})
            }
        })
    }
    componentDidMount(){
        this.authenticate()
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.token != this.state.token){
            this.fetchPolls()
        }
    }
    fetchPolls(){
        fetch(BASE_URL + "vote_api/poll", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.state.token
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data);    
            this.setState({polls: data})
        })
    }

    updatePollName(event){
        this.setState({
            pollName: event.target.value
        })
    }

    addPoll(){
        this.authenticate()
        let check = document.querySelector('#publicResultCheck').checked;
        let data = JSON.stringify({
            name: this.state.pollName,
            result_public: check
        })
        fetch(BASE_URL + "vote_api/poll", {
            method: "POST",
            body: data,
            headers: {
                "content-type": "Application/json",
                "Authorization": "Bearer " + this.state.token
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            this.fetchPolls()
        })
    }

    handlePollClick(id){
        this.setState({
            redirect: "/poll_detail/" + id
        })
    }
    redirectTo(path){
        this.setState({redirect: path})
    }
    updateToken(token){
        this.setState({token: token})
    }

    render() {
        if(this.state.redirect){
            return <Navigate to={this.state.redirect} />
        }
        return (
            <div>
                <Navbar></Navbar>
                <div class="container">
                    <div class="row row-cols-sm-auto justify-content-center">
                        <div className="col-sm-3">
                            <div data-bs-toggle="modal" data-bs-target="#addPollModal" className="pollCard">+</div>
                        </div>
                        {this.state.polls.map((poll) => <PollCard onClickListener={() => this.handlePollClick(poll.id)} key={poll.id} class="col-sm-3" name={poll.name}></PollCard>)}
                    </div>
                    
                </div>

                <div class="modal fade" id="addPollModal" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Create new poll</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div>
                          <input onChange={(event) => this.updatePollName(event)} type="text" class="form-control" placeholder="Poll name" />
                            <div class="form-check form-switch m-2">
                                <input class="form-check-input" type="checkbox" id="publicResultCheck" defaultChecked />
                                <label class="form-check-label" for="publicResultCheck">Make results public</label>
                            </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={this.addPoll} type="button" class="btn btn-primary" data-bs-dismiss="modal">Create</button>
                      </div>
                    </div>
                  </div>
                </div>
                
            </div>
        );
    }
    
}
 
export default Home;