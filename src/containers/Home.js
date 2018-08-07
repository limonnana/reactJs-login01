import React, { Component } from "react";
import "./Home.css";
import axios from 'axios';
import Cookies from 'universal-cookie';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.getSession();
    this.state = {
      isLoading: false,
      email: this.props.theEmail
    }
    console.log("EMAIL IS: " + this.props.theEmail);
   }

  getSession(){
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
        
        if(response.data.userId !== undefined){
          console.log("this is the session ");
          this.props.userHasAuthenticated(true);
        }else{
          console.log(" No Session alive, token expired ");
          this.props.history.push("/login");
        }
    })
    .catch(function (response) {
       // this.setState({isLoading:false} );
        console.log(response);
    });
    }else{
      console.log(" No Session alive from cookie");
      this.props.history.push("/login");
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