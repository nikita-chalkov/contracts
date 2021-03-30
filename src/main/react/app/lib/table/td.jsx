'use strict';
import React from 'react';
export class Td extends React.Component {
    render() {
        return <td id={this.props.tdId}>
            {this.props.children}
        </td>;
    }
}