import React, { Component } from 'react'
import { connect } from 'react-redux'

import ScoreBar from '../ScoreBar/ScoreBar'
import './Display.css'

import { doInitialFetch } from '../../actions/index'

class Display extends Component {
    constructor(props) {
        super(props)
    }

    findEnding = () => {
        let end = ''
        if (this.props.chosenPlace == 1) {
            end = 'st'
        } else if (this.props.chosenPlace == 2) {
            end = 'nd'
        } else if (this.props.chosenPlace == 3) {
            end = 'rd'
        } else {
            end = 'th'
        }
        return end
    }

    render() {
        let end = this.findEnding()

        return (
            <div className="Display">
                <div className="score_board">
                    <div className="container">
                        <div className="row">                            
                            <div className="col">
                                <button type="button" className="btn btn-secondary" onClick={() => {this.props.doInitialFetch('next', this.props.host, 5)}}>Easy</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-secondary" onClick={() => {this.props.doInitialFetch('next', this.props.host, 10)}}>Medium</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-secondary" onClick={() => {this.props.doInitialFetch('next', this.props.host, 15)}}>Hard</button>
                            </div>                       
                        </div>
                        <div className="row">
                            <div className="col">
                                <h1 className="score display-4">{`Score: ${this.props.score}`}</h1>
                                {
                                    this.props.chosenPlace ? <h3 className="score">{`Your guess was ${this.props.chosenPlace}${end} place`}</h3> : <div></div>
                                }
                                <ScoreBar />                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    host: state.host, 
    chosenPlace: state.chosen_place, 
    score: state.score
})

const mapDispatchToProps = dispatch => ({
    doInitialFetch: (load_type, host, num_colors) => dispatch(doInitialFetch(load_type, host, num_colors))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Display)