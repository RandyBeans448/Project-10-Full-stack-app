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

    if(authedUser) {
      displayUser = this.props.context.authenticatedUser
    }

    if(this.props.context.courses !== null) {
        mappedCourses = this.props.context.courses.courses.map ((course) =>
       <li className="linksLi" key={course.id}>  
        <Link className="links" to={`/courses/${course.id}`}> {course.title} </Link>
      </li>
                      
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
          <h1 className="course-list-h1"> Courses </h1>
          {/* <h1> Welcome {authedUser.firstName} {authedUser.lastName}</h1>
          <p>{authedUser.firstName} {authedUser.lastName}s courses</p> */}
          <div>
            <ul>
              <li>{mappedCourses}</li>
            </ul>
          </div>   
          <div className="createButton">
            <li>
            <Link className="button" to="/courses/create"> Create Course </Link>
            </li>
          </div>
        </div>
        <ParticlesContainer/>
      </div>
      
    );
  }
}

export default Courses;

