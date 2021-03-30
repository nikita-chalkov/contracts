'use strict';
import React from "react";
export class Select extends React.Component {
    constructor(props){
        super(props);
        this.state = {value:(this.props.value?this.props.value:'')};
    }
    render() {
        this.options = this.props.options.map((item) => {
            return <option key={item.id} value={item.id}>{item.name}</option>;
        });
        return <div className='form-group pl-3'>
            <select className='form-control form-control-sm' name={this.props.name} id={this.props.id} disabled={this.props.readOnly} value={this.state.value} onChange={(value)=>{
                this.setState({value:value.target.value});
            }}>
               {this.options}
            </select>
        </div>;
    }
}
