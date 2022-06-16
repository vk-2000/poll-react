import React from 'react'
import { useNavigate, useParams } from 'react-router';
import "../components/style/voted.css"

function Voted(props) {
    const navigate = useNavigate()
    const params = useParams()
    return (
        <div className='d-flex' style={{height: "90vh"}}>
            <div className='row justify-content-center m-0 align-self-center w-100'>
                <div className='col col-sm-6 col-md-4 justify-content-center'>
                    <img className='img-fluid w-100 p-3 displayImg' src="https://news.uchicago.edu/sites/default/files/images/2019-07/Mobile%20voting.jpg" alt="" />
                </div>
                <div className='display-5 text-center m-3'>
                    Thanks for voting
                </div>
                <div className='row justify-content-center m-3'>
                    <div className='col col-sm-6 col-md-4'>
                        <button onClick={() => navigate("/result/" + params.id)} className='btn btn-success w-100'>Check result</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Voted;