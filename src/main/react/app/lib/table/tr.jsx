'use strict';
import React from 'react';
export class Tr extends React.Component {
    render() {
        return <tr id={this.props.trId} onClick={()=>this.props.onClick(this.key)} onDoubleClick={()=>this.props.onDoubleClick(this.key)}>
            {this.props.children}
        </tr>;
    }
}