import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from './Form';
import ParticlesContainer from './Particles';

export class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }
    render () {
      const {
        firstName,
        lastName,
        emailAddress,
        password,
        errors,
      } = this.state;
  
        return (
    <div className="sign-up-div">
        <div>
          <h1>Sign Up</h1>
          <Form 
          errors={errors}
          submit={this.submit}
          elements={() => (
              <React.Fragment>
                  <input
                    className="sign-up-input" 
                    id="firstName" 
                    name="firstName" 
                    type="text"
                    value={firstName}
                    onChange={this.change} 
                    placeholder="First name" />
                  <input
                    className="sign-up-input" 
                    id="LastName" 
                    name="lastName" 
                    type="text"
                    value={lastName}
                    onChange={this.change} 
                    placeholder="Last Name" />
                  <input
                    className="sign-up-input" 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="text"
                    value={emailAddress}
                    onChange={this.change} 
                    placeholder="emailAddress" />
                  <input 
                    className="sign-up-input"
                    id="password" 
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.change} 
                    placeholder="Password" />
                </React.Fragment>
                )} />
             </div>
             <ParticlesContainer/>
          <p>
            Already have a user account? <Link className="sign-in-link" to="/"> Sign in! </Link>  
          </p>
        </div>
        )
    }

    change = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      
      this.setState(() => {
        return {
          [name]: value
        };        
      });
      console.log(name);
      console.log(value);
    }

    submit = () => {

      const { context } = this.props;

      const { 
        firstName,
        lastName,
        emailAddress,
        password
      } = this.state;

      const user =  { 
        firstName,
        lastName,
        emailAddress,
        password
      };

      context.data.createUser(user)
        .then( errors => {
        if (errors.length) {
          this.setState({ errors });
          console.log(errors);
          } else {
            context.actions.signIn(emailAddress, password)
            .then(() => {
            this.props.history.push('/courses');    
            });
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(this.state.errors);
          this.props.history.push('/error');
        });
      }
}

export default UserSignUp;
