import React, { Component } from 'react'

function PollNotActive() {
    return (
        <div className='d-flex' style={{height: "90vh"}}>
            <div className='row justify-content-center m-0 align-self-center w-100'>
                <div className='col col-sm-6 col-md-4 justify-content-center'>
                    <img className='img-fluid w-100 p-3 displayImg' src="https://campaign.activehealth.sg/hs-fs/hub/6212555/hub_generated/resized/27d7c920-7357-4382-927b-a76d4d27d04a.png" alt="" />
                </div>
                <div className='display-5 text-center m-3'>
                    Poll not active
                </div>

            </div>
        </div>
    );
}

export default PollNotActive;