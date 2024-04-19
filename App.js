import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen';
import InstructionsScreen from './InstructionsScreen'; // Import InstructionsScreen

export default function App() {
    const [currentScreen, setCurrentScreen] = useState('Home'); // Home, Game, or Instructions

    const switchScreen = (screen) => {
        setCurrentScreen(screen);
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 'Game':
                return <GameScreen switchScreen={switchScreen} />;
            case 'Instructions':
                return <InstructionsScreen switchScreen={switchScreen} />;
            case 'Home':
            default:
                return <HomeScreen switchScreen={switchScreen} />;
        }
    };

    return (
        <View style={styles.container}>
            {renderScreen()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
