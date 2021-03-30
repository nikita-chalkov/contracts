'use strict';
import React from 'react';
export class BtnGroup extends React.Component {
    render() {
        return <div className={'btn-group '+this.props.classAdd}>
            {this.props.children}
        </div>;
    }
}