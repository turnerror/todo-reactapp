import React, { Component } from 'react';
import {Todo} from '../Todo';

export class ListUncompleted extends Component {


    constructor(props) {
        super(props);
        this.state = {todos: []}
    }

    componentWillReceiveProps(props) {
        this.setState({ todos: props.todos });
        console.log(props.todos);
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
        result = todos.map(todo =>
            <Todo todo={todo} />
        );

        return result
    }

}