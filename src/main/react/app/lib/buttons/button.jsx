'use strict';
import React from "react";
export class Button extends React.Component {
    render() {
        return <button type={this.props.type} className={'btn '+this.props.classAdd} id={'saveNews'+this.props.id} onClick={() => this.props.onClick()} >{this.props.children}</button>;
    }
}