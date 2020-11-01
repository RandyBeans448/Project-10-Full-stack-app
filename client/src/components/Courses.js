import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import ParticlesContainer from './Particles';

class Courses extends React.Component {
    state = {
      authenticatedUser: this.state,
      courses: [],
      errors: this.state,
      
    }

    componentDidMount() {
      this.setState({
          courses: this.props.context.actions.usersCourses()
      })
  }

  render() {
    const { context } = this.props; 
    const authedUser = context.authenticatedUser;
    let displayUser;
    let mappedCourses;
    let noAuthedUser;

    if(authedUser) {
      displayUser = this.props.context.authenticatedUser
    }

    if(this.props.context.courses !== null) {
        mappedCourses = this.props.context.courses.courses.map ((course) =>
       <div className="table-cell" key={course.id}> 
        <p>Course</p> 
        <NavLink to={`/courses/${course.id}`}> {course.title} </NavLink>
      </div>
    )
  } else if (this.props.context.courses !== null && authedUser === false) {
    noAuthedUser = this.props.context.courses.courses.map ((course) =>
    <div className="table-cell" key={course.id}> 
     <p>Course</p> 
     <NavLink to="/signin"> {course.title} </NavLink>
   </div>
    )
  } else {
      return (
        <div>
          <p> Loading.... </p>
        </div>
    )
  } 

  

  
    return (
      <div id="tsparticles" className="tsparticles">
        <div className="course-list-div">
          <div className="table">  
              {mappedCourses}
              {noAuthedUser}
            <div className="table-cell">
              <NavLink to="/courses/create"> + New Course </NavLink>
            </div>
          </div>   

        </div>
        <ParticlesContainer/>
      </div>
      
    );
  }
}

export default Courses;

