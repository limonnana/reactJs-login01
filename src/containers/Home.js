import React, { Component } from "react";
import "./Home.css";
import axios from 'axios';
import Cookies from 'universal-cookie';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: this.props.theEmail
    }
    console.log("EMAIL IS: " + this.props.theEmail);
    this.session();
  }

  session(){
    const cookie = new Cookies();
    var theCookie = cookie.get('limonnana');
    if(theCookie !== undefined){
    let token = theCookie.token;
    let userId = theCookie.userId;
    console.log("token:" + token + " userId:" + userId);
    const domain =  process.env.REACT_APP_DOMAIN;
    axios.post(domain + '/getSession', 
    {
      userId: userId, token: token
    })
    .then((response)=> {
        console.log(" this is the response userId: " + response.data.userId);
        
        if(response.data.userId !== 'Success'){
          console.log("this is the session ");
          
        }
    })
    .catch(function (response) {
       // this.setState({isLoading:false} );
        console.log(response);
    });
    }
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Home</h1>
       {this.state.email}
        </div>
      </div>
    );
  }
}