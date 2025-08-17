import { cardReducer } from "./cardReducer.js";
import { mouseReducer } from "./mouseReducer.js";
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
        case 'PLAY': {
            const { id } = action;
            let { hand, deck } = state;

            const card = hand.filter(c => c.id == id)[0];
            for (const effect of card.effects) {
                state = cardReducer(state, effect);
            }

            return { ...state, hand: hand.filter(c => c.id != id) };
        }
        case 'SET_CARD': {
            return cardReducer(state, action);
        }
        case 'MOUSE_DOWN':
        case 'MOUSE_UP':
        case 'MOUSE_MOVE':
            return mouseReducer(state, action);
        case 'SELECT': {
            const { id } = action;
            const { hand, deck } = state;
            if (id == null) return { ...state, card: null };
            const card = hand.filter(c => c.id == id)[0];
            return { ...state, card };
        }
        default:
            return state;
    }
};

export const initState = () => {
    return {
        turn: 0,

        mouse: { x: 0, y: 0, isDown: false },

        deck: shuffle([
            {
                id: 0, name: "City", color: "lightcyan",
                img: "img/ussr-city.png",
                x: 0, y: 0,
                text: "Build a City", effects: [
                    { type: "MAKE_CITY", text: "Build a City" }
                ],
            },
            {
                id: 1, name: "Factory", color: "lightsalmon",
                img: "img/ussr-factory.png",
                x: 0, y: 0,
                text: "foo bar baz", effects: [
                    { type: "", text: "" }
                ],
            },
            {
                id: 2, name: "Mig15", color: "indianred",
                img: "img/mig15.png",
                x: 0, y: 0,
                text: "some description", effects: [
                    { type: "", text: "" }
                ],
            },
            {
                id: 3, name: "Generation 2 Fighter", color: "steelblue",
                img: "img/mig21-design.png",
                x: 0, y: 0,
                text: "some much longer description", effects: [
                    { type: "", text: "" }
                ],
            },
            {
                id: 4, name: "Airbase", color: "lightcyan",
                img: "img/ussr-airbase.png",
                x: 0, y: 0,
                text: "foo bar baz", effects: [
                    { type: "", text: "" }
                ],
            },
            {
                id: 5, name: "Research Lab", color: "lightsalmon",
                img: "img/ussr-lab.png",
                x: 0, y: 0,
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


