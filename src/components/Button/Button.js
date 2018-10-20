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
        if (currentBackground == 'rgb(236,249,249)' || currentBackground == 'rgb()') {
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
                <div style={buttonStyle} onClick={() => {this.props.chooseColor(this.props.host, this.props.place, this.props.image_size)}}></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    host: state.host,
    image_size: state.image_size
})

const mapDispatchToProps = dispatch => ({
    chooseColor: (host, choice, image_size) => dispatch(chooseColor(host, choice, image_size))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Button)