import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Button} from 'react-native'

const CustomCallout = (props) => {
    return (

        <View>
            <Text style={styles.dadstyle}>Hey!</Text>
            {/*<TouchableOpacity onPress={() => console.log("deleting")}>*/}
            {/*    <Text>Remove</Text>*/}
            {/*</TouchableOpacity>*/}
            <Button title={"Test"} onPress={() => console.log("pressed")}></Button>

        </View>
    );
}

const styles = StyleSheet.create({
    lilstyle: {
        fontSize: 42,
        color: "red"
    },
    dadstyle: {
        fontSize: 22,
        color: "blue"
    }
})

export default CustomCallout
