import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ParticlesContainer from './Particles';
const ReactMarkdown = require('react-markdown')

export class CourseDetail extends Component {

        constructor(props) {
            super(props)
            this.state = {
                authenticatedUser: this.state,
                emailAddress: '',
                password: '',
                courses: [],
                errors: [],
                courseDetails: [],
                userId: [],
                id: '',
                firstName: null,
                lastName: null, 
              }

              this.deleteCourse = this.deleteCourse.bind(this);
        }

        componentDidMount() {
            
            const { context } = this.props; 
            const paramsId = this.props.match.params.id;
            const parsedId = parseInt(paramsId);

            this.setState({
                id: parsedId
            })

            context.data.getCoursesById(parsedId).then((response => {
                if(response) {
                    this.setState({
                        courseDetails: response.course,
                        userId: response.course.userId,
                        firstName: response.course.user.firstName,
                        lastName: response.course.user.lastName
                    })
                }
            })).catch(error => {
                console.log('Course does not exist', error)
            })
        }
        
        

        deleteCourse = () => {

            const { context } = this.props; 
            const { id } = this.state
            const authedUser = context.authenticatedUser;
            const emailAddress = authedUser.emailAddress;
            const password = authedUser.password;

            context.data.deleteCourse(id, emailAddress, password).then((response => {
                if(response) {
                    this.props.history.push('/');   
                }
            })).catch(errors => {
                console.log('Course not destroyed', errors);
                this.setState({ errors });
            })
          };

    render () {

        const { courseDetails } = this.state
        const userId = courseDetails.userId;
        const user = courseDetails.user;

        let markdownList = courseDetails.materialsNeeded;
        let markdownDesc = courseDetails.description;

        let updateAndDeleteBtns;
     
        const paramsId = this.props.match.params.id;

        if (this.props.context.authenticatedUser !== null) {
            if (this.props.context.authenticatedUser.id === userId) {
  
                updateAndDeleteBtns = 

                    <React.Fragment>
                            <NavLink to={`/courses/${paramsId}/update`}  className="nav-button"> Update </NavLink>
                            <button to="/" onClick={this.deleteCourse}  className="nav-button"> Delete </button>
                    </React.Fragment>          
            } 
        }
     
        return (
            <div className="action-margin">
                <div className="action-bar">
                <NavLink to="/" className="nav-button"> Return </NavLink>
                {updateAndDeleteBtns}
                </div>
            <div className="detail-div">
                <div >
                <div className="detail-div-left">
                    <h3> Course </h3>
                    <h1 className="detailH1"> {courseDetails.title} </h1>
                    <h3> Owner </h3>
                    <h3> {this.state.firstName}  {this.state.lastName} </h3>
                    <span className="detailDesc"> <ReactMarkdown source={markdownDesc}/> </span>
                </div>
                    <div className="detail-div-right">
                        <h3> Estimated time </h3>             
                        <p> {courseDetails.estimatedTime} </p>
                        <h3> Materials </h3>
                            <ul className="list-detail-style-right">
                                <li > <ReactMarkdown source={markdownList}/> </li>
                            </ul>
                    <div id="tsparticles" className="tsparticles">
                    </div> 
                </div>
            </div>
            <ParticlesContainer/>
                </div>
            </div>
        )
    }
}

export default CourseDetail;
