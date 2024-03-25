import React, {useContext, useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Button} from 'react-native';
import HuntInfoBox from "../components/HuntInfoBox";
import HuntCacheList from "../components/HuntCacheList";
import { Context as HuntContext} from '../context/HuntContext';
import { withNavigation } from 'react-navigation';

const SpecificHuntScreen = (props) => {

    const {state: huntState} = useContext(HuntContext);

    let huntID = props.navigation.getParam("id")
    //console.log("SHS hunt id: " + huntID)

    let hunt = huntState.hunts.find((hunt) => {
        if (hunt.id === huntID) {
            return hunt
        }
    })

    //console.log("selected hunt")
    //console.log(hunt.name)

    return (
        <View style={styles.container}>
            <HuntInfoBox hunt={hunt}/>
            <HuntCacheList huntID={huntID} navigation={props.navigation} />
            <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.cacheButton} onPress={()=>{props.navigation.navigate("ShowMap", {huntID: huntID})}}>
                    <Text style={styles.buttombuttontext}>Map</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cacheButton} onPress={()=>{props.navigation.navigate("Home")}}>
                    <Text style={styles.buttombuttontext}>Return Home</Text>
                </TouchableOpacity>
            </View>
        </View>

      );
};

const styles = StyleSheet.create({
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        backgroundColor: "#355E3B",
    },
    cacheButton: {
        backgroundColor: '#C1E1C1',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    container: {
        flex: 1,
        backgroundColor: "#355E3B",
    },
    buttombuttontext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#355E3B',
    },
});

//<Button title="Map" onPress={()=>{props.navigation.navigate("ShowMap", {huntID: huntID})}} />
//<Button title="Return Home"  onPress={()=>{props.navigation.navigate("Home")}}/>

export default SpecificHuntScreen;
