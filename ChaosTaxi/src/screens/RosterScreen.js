import React, {useContext} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import {Context} from '../context/RosterContext';
import {Ionicons} from '@expo/vector-icons';

const RosterScreen = (props) => {

    const {state, restore_Health, restore_Stanima} = useContext(Context);

    return <ImageBackground source={require('../../assets/lore.jpg')} style={styles.backgroundImage} resizeMode="cover">
        <View>
            <Text style={styles.title}>Driver Roster</Text>
            <FlatList
                data={state}
                height= {800}
                keyExtractor={(driver) => {return driver.id} }
                renderItem={({ item }) => {
                    return (
                        <View style={styles.driverItem}>
                            <Text style={styles.driverName}>{item.name}</Text>
                            <Text style={styles.driverAttribute}>ID: {item.id}</Text>
                            <Text style={styles.driverAttribute}>Money: {item.money}</Text>
                            <Text style={styles.driverAttribute}>Stamina: {item.stanima}</Text>
                            <Text style={styles.driverAttribute}>Max HP: {item.maxHP}</Text>
                            <Text style={styles.driverAttribute}>Health: {item.health}</Text>
                            <Text style={styles.driverAttribute}>Skill: {item.skill}</Text>
                        <TouchableOpacity onPress={() => {props.navigation.navigate('DriverAction', {id: item.id})}} >
                            <Ionicons name="options-outline" style={styles.icon}/>
                        </TouchableOpacity>
                        </View>
                    );
                    }}
            />    
        </View>
        </ImageBackground>
}

const styles = StyleSheet.create({
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
      button2: {
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
        padding: 10,
        borderRadius: 4,
        marginTop: 100,
      },
      buttonText2: {
        color: 'red',
        fontSize: 18,
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
      icon: {
        fontSize: 24,
      }
});

export default RosterScreen;