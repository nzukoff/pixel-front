const initialState = {
    color_options: [],
    pixels: [],
    image_size: [], 
    button_styles: [],
    score: 0, 
    percentage: 0,
    chosen_place: 0,
    button_styles: [],
    percentage: 0, 
    // host: 'http://127.0.0.1:5000/'
    host: 'https://pixel-game-api.herokuapp.com/'
}
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'DO_INITIAL_FETCH_SUCCESS':
        return({
          ...state,
          pixels: action.pixels,
          image_size: action.image_size,
          button_styles: [],
          score: 0,
          percentage: 0,
          chosen_place: 0
        })
      
      case 'GET_COLOR_OPTIONS_SUCCESS':
        return({
          ...state,
          color_options: action.color_options
        })

      case 'SET_BUTTON_STYLES':
        return({
          ...state,
          button_styles: action.button_styles
        })   
        
      case 'CHOOSE_COLOR_SUCCESS':
        console.log("ACTION IS ", action)
        return({
          ...state,
          pixels: action.pixels,
          color_options: action.color_options, 
          chosen_place: action.chosen_place, 
          percentage: state.percentage + action.percentage, 
          score: state.score + action.score
        })

      default:
        return (state)
    }
  }
  
  export default rootReducer
  