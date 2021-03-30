'use strict';
import React from 'react';
export class Col extends React.Component {
    render() {
        return <div className={''
            +(this.props.cols?' col-'+this.props.cols:' col')
            +(this.props.colsSm?' col-sm-'+this.props.colsSm:'')
            +(this.props.colsMd?' col-md-'+this.props.colsMd:'')
            +(this.props.colsLg?' col-lg-'+this.props.colsLg:'')
            +(this.props.colsXl?' col-xl-'+this.props.colsXl:'')
        }>{this.props.children}</div>;
    }
}