import React, { Component } from 'react';
import{TodoButton} from "../TodoButton";
import{TodoLabel} from "../TodoLabel";
import Accordion from "../Accordion";

export class ListTodos extends Component {

    displayTodos(todos) {
        let result = [];
        if (typeof todos != 'undefined' && todos.length > 0) {
            result = todos.map((todo, i) =>
                <li id={todo._id} key={i} data-id={todo._id} data-key={i}>
                    <TodoLabel task={todo.task}/>
                    <TodoButton runOnClick={this.props.runOnBtnClick1} btnValue={this.props.btn1Value}/>
                    {this.props.btn2Value && <TodoButton runOnClick={this.props.runOnBtnClick2} btnValue={this.props.btn2Value}/>}
                    {this.props.accordian && <Accordion defaultValue={todo.task} label="Task"/>}
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
