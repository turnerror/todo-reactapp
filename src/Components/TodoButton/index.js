import React, {Component} from "react";

export class TodoButton extends Component {

    handleChecked = (e) => {
        this.props.runOnClick(this.props.id);
    };

    render() {
        return (
            <input onClick={this.handleChecked} type="button" value={this.props.btnValue}/>
        )
    };
}
