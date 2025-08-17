import StatefulHTML from './StatefulHTML.js';


const cardTemplate = (card, i, len, isSelected) => {
    const { id, name, text, color, x, y } = card;
    const onclick = isSelected
        ? "closest('stateful-client').dispatch({type: 'SELECT', id: null})"
        : `closest('stateful-client').dispatch({type: 'SELECT', id: ${id}})`;
    const z = isSelected ? 20 : 10 - (len - i);

    const onmousedown = `closest('stateful-client').dispatch({type: 'MOUSE_DOWN', ev: event, id: ${id}})`;

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
            onmousedown="${onmousedown}"
            style="background-color: ${color}; left: ${x}px; top: ${y}px; z-index: ${z}"
        >
            <h3>${name}</h3>
            <img src="${card.img || 'img/card-back.png'}" 
                class="card-image" 
                draggable="false"
            />
            <p>${text}</p>
            ${isSelected ? playButton : ""}
        </div>
    `;
}


export default class GameBoard extends StatefulHTML {
    connectedCallback() {
        this.render(this.getState());
        this.onmousemove = (ev) => {
            this.dispatch({ type: 'MOUSE_MOVE', ev });
        }
        this.onmouseup = (ev) => {
            if (ev.target.id == "deck" && this.getState().card == null) {
                this.dispatch({ type: 'DRAW' });
            }
            this.dispatch({ type: 'MOUSE_UP', ev });
        }
        window.getState = this.getState;
        window.dispatch = this.dispatch;
    }

    render({ deck, hand, card }) {
        const h = hand.length;
        const cardsInHand = hand.reduce((a, c, i) => {
            return a + cardTemplate(c, i, h, c === card);
        }, "");

        const drawButton = `
            <button class="deck" id="deck"
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


