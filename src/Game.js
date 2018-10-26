import React, { Component } from 'react'
import { connect } from 'react-redux'
import Image from './components/Image/Image'
import Button from './components/Button/Button'
import Display from './components/Display/Display'

import { doInitialFetch } from './actions/index'

import './Game.css'

class Game extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.doInitialFetch('new', this.props.host, 10, this.props.titles)
    }

    render() {
        let instructions 
        if(this.props.choices.length === 0) {
            if (this.props.titles.length === 1) {
                instructions = 
                    <div className="display-4 instructions"><h4>Pick colors in the right order to win!</h4></div>
                    // <div className="display-4 instructions"><h4>Which color was used the most?</h4></div>
            }
        }
        else {
            instructions = <div></div>
        }
        return (
            <div className="Game">
                <div className="container">
                    <div className="row">
                        <div className="col">                            
                        </div>
                         <div className="col-auto">
                            <Image />
                            {/* {instructions} */}
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
    host : state.host, 
    titles : state.titles,
    choices: state.choices
})

const mapDispatchToProps = dispatch => ({
    doInitialFetch: (load_type, host, num_colors, titles) => dispatch(doInitialFetch(load_type, host, num_colors, titles))
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(Game)