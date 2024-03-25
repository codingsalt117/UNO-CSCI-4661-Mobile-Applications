import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const HuntDetail = (props) => {

    return <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{props.hunt.name}</Text>
    </View>

}

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#355E3B",
        backgroundColor: "#DBFFDD",
        marginHorizontal: '7.5%',
        marginVertical: '2%',
        //padding: '5%',
        paddingVertical: '4%',
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: '2.5%',
        //margin: 5,
        //padding: 5,
    },
    detailText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#355E3B'
    },
    qrCodeButton: {
        pointerEvents: 'box-only'
    }
});

export default HuntDetail;
