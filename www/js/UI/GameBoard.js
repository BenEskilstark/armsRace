import StatefulHTML from './StatefulHTML.js';


const cardTemplate = ({ name, text, color }, i, len) => {
    return `
        <div class="card" 
            style="background-color: ${color}; left: ${i * 60}px; z-index: ${10 - (len - i)}"
        >
            <h3>${name}</h3>
            <p>${text}</p>
        </div>
    `;
}


export default class GameBoard extends StatefulHTML {
    connectedCallback() {
        this.render(this.getState());
    }

    render({ deck, hand }) {
        const h = hand.length;
        const cardsInHand = hand.reduce((a, c, i) => a + cardTemplate(c, i, h), "");

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


