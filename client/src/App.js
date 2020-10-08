import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';

import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';
import PrivateRoute from './PrivateRoute';
import withContext from './Context';
import ErrorBoundary from './components/ErrorBoundary';

//Conneting the SignUp & SignIn to context.

//This shares the data and actions throughout the component tree

/* Adding the const's as the component to the route handler
lets the components UserSignIn & UserSignUp gain access to 
the function in context and any data or actions passed into
<Context.Provider value={value}> */

const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

/* To let the user know they are signed in
need to make changes to the name display in the end header */

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailsWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse)
const CreateCourseWithContext = withContext(CreateCourse)

export default () => (
  <Router>
    <div>
    <HeaderWithContext/>
          <Switch>
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route exact path="/" component={CoursesWithContext} />
            <Route path="/coursedetail/:id" component={CourseDetailsWithContext} />
            <Route path="/createcourse" component={CreateCourseWithContext} />
            <Route path="/updateCourse" component={UpdateCourseWithContext} />
            <Route component={NotFound} />
          </Switch>
    </div>
  </Router>
);
