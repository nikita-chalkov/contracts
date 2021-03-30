'use strict';
import React from "react";
export class Textarea extends React.Component {
    render() {
        return <div className="form-group">
            <textarea className="form-control" name={this.props.name} id={this.props.id} rows={5} disabled={this.props.readOnly} style={{"marginTop": "0px", "marginBottom": "0px", "height": "123px","resize": "none"}} defaultValue={this.props.value}></textarea>
        </div>;
    }
}
