import React, { Component } from 'react';

export class Todo extends Component {


    render() {
        return (
            <li>
                <label>{this.props.todo.task}</label>
                <input type="checkbox" value={this.props.todo._id} name={this.props.todoStatus}/>
            </li>
        )
    }

}