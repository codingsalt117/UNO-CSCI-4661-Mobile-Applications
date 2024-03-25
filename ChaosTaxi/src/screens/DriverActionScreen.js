import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import {Context} from '../context/RosterContext';

const DriverActionScreen = (props) => {
    const driverID = props.navigation.getParam("id");
    const {state, restore_Health, restore_Stanima, upgrade_maxHealth, upgrade_maxStanima} = useContext(Context);
    const driver = state.find((driver) => driver.id === driverID);

    return <ImageBackground source={require('../../assets/lore.jpg')} style={styles.backgroundImage} resizeMode="cover">
        <View>
            <Text style={styles.title}>Driver Information and Actions</Text>
            <Text>Driver Name: {driver.name}</Text>
            <Text>Driver ID: {driver.id}</Text>
            <Text>Max Health: {driver.maxHP}</Text>
            <Text>Health: {driver.health}</Text>
            <Text>Max Stamina: {driver.maxStanima}</Text>
            <Text>Stamina: {driver.stanima}</Text>
            <TouchableOpacity style={styles.button} onPress={() => {restore_Health(driverID);}}>
                <Text style={styles.buttonText}>Restore Drivers Health to Max</Text>
            </TouchableOpacity>
            <Text>Funds Cost: 25 </Text>
            <TouchableOpacity style={styles.button} onPress={() => {restore_Stanima(driverID);}}>
                <Text style={styles.buttonText}>Restore Drivers Stamina to Max</Text>
            </TouchableOpacity>
            <Text>Funds Cost: 25 </Text>
            <TouchableOpacity style={styles.button} onPress={() => {upgrade_maxHealth(driverID);}}>
                <Text style={styles.buttonText}>Upgrade Drivers Max Health</Text>
            </TouchableOpacity>
            <Text>Funds Cost: 75 </Text>
            <TouchableOpacity style={styles.button} onPress={() => {upgrade_maxStanima(driverID);}}>
                <Text style={styles.buttonText}>Upgrade Drivers Max Stamina</Text>
            </TouchableOpacity>
            <Text>Funds Cost: 75 </Text>
        </View>
    </ImageBackground>
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'yellow',
        margin: 20,
      },
      driverItem: {
        padding: 10,
        margin: 10,
        backgroundColor: '#cfcfcf',
        borderRadius: 5,
      },
      driverName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      driverAttribute: {
        fontSize: 16,
      },
      button: {
        backgroundColor: '#007bff',
        padding: 10,
        color: '#fff',
        textAlign: 'center',
        borderRadius: 5,
        margin: 5,
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      icon: {
        fontSize: 24,
      }
});

export default DriverActionScreen;