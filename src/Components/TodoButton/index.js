import React, {Component} from "react";

export class TodoButton extends Component {

    render() {
        return (
            <input onClick={this.props.runOnClick} type="button" value={this.props.btnValue}/>
        )
    };
}
