import React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native'

const Locale = (props) => {
    return (
        <View>
            <Text>{props.title}</Text>
            <Image source={props.imageSource}/>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Locale