import React, { Component } from 'react';

export class AddTodo extends Component {

    state = {
        value: ''
    };

    handleChange= (e) => {
        this.setState({value: e.target.value});
    };

    handleClick= () => {
        this.props.createTodo(this.state.value);
    };

    render() {
        return (
                <div>
                    <label>Task</label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <button onClick={this.handleClick}>Create!</button>
                </div>
        )
    };
}
