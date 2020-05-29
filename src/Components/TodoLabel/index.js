import React, { Component } from 'react';

export class TodoLabel extends Component {

    render() {
        return (
            <label>{this.props.task}</label>
        )
    }

}