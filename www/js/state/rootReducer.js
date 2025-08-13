import { cardReducer } from "./cardReducer.js";
import { shuffle } from '../utils/deck.js';

export const rootReducer = (state, action) => {
    if (state === undefined) state = initState();

    switch (action.type) {
        case 'TURN':
            return { ...state, turn: state.turn + 1 };
        case 'DRAW': {
            const { hand, deck } = state;
            const card = deck.shift();
            return { ...state, hand: [...hand, card], deck };
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

            const card = hand.filter(c => c.id == id)[0];
            for (const effect of card.effects) {
                state = cardReducer(state, effect);
            }

            return { ...state, hand: hand.filter(c => c.id != id) };
        }
        default:
            return state;
    }
};

export const initState = () => {
    return {
        turn: 0,
        deck: shuffle([
            {
                id: 0, name: "City", color: "steelblue",
                text: "Build a City", effects: [
                    { type: "MAKE_CITY", text: "Build a City" }
                ],
            },
            {
                id: 1, name: "Factory", color: "steelblue",
                text: "foo bar baz", effects: [
                    { type: "", text: "" }
                ],
            },
            {
                id: 2, name: "King", color: "steelblue",
                text: "some description", effects: [
                    { type: "", text: "" }
                ],
            },
            {
                id: 3, name: "Queen", color: "steelblue",
                text: "some much longer description", effects: [
                    { type: "", text: "" }
                ],
            },
        ]),
        hand: [],
        card: null,

        cities: 0,
    };
}


