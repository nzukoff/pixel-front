const initialState = {
    color_options: [],
    image_size: [], 
    button_styles: [],
    score: 0, 
    percentage: 0,
    chosen_place: 0,
    button_styles: [],
    percentage: 0, 
    choices: [],
    titles: [],
    choice_color: {},
    // host: 'http://127.0.0.1:5000/'
    host: 'https://pixel-game-api.herokuapp.com/'
}
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'DO_INITIAL_FETCH_SUCCESS':
        return({
          ...state,
          image_size: action.image_size,
          png_data: action.png_data,
          titles: action.titles,
          button_styles: [],
          score: 0,
          percentage: 0,
          chosen_place: 0, 
          choices: [],
          color_options: [], 
          labels: [],
          choice_color: {}
        })
      
      case 'GET_COLOR_OPTIONS_SUCCESS':
        return({
          ...state,
          color_options: action.color_options, 
          labels: action.labels,
          title: action.title
        })

      case 'SET_BUTTON_STYLES':
        return({
          ...state,
          button_styles: action.button_styles,
          choice_color: action.choice_color,
          color_options: action.color_options
        })   
        
      case 'CHOOSE_COLOR_SUCCESS':
        return({
          ...state,
          png_data: action.png_data,
          color_options: action.color_options, 
          chosen_place: action.chosen_place,
          choices: action.choices,
          percentage: state.percentage + action.percentage, 
          score: state.score + action.score
        })

      default:
        return (state)
    }
  }
  
  export default rootReducer
  