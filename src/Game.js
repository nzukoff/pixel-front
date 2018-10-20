import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import Image from './components/Image/Image'
import Button from './components/Button/Button'
import Display from './components/Display/Display'

import { doInitialFetch } from './actions/index'

class Game extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.doInitialFetch('new', this.props.host, 15)
    }

    render() {
        return (
            <div className="Game">
                <div className="container">
                    <div className="row">
                        <div className="col">
                        </div>
                         <div className="col-auto">
                            <Image />
                            {
                                this.props.button_styles.map((button_style, i) => {
                                    return <Button key={i} place={i} buttonStyle={button_style}/>
                                })
                            }
                        </div>
                        <div className="col">
                            <Display />
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    button_styles : state.button_styles,
    host : state.host
})

const mapDispatchToProps = dispatch => ({
    doInitialFetch: (load_type, host, num_colors) => dispatch(doInitialFetch(load_type, host, num_colors))
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(Game)