import React, { Component } from 'react'
import "../components/style/poll_card.css"

class PollCard extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <div onClick={this.props.onClickListener} className={this.props.class}>
                <div className="pollCard">
                    <div>{this.props.name}</div>
                </div>
            </div>
            
        );
    }
}
 
export default PollCard;