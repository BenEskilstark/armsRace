
export const rootReducer = (state, action) => {
    if (state === undefined) state = initState();

    switch (action.type) {
        case 'TURN':
            return { ...state, turn: state.turn + 1 };
        case 'DRAW': {
            const { hand, deck } = state;
            const card = deck.shift();
            return { ...state, hand: [card, ...hand], deck };
        }
        default:
            return state;
    }
};

export const initState = () => {
    return {
        turn: 0,
        deck: [
            { name: "Ace", text: "lorem ipsum", color: "steelblue" },
            { name: "Jack", text: "foo bar baz", color: "steelblue" },
            { name: "King", text: "some description", color: "steelblue" },
            { name: "Queen", text: "some much longer description", color: "steelblue" },
        ],
        hand: [],
    };
}


