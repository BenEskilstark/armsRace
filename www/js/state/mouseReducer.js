export const mouseReducer = (state, action) => {
    switch (action.type) {
        case 'MOUSE_DOWN': {
            const { ev, id } = action;
            const { hand, deck } = state;
            const card = hand.filter(c => c.id == id)[0] ?? null;
            return {
                ...state,
                mouse: {
                    ...state.mouse, isDown: true,
                    x: ev.clientX, y: ev.clientY,
                    offsetX: ev.clientX - card.x,
                    offsetY: ev.clientY - card.y
                },
                card
            };
        }
        case 'MOUSE_UP': {
            const { ev } = action;
            return {
                ...state,
                mouse: {
                    ...state.mouse, isDown: false,
                },
                card: null,
            };
        }
        case 'MOUSE_MOVE': {
            const { card, mouse } = state;
            if (!mouse.isDown || !card) return state;
            const { ev } = action;
            card.x = ev.clientX - mouse.offsetX;
            card.y = ev.clientY - mouse.offsetY;
            return {
                ...state,
                mouse: {
                    ...mouse, isDown: true, x: ev.offsetX, y: ev.offsetY
                },
                card
            };
        }
    }
    return state;
}