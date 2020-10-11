
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
const ReactMarkdown = require('react-markdown')

export class CourseDetail extends Component {

        constructor(props) {
            super(props);
            this.state = {
                authenticatedUser: this.state,
                courses: [],
                errors: this.state,
                courseDetails: []
              }
        }

        componentDidMount() {
            const paramsId = this.props.match.params.id;
            const parsedId = parseInt(paramsId);
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

    render () {
        let display = this.state.courseDetails;
        console.log(display)
        
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
                            <NavLink to={`/updateCourse/${parsedId}`}  className="linksColumns"> Update </NavLink>
                            <NavLink to="/updateCourse" className="linksColumns"> Delete </NavLink>
                            <NavLink to="/"className="linksColumns" > Return </NavLink>
                        </div> 
                    </React.Fragment>          
            } else {
                returnBtn = 
                    <React.Fragment>
                        <div>  
                            <NavLink to="/" classname="links"> Return </NavLink>
                        </div> 
                    </React.Fragment> 
            }
        }
     
        return (
        <div className="grid">

            <div>
                <div className="gridLeft">
                <h3> Course </h3>
                <h1 className="courseDisplayH1"> {display.title} </h1>
                <h3> Owner </h3>
                {/* <h3> {coursesOwner.firstName}  {coursesOwner.lastName} </h3> */}
                <p className="detailDesc"> {display.description} </p>
                </div>
                <div className="gridRight">
                    {updateAndDeleteBtns}
                    {returnBtn}
                    <h3> Estimated time </h3>             
                    <p> {display.estimatedTime} </p>
                    <h3> Materials </h3>
                    <ul className="gridRight">
                        <li className="listToRight"> <ReactMarkdown source={markdownList}/> </li>
                    </ul>
                </div> 

            </div>
        </div>
        )
    }
}

export default CourseDetail;
