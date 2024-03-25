import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';

const StartScreen = ({navigation}) => {
    return(
        <ImageBackground source={require('../../assets/start_image_2.jpg')} style={styles.backgroundImage} resizeMode="stretch">
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to Chaosburg</Text>
                <Text style={styles.title}>Taxi Guild</Text>
                
                <TouchableOpacity style={styles.button} onPress={ () => {navigation.navigate("Guildhall")} } >
                    <Text style={styles.buttonText}>Start your guild!</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'yellow',
        marginTop: 20
    },
    button: {
        backgroundColor: '#0000FF',
        padding: 10,
        borderRadius: 4,
        marginTop: 650,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});

export default StartScreen;