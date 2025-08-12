
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
        case 'SELECT': {
            const { id } = action;
            const { hand, deck } = state;
            if (id == null) return { ...state, card: null };
            const card = hand.filter(c => c.id == id)[0];
            return { ...state, card };
        }
        case 'PLAY': {
            const { id } = action;
            let { hand, deck } = state;
            hand = hand.filter(c => c.id != id);

            const card = hand.filter(c => c.id == id)[0];



            return { ...state, hand };
        }
        default:
            return state;
    }
};

export const initState = () => {
    return {
        turn: 0,
        deck: [
            { id: 0, name: "Ace", text: "lorem ipsum", color: "steelblue" },
            { id: 1, name: "Jack", text: "foo bar baz", color: "steelblue" },
            { id: 2, name: "King", text: "some description", color: "steelblue" },
            { id: 3, name: "Queen", text: "some much longer description", color: "steelblue" },
        ],
        hand: [],
        card: null,
    };
}


