import React, {useContext} from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import LocationDetail from './LocationDetail';
//import { Context as HuntContext} from '../context/HuntContext';

const LocationList = (props) => {
    
    //const {state: huntState} = useContext(HuntContext);
    
   // if (!huntState.length) {
   //     return null;
    //}
    
    //const isCreatedByUser = props.userCreatedLocationList ? true : false;

    /* const filterState = () => {
        const filteredState = isCreatedByUser 
            ? huntState.filter((item) => {return item.createdByUser}) 
            : huntState.filter((item) => {return !item.createdByUser});

        return filteredState;
    } */
    // location
    // {
    //     description: 'I picked this one because it had a cool name',
    //     hint: 'Has cool name',
    //     title: 'Milneburg Hall',
    //     latLng: {
    //          latitude: 30.029705841023993,
    //          longitude: -90.06640258820413,
    //      }
    // }
    const randomData = () => {
        const randomDataArray = [];

        const testLocation1= {
            locationID: 1,
            hint: 'I picked this one because it had a cool name',
         locationName: 'Milneburg Hall',
         latLng: {
             latitude: 30.029705841023993,
              longitude: -90.06640258820413,
          },
          difficulty: 2,
        };
        randomDataArray.push(testLocation1);
        return randomDataArray;
    }

    
    return <View style={styles.container}>
        <FlatList
            data = {randomData()} 
            keyExtractor={(location) => {return location.locationID}}
            renderItem = {({item}) => {
                return <TouchableOpacity  onPress={() => {
                    console.log(item.locationID)
                    props.navigation.navigate("Cache", { location: item })}}>
                    <LocationDetail location={item}/>
                </TouchableOpacity>}}
            showsVerticalScrollIndicator={true}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
    
    }
});

export default withNavigation(LocationList);
