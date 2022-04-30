import React, { Component } from 'react';
class Navbar extends Component {
    
    render() {
        return (
        <nav class="navbar background-primary">
            <div class="container-fluid text-white" >
                <a class="navbar-brand text-white" href="">Vote</a>
                <a style={{textDecoration: "none"}} class="navbar-brand" href=""><i class="bi bi-github"></i></a>
            
            </div>
        </nav>);
    }
}
 
export default Navbar;