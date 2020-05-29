import React, { Component } from 'react';

export class Todo extends Component {

    handleChecked= (e) => {
        this.props.runOnClick(this.props.todo._id);
    }


    render() {
        return (
            <li>
                <label>{this.props.todo.task}</label>
                <input onClick={this.handleChecked} type="button" value={this.props.btnValue}/>
            </li>
        )
    }

}
