export const cardReducer = (state, action) => {
    switch (action.type) {
        case 'MAKE_CITY': {
            return { ...state, cities: state.cities + 1 }
        }
    }
    return state;
}