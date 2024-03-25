/* import React, {useContext} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import {Context} from '../context/RosterContext';

const DriverInfoScreen = ({navigation}) => {
    const driverID = navigation.getParam("id");
    const {state, restore_Health, restore_Stanima} = useContext(Context);

    return <View>
        <Text>Driver Information and Actions</Text>
        <Text>Driver Id: {driverID}</Text>
    </View>
}

export default DriverInfoScreen; */

************

/* <TouchableOpacity onPress={() => restore_Health(item.id)}>
                            <Text style={styles.button}>Restore Health</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => restore_Stanima(item.id)}>
                            <Text style={styles.button}>Restore Stamina</Text>
                        </TouchableOpacity> */


//driver = state.find((driver) => driver.id === driverID);

    /* const getDriver = async(driverID) => {
        const temp = state.find((driver) => driver.id === driverID);
        setDriver(temp); 
    } */