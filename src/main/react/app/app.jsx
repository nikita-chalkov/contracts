import React from "react";
import ReactDom from "react-dom";

class App extends React.Component {
    render() {
        return <div>Init</div>;
    }
}
ReactDom.render(<App/>, document.getElementById('reactId1'));
