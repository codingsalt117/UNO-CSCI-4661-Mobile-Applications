import React, {useContext} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';

const GuildScreen = (props) => {
    return(
        <ImageBackground source={require('../../assets/guild_hall_1.jpg')} style={styles.backgroundImage} resizeMode="stretch">
            <View style={styles.container}>
                <Text style={styles.title}>Taxi Guildhall</Text>                
                <TouchableOpacity style={styles.button} onPress={ () => {props.navigation.navigate('Lore')} }>
                    <Text style={styles.buttonText}>Lore</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={ () => {props.navigation.navigate('Drivers')} }>
                    <Text style={styles.buttonText}>Driver Roster</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={ () => {props.navigation.navigate('Jobs')} } >
                    <Text style={styles.buttonText}>Start a Job</Text>
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
        flex: 1,
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
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
        padding: 10,
        borderRadius: 4,
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});

export default GuildScreen;