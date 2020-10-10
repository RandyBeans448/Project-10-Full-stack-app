import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
const ReactMarkdown = require('react-markdown')

export class CourseDetail extends Component {

        constructor(props) {
            super(props);
            // this.handleChange = this.handleChange.bind(this)
            this.state = {
                authenticatedUser: this.state,
                courses: [],
                errors: this.state,
                updateCourse: []
              }
        }
        



      componentDidMount() {
        this.props.context.actions.usersCourses();
      }

    //   componentWillUnmount() {
    //     this.changeCourseState()
    //   }

    // handleChange() {
    //     this.setState({updateCourse: displayCourses});
    //   }
    


    render () {

        const paramsId = this.props.match.params.id;
        const parsedId = parseInt(paramsId);
        let displayCourses = []
        let coursesOwner = []
        let markdownList;
        let updateAndDeleteBtns;
        let returnBtn;
        const { context } = this.props

        if(this.props.context.courses !== null) {
            this.props.context.courses.courses.forEach(element => {
            let courses = element;
            console.log(courses);
            if(courses.id === parsedId) {
                console.log('Working')
                displayCourses = courses;
                coursesOwner = displayCourses.user
                markdownList = displayCourses.materialsNeeded;
                
            }
          });
        }

        if (this.props.context.authenticatedUser !== null) {
            if (this.props.context.authenticatedUser.id === coursesOwner.id) {
  
                updateAndDeleteBtns = 
                    <React.Fragment>
                        <div >
                            <NavLink onClick={this.handleChange} to={`/updateCourse/${paramsId}`}  className="linksColumns"> Update </NavLink>
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

        // function changeCourseState() {
        //     if (displayCourses !== null) {
        //        console.log('change')
        //        this.setState(() => {
        //            return {
        //             currentCourse: displayCourses
        //            };
        //          });
        //     }
        //  }


     
        return (
        <div className="grid">

            <div>
                <div className="gridLeft">
                <h3> Course </h3>
                <h1 className="courseDisplayH1"> {displayCourses.title} </h1>
                <h3> Owner </h3>
                <h3> {coursesOwner.firstName}  {coursesOwner.lastName} </h3>
                <p className="detailDesc"> {displayCourses.description} </p>
                </div>
                <div className="gridRight">
                    {updateAndDeleteBtns}
                    {returnBtn}
                    <h3> Estimated time </h3>             
                    <p> {displayCourses.estimatedTime} </p>
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
