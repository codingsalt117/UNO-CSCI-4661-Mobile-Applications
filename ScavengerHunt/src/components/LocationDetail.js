import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LocationDetail = (props) => {
    return (
        <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{props.location.locationName}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 100,
        marginHorizontal: '5%',
        marginVertical: '2.5%',
        padding: '5%',
        paddingVertical: '7.5%',
        alignItems: 'center',
        justifyContent: 'center'
        //marginTop: '2.5%',
        //margin: 5,
        //padding: 5,
    },
    detailText: {
        textAlign: 'center',
        fontSize: 18
    }
});


export default LocationDetail;
    
