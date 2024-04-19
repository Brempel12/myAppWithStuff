import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Card from './Card';
import { createDeck, calculateTotal } from './deck';

const GameScreen = ({ switchScreen }) => {
    const [deck, setDeck] = useState(createDeck());
    const [userCards, setUserCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [dealerRevealedCards, setDealerRevealedCards] = useState(1);
    const [userCash, setUserCash] = useState(1000);
    const [bet, setBet] = useState(0);
    const [gameActive, setGameActive] = useState(false);

    useEffect(() => {
        if (gameActive && dealerRevealedCards >= 2) {
            handleDealerTurn();
        }
    }, [dealerRevealedCards, gameActive]);

    const startGame = () => {
        if (userCash < bet || bet === 0) {
            Alert.alert("Invalid bet", "Please place a valid bet to start the game.");
            return;
        }
        setDeck(deck.length > 10 ? deck : createDeck());
        setUserCards([deck.pop(), deck.pop()]);
        setDealerCards([deck.pop(), deck.pop()]);
        setDealerRevealedCards(1);
        setGameActive(true);
    };

    const handleHit = () => {
        if (!gameActive) return;
        const newCards = [...userCards, deck.pop()];
        setUserCards(newCards);
        if (calculateTotal(newCards) > 21) {
            Alert.alert("Busted!", "You've gone over 21!");
            setUserCash(userCash - bet);
            setGameActive(false);
        }
    };

    const stand = () => {
        setDealerRevealedCards(2);
    };

    const handleDealerTurn = () => {
        if (!gameActive) return;
        let currentTotal = calculateTotal(dealerCards.slice(0, dealerRevealedCards));
        if (currentTotal < 17) {
            const newCard = deck.pop();
            const newDealerCards = [...dealerCards, newCard];
            setDealerCards(newDealerCards);
            setDealerRevealedCards(dealerRevealedCards + 1);
        } else {
            determineWinner();
        }
    };

    const determineWinner = () => {
        setGameActive(false);
        const userTotal = calculateTotal(userCards);
        const dealerTotal = calculateTotal(dealerCards);
        if (dealerTotal > 21 || userTotal > dealerTotal) {
            Alert.alert("You Win!", `Dealer busts or your total: ${userTotal} is higher than dealer total: ${dealerTotal}`);
            setUserCash(userCash + bet);
        } else if (userTotal < dealerTotal) {
            Alert.alert("Dealer Wins", `Dealer total: ${dealerTotal} is higher than your total: ${userTotal}`);
            setUserCash(userCash - bet);
        } else {
            Alert.alert("Push", "It's a draw!");
        }
    };

    const addBet = (amount) => {
        if (userCash - amount >= 0) {
            setBet(bet + amount);
            setUserCash(userCash - amount);
        } else {
            Alert.alert("Insufficient funds", "You do not have enough cash for this bet.");
        }
    };

    const resetBet = () => {
        setUserCash(userCash + bet); // Refund the current bet before resetting
        setBet(0);
    };

    const renderChips = () => {
        const chipValues = [5, 10, 25];
        const chipColors = ['#4CAF50', '#2196F3', '#FFC107'];
        return chipValues.map((value, index) => (
            <TouchableOpacity key={index} style={[styles.chip, { backgroundColor: chipColors[index] }]} onPress={() => addBet(value)}>
                <Text style={styles.chipText}>${value}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.chipsContainer}>
                {renderChips()}
            </View>
            <Text style={styles.header}>Dealer's Cards:</Text>
            <View style={styles.cardRow}>
                {dealerCards.slice(0, dealerRevealedCards).map((card, index) => (
                    <Card key={index} card={card} animate={index === dealerRevealedCards - 1} />
                ))}
            </View>
            <Text style={styles.header}>Your Cards ({calculateTotal(userCards)}):</Text>
            <View style={styles.cardRow}>
                {userCards.map((card, index) => (
                    <Card key={index} card={card} animate={true} />
                ))}
            </View>
            <Text style={styles.cash}>Cash: ${userCash}</Text>
            {!gameActive && <TouchableOpacity style={styles.actionButton} onPress={startGame}>
                <Text style={styles.buttonText}>Start Game</Text>
            </TouchableOpacity>}
            {gameActive && <>
                <TouchableOpacity style={styles.actionButton} onPress={handleHit}>
                    <Text style={styles.buttonText}>Hit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={stand}>
                    <Text style={styles.buttonText}>Stand</Text>
                </TouchableOpacity>
            </>}
            {!gameActive && <TouchableOpacity style={styles.actionButton} onPress={resetBet}>
                <Text style={styles.buttonText}>Reset Bet</Text>
            </TouchableOpacity>}
            <TouchableOpacity style={styles.actionButton} onPress={() => switchScreen('Home')}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212'
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 10
    },
    cash: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 20
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20
    },
    chipsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20
    },
    chip: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    chipText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    betChip: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFEB3B',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height:1 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    betAmount: {
        fontSize: 28,
        color: '#333',
        fontWeight: 'bold'
    },
    betLabel: {
        fontSize: 18,
        color: '#333'
    },
    actionButton: {
        backgroundColor: '#0D47A1',
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default GameScreen;
