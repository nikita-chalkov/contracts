'use strict';
import React from "react";
export class Form extends React.Component {
    render() {
        return <form className="formCreate" name={this.props.name} action={this.props.action} method={this.props.method}>{this.props.children}</form>;
    }
}