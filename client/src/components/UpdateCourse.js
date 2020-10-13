import React, { Component } from 'react';
const ReactMarkdown = require('react-markdown')

export class UpdateCourse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authenticatedUser: this.state,
            courses: [],
            errors: this.state,
            courseDetails: []
          }

          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
          
    }


      componentDidMount() {
        const paramsId = this.props.match.params.id;
        const parsedId = parseInt(paramsId);
        this.props.context.data.getCoursesById(parsedId).then((respsonse => {
            if(respsonse) {
                console.log('True');
                this.setState({
                    courseDetails: respsonse.course
                })
            }
        })).catch(error => {
            console.log('Course does not exsist', error);
        })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
            this.setState({
                courseDetails: {
                    [name]: value
                }
            });
      };

    handleSubmit = (event) => {
        const course = this.state.courseDetails;
        event.preventDefault();
        this.props.context.data.updateCourse(course).then((respsonse => {
            if(respsonse.status(201)) {
                console.log(respsonse);
            } else {
                throw new Error
            }
        })).catch(error => {
            console.log('Course was not updated', error);
        })
      };


    render () {

        const display = this.state.courseDetails;
        console.log(display);
        const authedUser = this.props.context.authenticatedUser;
        console.log(authedUser);

        return (
            <div className="updateDiv">
                <form onSubmit={this.handleSubmit}>
                    <div className="updateDivLeft">
                        <div>
                          <h3>Course title</h3>
                            <div >
                                <input id="title" name="title" type="text" onChange={this.handleChange} defaultValue={display.title}></input>
                            </div>
                                <p>By {authedUser.firstName} {authedUser.lastName}</p>
                        </div>
                            <div>
                                <div>
                                   <textarea id="description" name="description" className="updateDivRight" onChange={this.handleChange} defaultValue={display.description}></textarea>
                                </div>
                            </div>
                    </div>
                    <div>
                        <div className="updateDivRight">
                            <ul>
                                <li>
                                <h4>Estimated Time</h4>
                                    <div>
                                        <input id="estimatedTime" name="estimatedTime" type="text" onChange={this.handleChange} defaultValue={display.estimatedTime}></input>
                                    </div>
                                </li>
                                <li>
                                <h4>Materials Needed</h4>
                                    <div>
                                        <textarea id="materialsNeeded" name="materialsNeeded" onChange={this.handleChange} defaultValue={display.materialsNeeded}></textarea>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div >
                        <button onClick={this.handleSubmit}  className="button" type="submit">Update Course</button>
                        <button >Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
};

export default UpdateCourse;
