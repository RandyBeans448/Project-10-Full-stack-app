import React, { Component } from 'react';
const ReactMarkdown = require('react-markdown')

export class UpdateCourse extends Component {
    
    state = {
        authenticatedUser: this.state,
        courses: [],
        errors: this.state,
        courseDetails: []
      }

      componentDidMount() {
        const paramsId = this.props.match.params.id;
        const parsedId = parseInt(paramsId);
        this.props.context.data.getCoursesById(1).then((respsonse => {
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

        function handleSubmit(event) {
            //take the value of each input and textarea and then call updateUsers
            let defaultValue = this.query.value;
            event.preventDefault();
            this.props.context.actions.updateUsers()
            console.log("working")
          }

        return (
            <div className="updateDiv">
                <form>
                    <div className="updateDivLeft">
                        <div>
                        <h3>Course title</h3>
                            <div >
                                <input id="title" name="title" type="text" defaultValue={display.title}></input>
                            </div>
                                <p>By Joe Smith</p>
                        </div>
                            <div>
                                <div>
                                   {/* <textarea id="description" name="description" className="updateDivRight" defaultValue={display.description}></textarea>*/}
                                </div>
                            </div>
                    </div>
                    <div>
                        <div className="updateDivRight">
                            <ul>
                                <li>
                                <h4>Estimated Time</h4>
                                    <div>
                                        {/*<input id="estimatedTime" name="estimatedTime" type="text" defaultValue={display.estimatedTime}></input>*/}
                                    </div>
                                </li>
                                <li>
                                <h4>Materials Needed</h4>
                                    <div>
                                        {/*<textarea id="materialsNeeded" name="materialsNeeded" defaultValue={display.materialsNeeded}></textarea>*/}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div >
                        <button onClick={handleSubmit} className="button" type="submit">Update Course</button>
                        <button className="button button-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UpdateCourse;
