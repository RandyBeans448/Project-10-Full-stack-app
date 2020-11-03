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

            context.data.getCoursesById(parsedId).then((respsonse => {
                if(respsonse) {
                    this.setState({
                        courseDetails: respsonse.course,
                        userId: respsonse.course.userId
                    })
                }
            })).catch(error => {
                console.log('Course does not exsist', error)
            })
        }

        deleteCourse = () => {

            const { context } = this.props; 
            const { id } = this.state
            const authedUser = context.authenticatedUser;
            const emailAddress = authedUser.emailAddress;
            const password = authedUser.password;

            if (this.state.authenticatedUser) {
                this.setState({
                    emailAddress: emailAddress,
                    password: password
                });
            }

            context.data.deleteCourse(id, emailAddress, password).then((respsonse => {
                if(respsonse) {
                    console.log('destoryed');          
                }
            })).catch(errors => {
                console.log('Course not destoryed', errors);
                this.setState({ errors });
                console.log(this.state.errors);
            })
          };

    render () {

        const display = this.state.courseDetails;

        const userId = this.state.userId;
        const user = display.user;
        console.log(user)

        // const firstName = user.user.firstName;
        // console.log(firstName)

        let markdownList = this.state.courseDetails.materialsNeeded;
        let markdownDesc = this.state.courseDetails.description;

        let updateAndDeleteBtns;
     
        const paramsId = this.props.match.params.id;

        if (this.props.context.authenticatedUser !== null) {
            if (this.props.context.authenticatedUser.id === userId) {
  
                updateAndDeleteBtns = 

                    <React.Fragment>
                            <NavLink to={`/courses/${paramsId}/update`}  className="nav-button"> Update </NavLink>
                            <NavLink to="/" onClick={this.deleteCourse}  className="nav-button"> Delete </NavLink>
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
                    <h1 className="detailH1"> {display.title} </h1>
                    <h3> Owner </h3>
                    {/* <h3> {user.firstName}  {user.lastName} </h3> */}
                    <span className="detailDesc"> <ReactMarkdown source={markdownDesc}/> </span>
                </div>
                    <div className="detail-div-right">
                        <h3> Estimated time </h3>             
                        <p> {display.estimatedTime} </p>
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
