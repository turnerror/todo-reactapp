import React, { Component } from 'react';
import {Todo} from '../Todo';

export class ListTodos extends Component {


    constructor(props) {
        super(props);
        this.state = {todos: []};
        this.state = {todoStatus: ""};
    }

    componentWillReceiveProps(props) {
        console.log(props.todos);
        this.setState({ 'todos': props.todos, 'todoStatus': props.todoStatus});
    }

    render() {
        return (
            <ul className="todo-list">
                {this.displayTodos(this.state.todos)}
            </ul>
        )
    }

    displayTodos(todos) {
        let result = [];
        if (typeof todos != 'undefined' && todos.length > 0) {
            result = todos.map(todo =>
                <Todo todo={todo} todoStatus={this.state.todoStatus}/>
            );
        }

        return result
    }

}