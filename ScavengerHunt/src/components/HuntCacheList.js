import React, {useState, useContext} from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {Context as HuntContext} from "../context/HuntContext";

const CacheList = (props) => {

    const {state} = useContext(HuntContext);

    //console.log("props")
    //console.log(props)
    const huntID  = props.huntID;
    //console.log("hunt id:")
    //console.log(huntID)
    const hunts = state.hunts

    const hunt = hunts.find((current) => {
        return current.id === huntID;
    });

    //console.log("cache list hunt:")
    //console.log(hunt)

    let navi = props.navigation
    //console.log("locations")
    //console.log(hunt.locations)

    const [completed, setCompleted] = useState(false);
    const toggleCompleted = () => {
        setCompleted((prevCompleted) => !prevCompleted);
    };

    //const cacheLocationNames = current_Hunt.map(hunt => hunt.huntName);
    const hunt_Completed = () => {
        if (hunt.locations) {
            for (const location of hunt.locations) {
                if (!location.isFound) {
                    return false;
                }
            }
            return true;
        }
        console.error("Missing or invalid locations array in current_Hunt");
        return false;
    };

    if (!hunt_Completed()){
        return (
            <View>
                <FlatList
                    data={hunt.locations}
                    keyExtractor={(location) => {return location.id}}
                    renderItem={({ item }) =>{
                        return (
                            <TouchableOpacity style={styles.cacheButton} onPress={() => {navi.navigate('UnfoundGeoPoint', { huntID: huntID , loc_ID: item.id})}} >
                                <Text style={styles.cacheButtonText}>
                                    {item.isFound ?(
                                            <MaterialIcons name="radio-button-checked" size={24} color="black" />
                                        ):
                                        (
                                            <MaterialIcons name="radio-button-unchecked" size={24} color="black" />
                                        )}

                                    {item.title}</Text>
                            </TouchableOpacity>
                        )}}
                />
                <TouchableOpacity style={styles.toggleCompletedButton} onPress={() => {navi.navigate("ShowWinScreen", { huntID: huntID })}}>
                    <Text style={styles.toggleCompletedButtonText}>Turn in Hunt!</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.toggleCompletedButton} onPress={toggleCompleted}>
                    <Text style={styles.toggleCompletedButtonText}>Toggle Completed</Text>
                </TouchableOpacity> */}

            </View>
        );
    }
    else{
        return (
            <View>
                <FlatList
                data={hunt.locations}
                keyExtractor={(location) => {return location.id}}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.cacheButton}>
                        <Text style={styles.cacheButtonText}>
                        <MaterialIcons name="radio-button-checked" size={24} color="black" />
                        {item}</Text>
                    </TouchableOpacity>
                )}
                />

                {/* <TouchableOpacity style={styles.toggleCompletedButton} onPress={toggleCompleted}>
                    <Text style={styles.toggleCompletedButtonText}>Toggle Completed</Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.toggleCompletedButton} onPress={() => {navi.navigate("ShowWinScreen")}}>
                    <Text style={styles.toggleCompletedButtonText}>Turn in Hunt!</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
  cacheButton: {
    backgroundColor: '#C1E1C1',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  cacheButtonText: {
    color: '#355E3B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleCompletedButton: {
    backgroundColor: '#C1E1C1',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  toggleCompletedButtonText: {
    color: '#355E3B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CacheList;

//<MaterialIcons name="radio-button-unchecked" size={24} color="black" />
//<MaterialIcons name="radio-button-checked" size={24} color="black" />
