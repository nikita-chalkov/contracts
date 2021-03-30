'use strict';
import React from 'react';
export class Th extends React.Component {
    render() {
        return <th id={this.props.thId}>
            {this.props.children}
        </th>;
    }
}