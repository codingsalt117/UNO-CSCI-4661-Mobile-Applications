import React from "react";

import {Text, StyleSheet, View, SafeAreaView, TouchableOpacity, Image, Button} from "react-native";

const MainMenuScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.screenContainer}>
            <Image
                style={styles.backgroundImage}
                resizeMode='cover'
                source={require("../../assets/images/menu.png")}
            />

            <View style={styles.overlay}/>

            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>TITLE</Text>
            </View>

            <View style={styles.navButtonContainer}>
                {/*Navigate to join hunt list*/}
                <TouchableOpacity style={styles.navButton} onPress={() => {navigation.navigate("JoinedList")}}>
                    <Text style={styles.navButtonText}>Hunt Hub</Text>
                </TouchableOpacity>

                {/*Navigate to create/edit hunt list*/}
                <TouchableOpacity style={styles.navButton} onPress={() => { navigation.navigate("CreatedList") }}>
                    <Text style={styles.navButtonText}>Hunt Workshop</Text>
                </TouchableOpacity>

            </View>
                <Button title={"Go to all buttons"} onPress={() => {navigation.navigate("OldHome")}}></Button>
            <View />

        </SafeAreaView>
    );
};

//Percentages for screen scaling
const styles = StyleSheet.create({
    screenContainer: {
        /* borderWidth: 3,
        borderColor: 'green', */
        flex: 1, //Screen container takes up 100% of device screen
    },
    backgroundImage: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#355E3B",
        opacity: .6
      },
    titleContainer: {
       /*  borderWidth: 2,
        borderColor: 'red', */
        flex: .2,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    navButtonContainer: {
        /* borderWidth: 2,
        borderColor: 'red', */
        flex: .7, //NavButton container takes up 60% of Component Container
        alignItems: 'center',
        justifyContent: 'center'
    },
    navButton: {
        borderWidth: 3,
        borderRadius: 25,
        marginVertical: '10%',
        width: '80%',
        height: '25%',
        justifyContent: 'center',
        borderColor: "#355E3B",
        backgroundColor: "#DBFFDD",
    },
    navButtonText: {
        fontSize: 32,
        textAlign: 'center',
        color: '#355E3B'
    },
    titleText: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#DBFFDD',
    }
});

export default MainMenuScreen;
