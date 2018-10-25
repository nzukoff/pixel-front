import axios from 'axios'

export const doInitialFetch = (load_type, host, num_colors) => {
    return async (dispatch) => {
        const url = `${host}load/${load_type}`
        const response = await axios.get(url)
        const image_size = response.data.image_size
        const png_data = response.data.png_data
        const title = response.data.title
        dispatch(doInitialFetchSuccess(image_size, png_data))
        dispatch(getColorOptions(host, num_colors, image_size, title))
    }
}
    
export const doInitialFetchSuccess = (image_size, png_data) => ({
    type: 'DO_INITIAL_FETCH_SUCCESS',
    image_size, 
    png_data
})

export const getColorOptions = (host, num_colors, image_size, title) => {
    return async (dispatch) => {
        const url = `${host}options/${num_colors}?title=${title}`
        const response = await axios.get(url)
        const color_options = response.data.color_options
        const labels = response.data.labels
        dispatch(getColorOptionsSuccess(color_options, labels, title))
        dispatch(setButtonStyles(null, image_size, color_options))
    }
}

export const getColorOptionsSuccess = (color_options, labels, title) => ({
    type: 'GET_COLOR_OPTIONS_SUCCESS',
    color_options, 
    labels,
    title
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

export const chooseColor = (host, choice, choices, image_size, labels, title, colors) => {
    return async (dispatch) => {
        const url = `${host}choose/${choice}?title=${title}`
        const response = await axios.post(url, { labels, colors, choices })
        const png_data = response.data.png_data
        const color_options = response.data.color_options
        const chosen_place = response.data.chosen_place
        choices = response.data.choices
        dispatch(chooseColorSuccess(png_data, color_options, chosen_place, choices))
        dispatch(setButtonStyles(choice, image_size, color_options))
    }
}

export const chooseColorSuccess = (png_data, color_options, chosen_place, choices) => {
    let percentage = 0
    let score = 0
    if (chosen_place == 1) {
        percentage  = (100/color_options.length)
        score = 10
    }
    return ({
        type: 'CHOOSE_COLOR_SUCCESS', 
        png_data, 
        color_options, 
        chosen_place, 
        choices,
        percentage, 
        score
    })
}
