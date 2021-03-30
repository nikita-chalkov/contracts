'use strict';
import React from 'react';
export class Row extends React.Component {
    render() {
        return <div className={
            'row'
            +(this.props.rowCols?' row-cols-'+this.props.rowCols:'')
            +(this.props.rowColsSm?' row-cols-sm-'+this.props.rowColsSm:'')
            +(this.props.rowColsMd?' row-cols-md-'+this.props.rowColsMd:'')
            +(this.props.rowColsLg?' row-cols-lg-'+this.props.rowColsLg:'')
            +(this.props.rowColsXl?' row-cols-xl-'+this.props.rowColsXl:'')
        }>{this.props.children}</div>;
    }
}