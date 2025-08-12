import StatefulHTML from './StatefulHTML.js';


const cardTemplate = (card, i, len, isSelected) => {
    const { id, name, text, color } = card;
    const onclick = isSelected
        ? "closest('stateful-client').dispatch({type: 'SELECT', id: null})"
        : `closest('stateful-client').dispatch({type: 'SELECT', id: ${id}})`;
    const z = isSelected ? 20 : 10 - (len - i);

    const playButton = `
        <button 
            onclick="closest('stateful-client').dispatch({type: 'PLAY', id: ${id}})"
        >
            Play
        </button>
    `;
    return `
        <div class=${isSelected ? "selected-card" : "card"} 
            onclick="${onclick}"
            style="background-color: ${color}; left: ${i * 60}px; z-index: ${z}"
        >
            <h3>${name}</h3>
            <p>${text}</p>
            ${isSelected ? playButton : ""}
        </div>
    `;
}


export default class GameBoard extends StatefulHTML {
    connectedCallback() {
        this.render(this.getState());
    }

    render({ deck, hand, card }) {
        const h = hand.length;
        const cardsInHand = hand.reduce((a, c, i) => {
            return a + cardTemplate(c, i, h, c === card);
        }, "");

        const drawButton = `
            <button class="deck"
                onclick="closest('stateful-client').dispatch({type: 'DRAW'})"
            >
                Draw <br>(${deck.length} remaining)
            </button>
        `;

        this.innerHTML = `
            <div class="hand-container">
                <div class="hand" id="hand">
                    ${cardsInHand}
                </div>
                ${deck.length > 0 ? drawButton : ""}
            </div>
        `;
    }

    onChange(state) {
        this.render(state);
    }
}


