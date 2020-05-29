import React, {Component} from "react";

export class TodoCompleteButton extends Component {

    handleClick = () => {
        this.props.runOnClick(this.props.id);
    };

    render() {
        return (
            <input onClick={this.handleClick} type="button" value={this.props.btnValue}/>
        )
    };
}
