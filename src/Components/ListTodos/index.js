import React, { Component } from 'react';
import{TodoCompleteButton} from "../TodoCompleteButton";
import{TodoLabel} from "../TodoLabel";

export class ListTodos extends Component {

    displayTodos(todos) {
        let result = [];
        if (typeof todos != 'undefined' && todos.length > 0) {
            result = todos.map(todo =>
                <li>
                    <TodoLabel task={todo.task}/>
                    <TodoCompleteButton runOnClick={this.props.runOnClick} btnValue={this.props.btnValue} id={todo._id}/>
                </li>
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
