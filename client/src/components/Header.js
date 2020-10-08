import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
      const { context } = this.props; 
      const authedUser = context.authenticatedUser;
        return (
          <div className="headerGrid">
            <div className="headerDiv">
              <Link className="titleLink" to="/"> Student Courses </Link>
              <nav>
                {authedUser ? (
                  <React.Fragment>
                      <div className="headerSignInOut">
                      <span className="headerSpan"> Welcome  </span>
                        <Link  to="/signout"> Sign Out </Link>
                      </div>
                </React.Fragment>                
                ) : (    
                <React.Fragment>
                  <div className="headerSignInOut">
                  <Link to="/signup">Sign Up</Link>
                  <Link to="/signin">Sign In</Link>
                  </div>
                </React.Fragment>
                )}
           
            </nav>
          </div>
         </div> 
        )
    }
}

