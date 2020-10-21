import React, { Component } from 'react';
import Data from '../Data';

export class CreateCourse extends Component {

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
          }

          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
          
    }

    componentDidMount() {

        const { context } = this.props; 
        const authedUser = context.authenticatedUser;
        const emailAddress = authedUser.emailAddress;
        const password = authedUser.password;

        this.setState({
            emailAddress: emailAddress,
            password: password
        })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
            this.setState({
                    [name]: value
            });

            console.log(name);
            console.log(value);
      };

    handleSubmit = (event) => {

        const { context } = this.props;

        const {
               title,
               description,
               estimatedTime,
               materialsNeeded 
               } = this.state;

        const newCourse = {
              title,
              description,
              estimatedTime,
              materialsNeeded 
            };

        const { emailAddress, password } = this.state;

        event.preventDefault();
        
        context.data.createCourse(newCourse, emailAddress, password).then((respsonse => {
            if(respsonse.status === 201) {
                console.log(respsonse);
                console.log("console.log");
            } else {
                throw new Error
            }
        })).catch(errors => {
            console.log('Course was not created', errors);
            this.setState({ errors });
            console.log(this.state.errors);
        })
      };
      
    render () {

        console.log(this.state.emailAddress);
        console.log(this.state.password);

        return (
        <div className="grid">
            <h1 className="h1-left"> Create course </h1>
                <form onSubmit={this.handleSubmit}> 
                    <div >
                        <div className="gridLeft">
                            <input id="title" name="title" type="text" placeholder="Course title" defaultValue="" className="create-title-input"  onChange={this.handleChange}></input>
                            <h4>Course description</h4>
                            <textarea id="description" name="description" placeholder="Course description" onChange={this.handleChange}></textarea>
                        </div>
                        <div className="gridRight">
                            <ul>
                                <li>
                                    <h4 className="h4-create">Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedTime" type="text" placeholder="Hours" className="create-time-input" onChange={this.handleChange} ></input>
                                        </div>
                                </li>
                                <li >
                                    <h4 className="h4-create">Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" className="sideTextArea" name="materialsNeeded" placeholder="List materials" onChange={this.handleChange}></textarea>
                                        </div>
                                </li>
                            </ul>
                        </div>
            
                    </div>
                        <div>
                            <button type="submit" className="linksColumns">Create Course</button>
                            <button className="linksColumns">Cancel</button>
                        </div>
                </form>
        </div>
        )
    }
}

export default CreateCourse;
