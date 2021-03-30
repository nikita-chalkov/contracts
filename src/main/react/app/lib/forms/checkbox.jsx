'use strict';
import React from "react";
export class CheckBox extends React.Component {
    render() {
        return <div className="checkbox">
            <input type={this.props.type} name={this.props.name} id={this.props.id} readOnly={this.props.readOnly} defaultValue={this.props.value}/>
            &nbsp;{this.props.placeHolder}
        </div>;
    }
}
