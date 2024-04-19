import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Card = ({ card, animate }) => {
    const [animatedValue] = useState(new Animated.Value(0)); // Initially show the back

    const interpolateFront = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '0deg']
    });
    const interpolateBack = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    useEffect(() => {
        if (animate) {
            Animated.spring(animatedValue, {
                toValue: 1,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        } else {
            animatedValue.setValue(1);  // Immediately show the front without animation
        }
    }, [card, animate]);

    const frontStyle = {
        transform: [{ rotateY: interpolateFront }],
    };
    const backStyle = {
        transform: [{ rotateY: interpolateBack }],
    };

    return (
        <View style={styles.cardContainer}>
            <Animated.View style={[styles.card, styles.cardFront, frontStyle]}>
                <Text style={styles.cardText}>{`${card.value} of ${card.suit}`}</Text>
            </Animated.View>
            <Animated.View style={[styles.card, styles.cardBack, backStyle]}>
                <Text style={styles.cardText}>Card Back</Text>
            </Animated.View>
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
    },
    card: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden',
        position: 'absolute',
    },
    cardFront: {
        backgroundColor: 'white',
    },
    cardBack: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 18,
        color: 'black',
    },
});

export default Card;
