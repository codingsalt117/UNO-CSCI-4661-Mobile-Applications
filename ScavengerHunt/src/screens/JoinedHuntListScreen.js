import React, {useContext, useState, useEffect} from 'react';
import {Text, StyleSheet, View, SafeAreaView, TouchableOpacity} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import {Camera, useCameraDevice, useCameraPermission} from 'react-native-vision-camera';

import HuntList from "../components/HuntList";
import BackButton from "../components/BackButton";
import { Context as HuntContext} from '../context/HuntContext';

const JoinedHuntListScreen = ({navigation}) => {

    const {state: huntState} = useContext(HuntContext);
    // const huntsNotCreatedByUser = huntState.filter((item) => {return !item.createdByUser});

    return (
        <SafeAreaView style={styles.screenContainer}>

            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Hunt Hub</Text>
            </View>

            <View style={styles.counterContainer}>
                <Text style={styles.listHeaderText}>Active Hunts:</Text>
                <View style={styles.counterBox}>
                    <Text style={styles.counterText}>{huntState.length}</Text>
                </View>
            </View>

            <View style={styles.huntListContainer}>
                <View style={{flex:.025}}/>
                <View style={{flex:.95}}>
                    <HuntList nav="specificHuntScreen"/>
                </View>
                <View style={{flex:.025}}/>
            </View>

            <View style={styles.navContainer}>
                <View style={styles.backButtonContainer}>
                    <BackButton />
                </View>

                <View style={{flex:.05}}/>

                <View style={styles.joinButtonContainer}>
                    <TouchableOpacity style={styles.joinButton} onPress={() => {}}>
                        <Text style={styles.joinText}>Join Hunt</Text>
                        <MaterialCommunityIcons name="qrcode-scan" size={30} color="#355E3B" style={{marginLeft: '5%'}}/>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

//Percentages for screen scaling on padding & margin
const styles = StyleSheet.create({
screenContainer: {
    /*  borderWidth: 3,
        borderColor: 'green', */
        flex: 1, //Screen container takes up 100% of device screen
        padding: '3%',
        backgroundColor: '#355E3B',
    },
    titleContainer: {
        /* borderWidth: 2,
        borderColor: 'red', */
        flex: .1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 25,
    },
    counterContainer: {
        /* borderWidth: 2,
        borderColor: 'red', */
        flex: .075,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    huntListContainer: {
        /* borderWidth: 2,
        borderColor: 'red', */
        flex: .7,
        backgroundColor: '#C1E1C1',
        borderRadius: 15,
    },
    navContainer: {
        /* borderWidth: 2,
        borderColor: 'red', */
        flex: .125,
        flexDirection: 'row',
    },
    joinButtonContainer: {
        /* borderWidth: 2,
        borderColor: 'red', */
        flex: .475,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2.5%'
    },
    backButtonContainer: {
        /* borderWidth: 2,
        borderColor: 'red', */
        flex: .475,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2.5%'
    },
    joinButton: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#C1E1C1',
        borderRadius: 100,
    },
    titleText: {
        fontSize: 48,
        color: '#C1E1C1',
        fontWeight: 'bold',
    borderBottomWidth: 3,
        borderColor: "#C1E1C1"
    },
    counterBox: {
        width: 40,
        height: 30,
        backgroundColor: '#C1E1C1',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listHeaderText: {
        fontSize: 20,
        color: '#C1E1C1',
        marginRight: '2.5%',
    },
    joinText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#355E3B',
    },
    counterText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#355E3B',
    }
});

export default JoinedHuntListScreen;
