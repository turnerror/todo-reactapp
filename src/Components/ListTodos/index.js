import React, { Component } from 'react';
import {Todo} from '../Todo';

export class ListTodos extends Component {

    displayTodos(todos) {
        let result = [];
        if (typeof todos != 'undefined' && todos.length > 0) {
            result = todos.map(todo =>
                <Todo runOnClick={this.props.runOnClick} btnValue={this.props.btnValue} todo={todo}/>
            );
        }

        return result
    }

    render() {
        return (
            <ul className="todo-list">
                {this.displayTodos(this.props.todos)}
            </ul>
        )
    }

}
