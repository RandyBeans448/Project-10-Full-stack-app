import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import Data from '../Data';
import ParticlesContainer from './Particles';

export class CreateCourse extends Component {

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
            errors: [],
          }

          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
          
    }

    componentDidMount() {

        const { context } = this.props; 
        const authedUser = context.authenticatedUser;
        const emailAddress = authedUser.emailAddress;
        const password = authedUser.password;
        const userId = authedUser.id;

        this.setState({
            emailAddress: emailAddress,
            password: password,
            userId: userId
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

        const { context } = this.props;
        const { history } = this.props;

        const {
               userId, 
               title,
               description,
               estimatedTime,
               materialsNeeded 
               } = this.state;
              
        const newCourse = {
              userId,
              title,
              description,
              estimatedTime,
              materialsNeeded 
            };

        const { emailAddress, password } = this.state;

        event.preventDefault();
        
        context.data.createCourse(newCourse, emailAddress, password).then((respsonse => {
            if (respsonse.status === 201 && newCourse.title !== null && newCourse.description !== null) {
                history.push(`/courses/${newCourse.id}`);
            } else {
                throw new Error
            }
        })).catch(errors => {
            console.log('Course was not created', errors);
            this.setState({ errors });
        })
        console.log(newCourse.id)
      };
      
    render () {

        let titleVaildation;
        let descriptionVaildation;

        if (this.state.title === '') {
            titleVaildation = <p className="create-div-vaildations"> * Please give a value for the title </p>
        }

        if (this.state.description === '') {
            descriptionVaildation = <p className="create-div-vaildations"> * Please give a value for the description </p>
        }
        
        return (
        <div  id="tsparticles" className="tsparticles">
            <h1 className="create-h1"> Create course </h1>
            {titleVaildation}
            {descriptionVaildation}
                <form onSubmit={this.handleSubmit}> 
                    <div className="create-div">
                        <div className="create-div-left">
                            <h4>Title</h4>
                            <input id="title" name="title" type="text" placeholder="Course title" defaultValue="" className="create-div-input"  onChange={this.handleChange}></input>
                            <h4>Course description</h4>
                            <textarea id="description" className="text-area-left" name="description" placeholder="Course description" onChange={this.handleChange}></textarea>
                        </div>
                        <div className="create-div-right">
                            <ul>
                                <li className="create-div-li">
                                    <h4 className="h4-create">Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedTime" type="text" placeholder="Hours" className="create-div-input-right" onChange={this.handleChange} ></input>
                                        </div>
                                </li>
                                <li className="create-div-li">
                                    <h4 className="h4-create">Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" className="create-textarea-right" name="materialsNeeded" placeholder="List materials" onChange={this.handleChange}></textarea>
                                        </div>
                                </li>
                            </ul>
                        </div>
            
                    </div>
                        <div className="create-div-buttons">
                            <button className="create-buttons" type="submit">Create Course</button>
                            <NavLink className="create-buttons" to="/" >Cancel</NavLink>
                        </div>
                </form>
                <ParticlesContainer/>
                </div>
        )
    }
}

export default CreateCourse;
