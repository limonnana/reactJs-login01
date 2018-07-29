import { LinkContainer } from "react-router-bootstrap";
import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./Routes";
import "./App.css";



class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false
    };
  }
  
 

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  render() {
      //This is a call to config properties .env file in root folder project
      require('dotenv').config();
      const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/users">Limonnana</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
            {this.state.isAuthenticated ? (
            <Fragment>
            <LinkContainer to="/users">
            <NavItem>Users</NavItem>
            </LinkContainer>

            <NavItem onClick={this.handleLogout}>Logout</NavItem>
            </Fragment>
          
          
          ) : (
            <Fragment>
            <LinkContainer to="/signup">
            <NavItem>Signup</NavItem>
            </LinkContainer>
           <LinkContainer to="/login">
           <NavItem>Login</NavItem>
           </LinkContainer>
           </Fragment>
            )
}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
