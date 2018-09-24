
import React, { Component } from 'react';
import './LoadingIndicator.css';

class LoadingIndicator extends Component {
    render() {
        return (
            <div className="loading-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        );
    }
}
export default LoadingIndicator;