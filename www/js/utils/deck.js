export const shuffle = (deck) => {
    for (let i = 0; i < deck.length * 2; i++) {
        deck.sort((a, b) => Math.random() > 0.5 ? -1 : 1);
    }
    return deck;
}