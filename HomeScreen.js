import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ switchScreen }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Blackjack Game</Text>
            <Button title="Start Game" onPress={() => switchScreen('Game')} color="#FFEB3B" />
            <Button title="Instructions" onPress={() => switchScreen('Instructions')} color="#4CAF50" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#333',
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#FFF',
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
});
