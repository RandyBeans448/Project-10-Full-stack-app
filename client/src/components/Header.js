import React from 'react';
import { Link } from 'react-router-dom';

export default ({ context }) => {
      const authedUser = context.authenticatedUser;
        return (
          <div>
            <div className="header-div">
              <div>
              <Link to="/" className="header-div-left"> Student Courses </Link>
              </div>
              <nav>
                {authedUser ? (
                  <React.Fragment>
                      <div className="header-div-right">
                      <span className="header-div-right"> Welcome {authedUser.firstName} {authedUser.lastName}  </span>
                        <Link className="header-div-right"  to="/signout"> Sign Out </Link>
                      </div>
                </React.Fragment>                
                ) : (    
                <React.Fragment>
                  <div className="header-div-right-up-in">
                  <Link className="header-div-right" to="/signup">Sign Up</Link>
                  <Link className="header-div-right" to="/signin">Sign In</Link>
                  </div>
                </React.Fragment>
                )}
            </nav>
          </div>
         </div> 
        )
    }

