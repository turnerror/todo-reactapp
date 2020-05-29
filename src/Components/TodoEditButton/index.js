import React, {Component} from "react";

export class TodoEditButton extends Component {

    state = {
        name: 'Edit',
        todo: [],
        isHidden: true
    };

    handleClick = async (e) => {
        this.setState({isHidden: !this.state.isHidden});

        if (this.state.name === 'Edit') {
            this.setState({name: 'Save'});
            const todo = await this.props.getTodoById(this.props.id);
            this.setState({todo: todo});
        } else {
            this.setState({name: 'Edit'});
            await this.props.editTodo(this.state.todo, this.props.index);
        }

    };

     accordion = () => (
        <div>
            <label>Task</label>
            <input type="text" value={this.state.todo.task} onChange={this.handleChange}/>
        </div>
    );


    handleChange= async (e) => {
        let todo = this.state.todo;
        todo.task = e.target.value;
        this.setState({todo: todo});
    };

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>{this.state.name}</button>
                {!this.state.isHidden && this.accordion()}
            </div>
        )
    };
}