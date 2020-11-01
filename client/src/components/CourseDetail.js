import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import ParticlesContainer from './Particles';
const ReactMarkdown = require('react-markdown')

export class CourseDetail extends Component {

        constructor(props) {
            super(props);
            this.state = {
                authenticatedUser: this.state,
                emailAddress: '',
                password: '',
                courses: [],
                errors: '',
                courseDetails: [],
                userId: [],
                id: '', 
              }

              this.deleteCourse = this.deleteCourse.bind(this);
        }

        componentDidMount() {
            
            const paramsId = this.props.match.params.id;
            const parsedId = parseInt(paramsId);

            this.setState({
                id: parsedId
            })

            const { context } = this.props; 
            const authedUser = context.authenticatedUser;
            const emailAddress = authedUser.emailAddress;
            const password = authedUser.password;

            console.log(authedUser);

            this.setState({
                emailAddress: emailAddress,
                password: password
            });

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
            const emailAddress = this.state.emailAddress;
            const password = this.state.password;
            const { id } = this.state

            console.log(emailAddress);
            console.log("Email address is filled")         

            context.data.deleteCourse(id, emailAddress, password).then((respsonse => {
                if(respsonse.status === 200) {
                    console.log('destoryed');
                    // return <Redirect to='/'/>
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

        let markdownList = this.state.courseDetails.materialsNeeded;

        let updateAndDeleteBtns;
        let returnBtn;
     
        const paramsId = this.props.match.params.id;
        const parsedId = parseInt(paramsId);

        if (this.props.context.authenticatedUser !== null) {
            if (this.props.context.authenticatedUser.id === userId) {
  
                updateAndDeleteBtns = 
                    <React.Fragment>
                        <div >
                            <NavLink to={`/courses/${paramsId}/update`}  className="nav-button"> Update </NavLink>
                            <NavLink to="/" onClick={this.deleteCourse}  className="nav-button"> Delete </NavLink>
                            <NavLink to="/" className="nav-button" > Return </NavLink>
                        </div> 
                    </React.Fragment>          
            } else {
                returnBtn = 
                    <React.Fragment>
                        <div>  
                            <NavLink to="/" className="nav-button"> Return </NavLink>
                        </div> 
                    </React.Fragment> 
            }
        }
     
        return (
        <div className="action-margin">
            <div className="action-bar">
            {updateAndDeleteBtns}
            {returnBtn}
            </div>
            <div className="detail-div">
            <div >
                <div className="detail-div-left">
                <h3> Course </h3>
                <h1 className="detailH1"> {display.title} </h1>
                <h3> Owner </h3>
                {/* <h3> {courseOwner.firstName}  {courseOwner.lastName} </h3> */}
                <p className="detailDesc"> {display.description} </p>
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
