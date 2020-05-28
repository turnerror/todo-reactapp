import React, { Component } from 'react';

export class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = {id: ''};
    }

    componentWillReceiveProps(props) {
        this.setState({ 'id': this.props.todo._id});
    }

    handleChecked= (e) => {
        this.props.runOnClick(this.state.id);
    }


    render() {
        return (
            <li>
                <label>{this.props.todo.task}</label>
                <input onClick={this.handleChecked} type="button" value={this.props.btnValue}/>
            </li>
        )
    }

}
