import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
                errors: this.state,
                courseDetails: []
              }

              this.deleteCourse = this.deleteCourse.bind(this);
        }

        componentDidMount() {
            
            const paramsId = this.props.match.params.id;
            const parsedId = parseInt(paramsId);

            const { context } = this.props; 
            const authedUser = context.authenticatedUser;
            const emailAddress = authedUser.emailAddress;
            const password = authedUser.password;

            console.log(authedUser);

            this.setState({
                emailAddress: emailAddress,
                password: password
            });

            this.props.context.data.getCoursesById(parsedId).then((respsonse => {
                if(respsonse) {
                    console.log('True')
                    this.setState({
                        courseDetails: respsonse.course
                    })
                }
            })).catch(error => {
                console.log('Course does not exsist', error)
            })

        }

        deleteCourse = () => {

            const deleteCourse = this.state.courseDetails;
            const emailAddress = this.state.emailAddress;
            const password = this.state.password;

            console.log(deleteCourse);

            this.props.context.data.deleteCourse(deleteCourse, emailAddress, password).then((respsonse => {
                if(respsonse.status === 200) {
                    console.log('destoryed');
                }
            })).catch(error => {
                console.log('Course not destoryed', error);
            })
          };

    render () {

        const display = this.state.courseDetails;
        console.log(display)
        const courseOwner = this.state.courseDetails.user;
        console.log(courseOwner)

        let markdownList = this.state.courseDetails.materialsNeeded;

        let updateAndDeleteBtns;
        let returnBtn;
     
        const paramsId = this.props.match.params.id;
        const parsedId = parseInt(paramsId);

        if (this.props.context.authenticatedUser !== null) {
            if (this.props.context.authenticatedUser.id === parsedId) {
  
                updateAndDeleteBtns = 
                    <React.Fragment>
                        <div >
                            <NavLink to={`/courses/${paramsId}/update`}  className="linksColumns"> Update </NavLink>
                            <NavLink to="/" onClick={this.deleteCourse} className="linksColumns"> Delete </NavLink>
                            <NavLink to="/"className="linksColumns" > Return </NavLink>
                        </div> 
                    </React.Fragment>          
            } else {
                returnBtn = 
                    <React.Fragment>
                        <div>  
                            <NavLink to="/courses" className="links"> Return </NavLink>
                        </div> 
                    </React.Fragment> 
            }
        }
     
        return (
        <div className="grid">
            <div id="tsparticles" className="tsparticles">
                <div className="gridLeft">
                <h3> Course </h3>
                <h1 className="detailH1"> {display.title} </h1>
                <h3> Owner </h3>
                {/* <h3> {courseOwner.firstName}  {courseOwner.lastName} </h3> */}
                <p className="detailDesc"> {display.description} </p>
                </div>
                <div className="gridRight">
                    {updateAndDeleteBtns}
                    {returnBtn}
                    <h3> Estimated time </h3>             
                    <p> {display.estimatedTime} </p>
                    <h3> Materials </h3>
                    <ul className="gridRight">
                        <li className="list-right"> <ReactMarkdown source={markdownList}/> </li>
                    </ul>
                </div> 

            </div>
            <ParticlesContainer/>
        </div>
        )
    }
}

export default CourseDetail;
