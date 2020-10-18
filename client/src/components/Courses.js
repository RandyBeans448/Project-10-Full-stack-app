import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';

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
    console.log(mappedCourses);

    if(authedUser) {
      displayUser = this.props.context.authenticatedUser
    }

    if(this.props.context.courses !== null) {
        mappedCourses = this.props.context.courses.courses.map ((course) =>
       <li className="linksLi" key={course.id}>  
        <Link className="links" to={`/${course.id}`}> {course.title} </Link>
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
      <div >

        <div className="courses-list-div">
          <h1> Courses </h1>
          {/* <h1> Welcome {authedUser.firstName} {authedUser.lastName}</h1>
          <p>{authedUser.firstName} {authedUser.lastName}s courses</p> */}
          <div>
            <ul>
              <li>{mappedCourses}</li>
            </ul>
          </div>   
          <div>
            <Link className="button" to="/create"> Create Course </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;

