export const cardReducer = (state, action) => {
    switch (action.type) {
        case 'MAKE_CITY': {
            return { ...state, cities: state.cities + 1 }
        }
        case 'SET_CARD': {
            const { id } = action;
            let card = hand.filter(c => c.id == id)[0];
            for (let prop in action) {
                if (prop == "type") continue;
                card[prop] = action[prop];
            }
            return state;
        }
    }
    return state;
}