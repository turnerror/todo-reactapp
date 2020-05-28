import React, { Component } from 'react';
import {ListUncompleted} from "../ListUncompleted";

export class TodoApp extends Component {
    constructor(props) {
        super(props);

        this.state = {UncompletedTasks: []};

        this.getUncompletedTodos();
    }

    async getUncompletedTodos() {
        const response = await fetch('http://localhost:3001/todos');
        const data = await response.json();
        console.log(data.data);
        this.setState({'UncompletedTodos': data.data});
    }

    render() {

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>Todos</h1>
                </header>
                <section className="main">
                    <h2>Uncompleted Todos</h2>
                        <ListUncompleted todos={this.state.UncompletedTodos} />
                    <h2>Completed Todos</h2>
                </section>
            </section>
        )
    }
}