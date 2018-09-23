
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Transition from 'react-addons-css-transition-group';

export default class TransitionPortal extends Component {
    elem;

    componentDidMount() {
        this.elem = document.createElement('div');
        document.body.appendChild(this.elem);
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        ReactDOM.render(<Transition {...this.props}>{this.props.children}</Transition>, this.elem);
    }

    componentWillUnmount() {
        document.body.removeChild(this.elem);
    }

    render() {
        return null;
    }
}
