import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Data from '../Data';

export class UpdateCourse extends Component {
    constructor(props) {
        super(props)
        this.data = new Data();

        this.state = {
            authenticatedUser: this.state,
            emailAddress: '',
            password: '',
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            errors: this.state,
            courseDetails: []
          }

          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
          
    }


      componentDidMount() {
        const paramsId = this.props.match.params.id;
        const parsedId = parseInt(paramsId);

        const { context } = this.props; 
        const authedUser = context.authenticatedUser;
        const emailAddress = authedUser.emailAddress;
        const password = authedUser.password;

        this.setState({
            emailAddress: emailAddress,
            password: password
        });

        this.props.context.data.getCoursesById(parsedId).then((respsonse => {
            if(respsonse) {
                console.log('True');
                this.setState({
                    courseDetails: respsonse.course
                })
            }
        })).catch(error => {
            console.log('Course does not exsist', error);
        })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
            this.setState({
                    [name]: value
            });
      };

    handleSubmit = (event) => {

     const {
            title,
            description,
            estimatedTime,
            materialsNeeded 
            } = this.state;

     const updatedCourse = {
           title,
           description,
           estimatedTime,
           materialsNeeded 
         };

     const { emailAddress, password } = this.state;

        event.preventDefault();

        this.props.context.data.updateCourse(updatedCourse ,emailAddress, password).then((respsonse => {
            if(respsonse.status(201)) {
                console.log(respsonse);
            } else {
                throw new Error
            }
        })).catch(error => {
            console.log('Course was not updated', error);
        })
      };


    render () {

        const display = this.state.courseDetails;
        console.log(display);
        const { context } = this.props; 
        const authedUser = context.authenticatedUser;
    
        return (
            <div>
                <form className="grid"  onSubmit={this.handleSubmit}>
                    <div >
                        <div  className="gridLeft" >
                          <h3>Course title</h3>
                            <div>
                                <input id="title" name="title" type="text" onChange={this.handleChange} defaultValue={display.title}></input>
                            </div>
                                <p>By {authedUser.firstName} {authedUser.lastName}</p>
                        </div>
                            <div>
                                <div>
                                   <textarea className="updateDivRight" id="description" name="description"  onChange={this.handleChange} defaultValue={display.description}></textarea>
                                </div>
                            </div>
                    </div>
                    <div className="gridRight">
                        <div >
                            <ul>
                                <li>
                                <h4 className="h4-update">Estimated Time</h4>
                                    <div>
                                        <input className="update-right-input" id="estimatedTime" name="estimatedTime" type="text" onChange={this.handleChange} defaultValue={display.estimatedTime}></input>
                                    </div>
                                </li>
                                <li>
                                <h4 className="h4-update">Materials Needed</h4>
                                    <div>
                                        <textarea className="sideTextArea-2" id="materialsNeeded" name="materialsNeeded" onChange={this.handleChange} defaultValue={display.materialsNeeded}></textarea>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div >
                        <button className="button" type="submit">Update Course</button>
                        <NavLink to="/" >Cancel</NavLink>
                    </div>
                </form>
            </div>
        )
    }
};

export default UpdateCourse;
