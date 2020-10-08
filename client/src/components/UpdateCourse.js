import React, { Component } from 'react';

export class UpdateCourse extends Component {

    state = {
        authenticatedUser: this.state,
        courses: [],
        errors: this.state,
      }

    render () {
        const { context } = this.props
        console.log(this.props.context.courses)
        return (
<div className="updateDiv">
<form>
<div className="updateDivLeft">
<div>
<h3>Course title</h3>
<div >
<input id="title" name="title" type="text" placeholder="Course title..." value="Build a Basic Bookcase"></input>
</div>
<p>By Joe Smith</p>
</div>
<div>
<div>
<textarea id="description" name="description" class="updateDivRight" placeholder="Course description..."></textarea>
</div>
</div>
</div>
<div>
<div className="updateDivRight">
<ul>
<li>
<h4>Estimated Time</h4>
<div>
<input id="estimatedTime" name="estimatedTime" type="text" placeholder="Hours" value="14 hours"></input>
</div>
</li>
<li>
<h4>Materials Needed</h4>
<div>
<textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..."></textarea>
</div>
</li>
</ul>
</div>
</div>
<div >
<button class="button" type="submit">Update Course</button>
<button class="button button-secondary">Cancel</button>
</div>
</form>
</div>
        )
    }
}

export default UpdateCourse;