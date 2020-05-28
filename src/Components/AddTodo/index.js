import React, { Component } from 'react';

export class AddTodo extends Component {

    render() {
        return (
            <form onSubmit={this.props.createTodo} className="add-todo">
                <div className="form-group">
                    <label>Task</label>
                    <input name="todoName" type="text" className="form-control name"/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-success" value="Create!"/>
                </div>
            </form>

        )
    }
}
