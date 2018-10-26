import React, { Component } from 'react'
import { connect } from 'react-redux'

import { chooseColor } from '../../actions/index'

class Button extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let buttonStyle
        let currentBackground = this.props.buttonStyle.backgroundColor
        if (currentBackground === 'rgb(236,249,249)' || currentBackground === 'rgb()') {
            buttonStyle = {
                ...this.props.buttonStyle,
                border: 'none',
                margin: '2px',
            }
        }
        else {
            buttonStyle = this.props.buttonStyle
        }
        return (
            <div className="Button">
                <div style={buttonStyle} onClick={() => {this.props.chooseColor(this.props.host, this.props.place, this.props.choices, this.props.image_size, this.props.labels, this.props.title, this.props.color_options)}}></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    host: state.host,
    image_size: state.image_size, 
    labels: state.labels,
    title: state.title, 
    color_options: state.color_options, 
    choices: state.choices
})

const mapDispatchToProps = dispatch => ({
    chooseColor: (host, choice, choices, image_size, labels, title, color_options) => dispatch(chooseColor(host, choice, choices, image_size, labels, title, color_options))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Button)