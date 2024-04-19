import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const cardSuitIcons = {
    'Hearts': '❤️',
    'Diamonds': '♦️',
    'Clubs': '♣️',
    'Spades': '♠️'
};

const Card = ({ card, animate }) => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.cardText}>{card.value} {cardSuitIcons[card.suit]}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 100,
        height: 140,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    cardText: {
        fontSize: 18,
        color: 'black'
    }
});

export default Card;
