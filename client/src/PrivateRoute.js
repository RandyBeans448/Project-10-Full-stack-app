import React from 'react';
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Consumer } from './Context';

/* The PrivateRoute component is a high-order component
 that only makes the courses route accessible to authenticated users. */

export default ({ component: Component, ...rest }) => {
    return (
     <Consumer>
        {context => (
            <Route
             {...rest}
             render={props => context.authenticatedUser ? (
                <Component {...props} />
            ) : (
                <Redirect to='/signup'/>
            )
          }
        />
     )}
      </Consumer>
    )
}

