'use strict';
import React from 'react';
export class Container extends React.Component {
    render() {
        return <div className={'container '+(this.props.addClass?this.props.addClass:'')} id={this.props.id}>{this.props.children}</div>;
    }
}