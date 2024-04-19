import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function InstructionsScreen({ switchScreen }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Blackjack Instructions</Text>
            <Text style={styles.instructions}>
                Welcome to Blackjack! Here's how to play:
                 The goal is to beat the dealer's hand without going over 21.
                 Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.
                 Each player starts with two cards, one of the dealer's cards is hidden until the end.
                 To 'Hit' is to ask for another card. To 'Stand' is to hold your total and end your turn.
                 If you go over 21 you bust, and the dealer wins regardless of the dealer's hand.
                 Dealer will hit until his/her cards total 17 or higher.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => switchScreen('Home')}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333', // Dark background for a clean look
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 20,
        color: '#FFD700', // Gold color for a luxurious feel
        fontWeight: 'bold',
        marginBottom: 20
    },
    instructions: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#FFD700', // Matching the title color for consistency
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
