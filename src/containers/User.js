import React, { Component } from "react";
import {
    FormGroup,
    FormControl,
    ControlLabel
  } from "react-bootstrap";
  import LoaderButton from "../components/LoaderButton";
import "./User.css";
import axios from 'axios';

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name:null,
      lastName:null,
      phone:null,
      email:null,
      password:null,
      confirmPassword:null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.phone.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
   
    this.setState({ isLoading: true });

    axios.post('http://localhost:9000/updateUser', 
        {
          name: this.state.name, lastName: this.state.lastName ,email:this.state.email, phone:this.state.phone, password: this.state.password
        })
        .then((response)=> {
            console.log(" this is the response: " + response.data);
            
            if(response.data === 'Success'){
              this.props.history.push("/users");
            }
        })
        .catch(function (response) {
            //this.setState({ isLoading: false });
            console.log(response);
        });

    this.setState({ isLoading: false });
  }

  async componentDidMount() {
    try {
     
       this.getUser();
      
    } catch (e) {
      alert(e);
    }
  }

  getUser() {
      const url = "http://localhost:9000/user/" + this.props.match.params.id;
      axios.get(url).then(res => {
        
        const id = res.data.id;
        const name = res.data.name;
        const lastName = res.data.lastName;
        const phone = res.data.phone;
        const email = res.data.email;
        this.setState({id, name , lastName,phone,email });
        
    })
  }

  render() {
    //return <div className="User">{this.state.id} {this.state.name} {this.state.lastName} {this.state.phone} {this.state.email}</div>;
    return (
        <form onSubmit={this.handleSubmit}>
         
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
             autoFocus
              value={this.state.name}
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="lastName" bsSize="large">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              value={this.state.lastName}
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="phone" bsSize="large">
            <ControlLabel>Phone</ControlLabel>
            <FormControl
              value={this.state.phone}
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            //disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Signup"
            loadingText="Signing up…"
          />
        </form>
      );
    }
  
}