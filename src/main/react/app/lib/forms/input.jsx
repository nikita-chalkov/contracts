'use strict';
import React from "react";

export class Input extends React.Component {
    render() {
        return <div className='form-group'>
            <div className='input-group'>
                <span className='mr-3'>{this.props.placeHolder}</span>
                <input type={this.props.type} name={this.props.name} className='form-control form-control-sm' id={this.props.id} maxLength={this.props.maxLength?this.props.maxLength:''} readOnly={this.props.readOnly} defaultValue={this.props.value} autoComplete={'off'}/>
                <div className="invalid-feedback"></div>
            </div>
        </div>;
    }
}
