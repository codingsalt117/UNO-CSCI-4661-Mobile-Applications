import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';

const BackButton = (props) => {

    return <TouchableOpacity onPress={() => {props.navigation.goBack()}}style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Back</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '60%',
        padding: '2.5%',
        //height: '75%',
        borderWidth: 3,
        borderRadius: 100,
        borderColor: '#C1E1C1',
    },
    buttonText: {
        fontSize: 22,
        textAlign: 'center',
        color: '#C1E1C1',
    }
});

export default withNavigation(BackButton);