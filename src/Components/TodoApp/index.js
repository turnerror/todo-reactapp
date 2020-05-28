import React, { Component } from 'react';
import {ListTodos} from "../ListTodos";

export class TodoApp extends Component {
    constructor(props) {
        super(props);

        this.state = {'uncompletedTodos': [], 'completedTodos': []};

        this.getUncompletedTodos();
        this.getCompletedTodos();
    }

    getUncompletedTodos = async () => {
        const response = await fetch('http://localhost:3001/todos');
        const data = await response.json();
        this.setState({'uncompletedTodos': data.data});
    };

    getCompletedTodos = async () => {
        const response = await fetch('http://localhost:3001/todos?completed=1');
        const data = await response.json();
        this.setState({'completedTodos': data.data});
    };

    render() {
        console.log(this.state.uncompletedTodos);

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>Todos</h1>
                </header>
                <section className="main">
                    <h3>Added a Todo!</h3>
                    <h3>Uncompleted Todos</h3>
                        <ListTodos todos={this.state.uncompletedTodos} todoStatus="uncompleted"/>
                    <h3>Completed Todos</h3>
                        <ListTodos todos={this.state.completedTodos} todoStatus="completed"/>
                </section>
            </section>
        )
    }
}