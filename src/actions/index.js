import axios from 'axios'

export const doInitialFetch = (load_type, host, num_colors) => {
    return async (dispatch) => {
        const url = `${host}load/${load_type}/`
        const response = await axios.get(url)
        const pixels = response.data.pixel_values
        const image_size = response.data.image_size
        dispatch(doInitialFetchSuccess(pixels, image_size))
        dispatch(getColorOptions(host, num_colors, image_size))
    }
}
    
export const doInitialFetchSuccess = (pixels, image_size) => ({
    type: 'DO_INITIAL_FETCH_SUCCESS', 
    pixels, 
    image_size
})

export const getColorOptions = (host, num_colors, image_size) => {
    return async (dispatch) => {
        const url = `${host}options/${num_colors}/`
        const response = await axios.get(url)
        const color_options = response.data.color_options
        dispatch(getColorOptionsSuccess(color_options))
        dispatch(setButtonStyles(null, image_size, color_options))
    }
}

export const getColorOptionsSuccess = (color_options) => ({
    type: 'GET_COLOR_OPTIONS_SUCCESS',
    color_options
})

export const setButtonStyles = (choice, image_size, color_options) => {
    let button_dim = (image_size[0]/5)/2-2
    let button_styles = color_options.map((color, index) => {
        if (index == choice) {
            color = [236, 249, 249]
        }
        return {
            backgroundColor: `rgb(${color})`, 
            padding: `${button_dim}px ${button_dim}px`,
            border: '1px solid rgb(205,208,210)',
            borderRadius: '10px',
            margin: '1px',
            display: 'inline',
            float:'left'
        }
    })
    return ({
        type: 'SET_BUTTON_STYLES',
        button_styles
    })
}

export const chooseColor = (host, choice, image_size) => {
    return async (dispatch) => {
        const url = `${host}choose/${choice}/`
        const response = await axios.get(url)
        const pixels = response.data.pixel_values
        const color_options = response.data.color_options
        const chosen_place = response.data.chosen_place
        dispatch(chooseColorSuccess(pixels, color_options, chosen_place))
        dispatch(setButtonStyles(choice, image_size, color_options))
    }
}

export const chooseColorSuccess = (pixels, color_options, chosen_place) => {
    let percentage = 0
    let score = 0
    if (chosen_place == 1) {
        percentage  = (100/color_options.length)
        score = 10
    }
    return ({
        type: 'CHOOSE_COLOR_SUCCESS', 
        pixels, 
        color_options, 
        chosen_place, 
        percentage, 
        score
    })
}
