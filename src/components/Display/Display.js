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
        if (this.props.chosenPlace === 1) {
            end = 'st'
        } else if (this.props.chosenPlace === 2) {
            end = 'nd'
        } else if (this.props.chosenPlace === 3) {
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
                                <button type="button" className="btn btn-secondary btn-block" onClick={() => {this.props.doInitialFetch('next', this.props.host, 5, this.props.titles)}}>Easy</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-secondary btn-block" onClick={() => {this.props.doInitialFetch('next', this.props.host, 10, this.props.titles)}}>Medium</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-secondary btn-block" onClick={() => {this.props.doInitialFetch('next', this.props.host, 15, this.props.titles)}}>Hard</button>
                            </div>                       
                        </div>
                        <div className="row">
                            <div className="col">
                                {/* <h1 className="score display-4">{`Score: ${this.props.score}`}</h1> */}
                                <ScoreBar />  
                                <br />
                                <div style={this.props.choice_color} ></div>
                                {
                                    this.props.chosenPlace ? <div><h3 className="score">{`was the ${this.props.chosenPlace}${end} most common`}</h3></div> : <div></div>
                                    // this.props.chosenPlace ? <div><h3 className="score">{`was ${this.props.chosenPlace}${end} place`}</h3></div> : <div></div>
                                }       
                                {
                                    this.props.percentage === 100 ? <img className="win" src="https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif"></img>: <div></div>
                                }                                               
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
    score: state.score,
    titles: state.titles,
    buttonStyles: state.button_styles,
    choice_color: state.choice_color,
    percentage: state.percentage
})

const mapDispatchToProps = dispatch => ({
    doInitialFetch: (load_type, host, num_colors, titles) => dispatch(doInitialFetch(load_type, host, num_colors, titles))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Display)