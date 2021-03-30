'use strict';
import React from 'react';
export class Table extends React.Component {
    render() {
        return <table className='table table-sm table-bordered table-hover m-0' id={this.props.tableId}
            ref={el => {
                el && el.addEventListener("selectstart", e => e.preventDefault());
            }}>
            <thead>{this.props.thead}</thead>
            <tbody>{this.props.tbody}</tbody>
            <tfoot>{this.props.tfoot}</tfoot>
        </table>;
    }
}
