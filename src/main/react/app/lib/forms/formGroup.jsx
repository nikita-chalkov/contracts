'use strict';
import React from "react";
export class FormGroup extends React.Component {
    render() {
        return <div className="form-group">{this.props.child}</div>;
    }
}