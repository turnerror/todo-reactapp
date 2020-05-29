import React, { Component } from 'react';
import {ListTodos} from "../ListTodos";
import {AddTodo} from "../AddTodo";

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

    createTodo = async (e) => {
        e.preventDefault();

        const value = e.target.todoName.value;
        if (value.length < 1) {
            this.setState({error: 'Task must be at least 1 character long'});
            return;
        }
        const result = await fetch('http://localhost:3001/todos', {
            method: 'POST',
            body: JSON.stringify({task: value}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await result.json();
        if (data.success){
            let uncompleted = this.state.uncompletedTodos;
            uncompleted.push(data.data);
            this.setState({'uncompletedTasks': uncompleted});
            this.setState({error: ''});
        }
    };

    completeTodo = async (id) => {
        const result = await fetch(`http://localhost:3001/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await result.json();
        if (data.success){
            let uncompleted = this.state.uncompletedTodos;
            let completed = this.state.completedTodos;

            uncompleted.forEach((todo, i) => {
                if(todo._id === id) {
                    uncompleted.splice(i, 1);
                    completed.push(todo);
                    return;
                }
            });

            this.setState({'completedTasks': completed});
            this.setState({'uncompletedTasks': uncompleted});
        }
    };

    deleteTodo = async (id) => {
        const result = await fetch(`http://localhost:3001/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await result.json();
        if (data.success){
            let completed = this.state.completedTodos;
            let i = 0;
            completed.forEach(todo => {
                if(todo._id === id) {
                    completed.splice(i, 1);
                    return;
                }
                i++;
            });
            this.setState({'completedTasks': completed});
        }
    };

    render() {

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>Todos</h1>
                </header>
                <section className="main">
                    <h3>Added a Todo!</h3>
                        <AddTodo createTodo={this.createTodo}/>
                    {this.state.error}
                    <h3>Uncompleted Todos</h3>
                        <ListTodos runOnClick={this.completeTodo} todos={this.state.uncompletedTodos} btnValue="Mark Done"/>
                    <h3>Completed Todos</h3>
                        <ListTodos runOnClick={this.deleteTodo} todos={this.state.completedTodos} btnValue="Delete"/>
                </section>
            </section>
        )
    }
}
