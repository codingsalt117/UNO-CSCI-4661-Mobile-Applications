import React, {useContext} from "react";

import {Text, StyleSheet, View, TouchableOpacity} from "react-native";
import {Context as HuntContext} from "../context/HuntContext";

const CreateJoinScreen = ({navigation}) => {

    const { toggleEdit } = useContext(HuntContext);

    return (
        <View style={styles.screenContainer}>
            <View style={styles.componentContainer}>

                <View style={styles.emptyContainer}/>

                <View style={styles.navButtonContainer}>
                    {/*Navigate to join hunt list*/}
                    <TouchableOpacity style={styles.navButton} onPress={() => {navigation.navigate("JoinedList")}}>
                        <Text style={styles.navButtonText}>Join Hunt</Text>
                    </TouchableOpacity>

                    {/*Navigate to create/edit hunt list*/}
                    <TouchableOpacity style={styles.navButton} onPress={() => {
                        toggleEdit()
                        navigation.navigate("CreatedList")
                    }}>
                        <Text style={styles.navButtonText}>Hunt Workshop</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.emptyContainer}/>

            </View>
        </View>
    );
};

//Percentages for screen scaling
const styles = StyleSheet.create({
    screenContainer: {
        borderWidth: 3,
        borderColor: 'green',
        flex: 1, //Screen container takes up 100% of device screen
        padding: '2.5%',
        backgroundColor: 'black',
    },
    componentContainer: {
        borderWidth: 3,
        borderColor: 'green',
        flex: 1, //Component container takes up 100% of Screen Container
        backgroundColor: 'white',
        borderRadius: 15
    },
    emptyContainer: {
        borderWidth: 2,
        borderColor: 'red',
        flex: .2, //Empty container takes up 20% (x2) of Component Container
    },
    navButtonContainer: {
        borderWidth: 2,
        borderColor: 'red',
        flex: .6, //NavButton container takes up 60% of Component Container
        alignItems: 'center',
        justifyContent: 'center'
    },
    navButton: {
        borderWidth: 3,
        borderRadius: 100,
        marginVertical: '10%',
        width: '80%',
        height: '25%',
        justifyContent: 'center'
    },
    navButtonText: {
        fontSize: 32,
        textAlign: 'center'
    }
});

export default CreateJoinScreen;
