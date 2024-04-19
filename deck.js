export const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
export const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export function createDeck() {
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return shuffle(deck);
}

export function calculateTotal(cards) {
    let total = 0;
    let aces = 0;

    cards.forEach(card => {
        if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
            total += 10;
        } else if (card.value === 'A') {
            aces += 1;
            total += 11; // Initially count aces as 11
        } else {
            total += parseInt(card.value);
        }
    });

    // Adjust for aces if total is too high
    while (total > 21 && aces > 0) {
        total -= 10; // Change one ace from 11 to 1
        aces -= 1;
    }

    return total;
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap
    }
    return deck;
}
