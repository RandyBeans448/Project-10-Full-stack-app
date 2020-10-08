import React, { Component } from 'react';

export class CreateCourse extends Component {

    constructor() {
        super();
      }
      
    render () {
        return (
    <div>
        <div>
        <h1> Create course </h1>
            <div>
                <form>
                <input id="title" name="title" type="text" placeholder="Course title" value=""></input>
                <p>User Name</p>
                    <div>
                        <div>
                        <textarea id="description" name="description" placeholder="Course description"></textarea>
                        </div>
                    </div>
                        <div class="grid-25 grid-right">
                            <div>
                                <ul>
                                    <li>
                                    <h4>Estimated Time</h4>
                                        <div>
                                        <input id="estimatedTime" name="estimatedTime" type="text" placeholder="Hours" value=""></input>
                                        </div>
                                    </li>
                                    <li class="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                        <div>
                                        <textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials"></textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    <div>
                        <button type="submit">Create Course</button>
                        <button>Cancel</button>
                    </div>
                </form>   
            </div>
        </div>
    </div>
        )
    }
}

export default CreateCourse;