import React, { Component } from 'react';
import {ListTodos} from "../ListTodos";
import {AddTodo} from "../AddTodo";
import "./style.css";


export class TodoApp extends Component {
    serverErrorMsg = "Something went wrong, Please try again";

    constructor(props) {
        super(props);

        this.state = {'uncompletedTodos': [], 'completedTodos': []};

        this.getUncompletedTodos();
        this.getCompletedTodos();
    }

    getUncompletedTodos = async () => {
        const response = await fetch('http://localhost:3001/todos');
        const data = await response.json();
        if (data.success) {
            this.setState({'uncompletedTodos': data.data});
        } else {
            this.setState({'serverError': this.serverErrorMsg})
        }
    };

    getCompletedTodos = async () => {
        const response = await fetch('http://localhost:3001/todos?completed=1');
        const data = await response.json();
        if (data.success) {
            this.setState({'completedTodos': data.data});
        } else {
            this.setState({'serverError': this.serverErrorMsg})
        }
    };

    getTodoById = async (id) => {
        const response = await fetch(`http://localhost:3001/todo/${id}`);
        const data = await response.json();

        if (data.success){
            return data.data;
        }
    };

    createTodo = async (value) => {
        if (value.length < 1) {
            this.setState({inputError: 'Task must be at least 1 character long'});
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
        } else {
            this.setState({'serverError': this.serverErrorMsg})
        }
    };

    editTodo = async (todo, key) => {
        const result = await fetch(`http://localhost:3001/todo/${todo._id}`, {
            method: 'PUT',
            body: JSON.stringify({todo: todo}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await result.json();
        if (data.success) {
            let uncompleted = this.state.uncompletedTodos;
            uncompleted[key].task = todo.task;
            this.setState({'uncompletedTasks': uncompleted});
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
        }  else {
            this.setState({'serverError': this.serverErrorMsg})
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

            completed.forEach((todo, i) => {
                if(todo._id === id) {
                    completed.splice(i, 1);
                    return;
                }
            });
            this.setState({'completedTasks': completed});
        }  else {
            this.setState({'serverError': this.serverErrorMsg})
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
                    {this.state.inputError}
                    {this.state.serverError}
                    <h3>Uncompleted Todos</h3>
                        <ListTodos runOnBtnClick1={this.markCompleteOnClick} runOnBtnClick2={this.editOnClick} accordian="true" todos={this.state.uncompletedTodos} btn1Value="Mark Done"  btn2Value="Edit"/>
                    <h3>Completed Todos</h3>
                        <ListTodos runOnBtnClick1={this.deleteOnClick} todos={this.state.completedTodos} btn1Value="Delete"/>
                </section>
            </section>
        )
    }

    markCompleteOnClick= (e) => {
        this.completeTodo(e.target.parentElement.dataset.id);
    };


    deleteOnClick= (e) => {
        this.deleteTodo(e.target.parentElement.dataset.id);
    };

    editOnClick = async (e) => {
        const accordion = e.target.nextSibling;
        const id = e.target.parentElement.dataset.id;
        const key = e.target.parentElement.dataset.key;

        if (e.target.value === 'Edit') {
            e.target.value = 'Save';
            accordion.classList.remove('hidden');

        } else {
            e.target.value = 'Edit';
            const todo = {_id: id, task: accordion.lastChild.value};
            await this.editTodo(todo, key);
            accordion.classList.add('hidden');
        }

    };


}
