import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Data from '../Data';
import ParticlesContainer from './Particles';

export class UpdateCourse extends Component {
    constructor(props) {
        super(props)
        this.data = new Data();

        this.state = {
            authenticatedUser: this.state,
            emailAddress: '',
            password: '',
            userId: '',
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            id: '', 
          }

          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);

    }


      componentDidMount() {

        // Sets the id state to the course id

        const paramsId = this.props.match.params.id;
        const parsedId = parseInt(paramsId);

        this.setState({
            id: parsedId
        });

        // Setting the email address and password to the authenticated user

        const { context } = this.props; 
        const authedUser = context.authenticatedUser;
        const emailAddress = authedUser.emailAddress;
        const password = authedUser.password;


        this.setState({
            emailAddress: emailAddress,
            password: password
        });

        // Using the rest api get method to retrieve the course based on the course id 

        context.data.getCoursesById(parsedId).then((response => {

            if(response) {
                this.setState({
                    title: response.course.title,
                    description: response.course.description,
                    estimatedTime: response.course.estimatedTime,
                    materialsNeeded: response.course.materialsNeeded,
                    userId: response.course.userId
                })
            }
        })).catch(error => {
            console.log('Course does not exists', error);
        })
    }

    // Takes the value from each text box or input and sets the state to the value of the corresponding name

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
            this.setState({
                    [name]: value
            });
      };

    handleSubmit = (event) => {

     const { context } = this.props;   

    // Takes the state of each value needed to authenticate a PUT request from the Rest Api.

     const {
            userId,
            title,
            description,
            estimatedTime,
            materialsNeeded 
            } = this.state;

    // Creates a new object with each property as the value of each corresponding state

     const updatedCourse = {
           userId,
           title,
           description,
           estimatedTime,
           materialsNeeded 
         };

     const { emailAddress, password } = this.state;
     const { id } = this.state;

        event.preventDefault();
     
     // The PUT request is made if title and description are not empty
     // PUT request requires the id of the course as well as the user email and password to make a change.

        if(updatedCourse.title !== '' || updatedCourse.description !== '') {
            context.data.updateCourse(id, updatedCourse, emailAddress, password).then((response => {
                if(response) {
                    console.log(response);
                    this.props.history.push('/');
                } else {
                    throw new Error();
                }
            })).catch(errors => {
                console.log('Course was not updated', errors);
            })
        }
      };

    render () {

        const { context } = this.props; 
        const authedUser = context.authenticatedUser;

        let titleValidation;
        let descriptionValidation;

        /*
         If the the values of title and descriptions are empty Validation errors will be rendered 
         to let the user know to fill in each field.
        */

        if (this.state.title === '') {
            titleValidation = <p className="create-div-validations"> * Please give a value for the title </p>
        }

        if (this.state.description === '') {
            descriptionValidation = <p className="create-div-validations"> * Please give a value for the description </p>
        }
        
        return (
            <div >
                <h1 className="update-h1"> Update Course </h1>
                {titleValidation}
                {descriptionValidation}
                <form onSubmit={this.handleSubmit}>
                    <div className="update-div">
                        <div className="update-div-left">
                            <h3>Course title</h3>
                        <div>
                            <input id="title" name="title" type="text" onChange={this.handleChange} className="update-div-input" value={this.state.title}></input>
                        </div>
                            <p>By {authedUser.firstName} {authedUser.lastName}</p>
                             <textarea className="text-area-left" id="description" name="description"  onChange={this.handleChange} value={this.state.description}></textarea>
                    </div>
                    <div className="update-div-right">
                        <ul className="list-style-right">
                            <li>
                            <h4>Estimated Time</h4>
                                <div>
                                    <input className="update-div-input-right"  id="estimatedTime" name="estimatedTime" type="text"  onChange={this.handleChange} defaultValue={this.state.estimatedTime}></input>
                                </div>
                            </li>
                            <li>
                            <h4 >Materials Needed</h4>
                                <div>
                                    <textarea className="text-area-right" id="materialsNeeded" name="materialsNeeded" onChange={this.handleChange} defaultValue={this.state.materialsNeeded}></textarea>
                                </div>
                            </li>
                        </ul>
                    </div>
                    </div>
                    <div className="buttons">
                        <button className="update-button"type="submit">Update Course</button>
                        <NavLink className="update-button" to="/" >Cancel</NavLink>
                    </div>
                    <div id="tsparticles" className="tsparticles"/>
                </form>
                <ParticlesContainer/>
            </div>
        )
    }
};

export default UpdateCourse;
